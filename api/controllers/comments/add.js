const { Comment, Community, Follow, Post, Reaction, User } = require('../../models/exports')
const { body, validationResult } = require('express-validator')
const router = require('express').Router()
const authRequired = require('../../middleware/auth-required')
const validators = [
    body('content')
        .trim()
        .isLength({ min: 1, max: 1000 })
]
const handler = async function (req, res) {
    try {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.status(422).json({ errors: errors });
        }
        let { content, postId, parentId } = req.body
        let promises = [User.findById(req.userId), Post.findById(postId)]
        if (parentId) promises.push(Comment.findById(parentId))
        let results = await Promise.all(promises)
        let user = results[0]
        let post = results[1]
        let parent = results[2]
        let found = !!user && !!posts
        if (parentId) found = found && !!parent
        if (!found) return res.status(404).send('Something for comment not found.')
        if (parent.post._id != postId) return res.status(422).send("No such comment on that post.")
        const comment = new Comment({
            author: user,
            content: content,
            post: post,
            parent: parent,
            createdAt: Date.now()
        })
        await comment.save();
        return res.status(200).send('Comment added.')
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(authRequired, validators, handler)
module.exports = router