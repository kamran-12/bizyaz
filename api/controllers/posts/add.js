const { Comment, Community, Follow, Post, Reaction, User } = require('../../models/exports')
const { body, validationResult } = require('express-validator')
const router = require('express').Router()
const { googleFileSaver } = require('../../middleware/multer-image')
const authRequired = require('../../middleware/auth-required')
const validators = [
    body('title')
        .trim()
        .isLength({ min: 5, max: 100 }).withMessage('Title length should be min: 5, max: 100.'),
    body('community').trim()
]
const handler = async function (req, res) {
    try {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.status(422).json({ errors: errors });
        }
        let { kind, content, community, title } = req.body, image = req.file
        foundCommunity = await Community.findOne({ url: community })
        if (!foundCommunity) return res.status(422).send("Community is not found.")
        switch (kind) {
            case 'text':
                content = (content || "").trim()
                if (content.length > 1000) return res.status(422).send("Content is too long.")
                break;
            case 'image':
                if (!image) return res.status(422).send("Image is required.")
                await googleFileSaver(image)
                content = image.path
                break;
            case 'link':
                content = (content || "").trim()
                if (!content.startsWith('http')) {
                    if (content.split('/')[0].split('.').length < 3) {
                        content = "www." + content
                    }
                    content = "http://" + content
                }
                break;
            default:
                return res.status(422).send('Type is not chosen.')
        }
        let post = new Post({ kind, title, content, community: foundCommunity._id, author: req.userId, createdAt: Date.now()})
        await post.save()
        return res.status(200).send('Post saved.')
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(authRequired, validators, handler)
module.exports = router