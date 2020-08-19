const { Comment, Community, Follow, Post, Reaction, User } = require('../../models/exports')
const { body, validationResult } = require('express-validator')
const router = require('express').Router()
const authRequired = require('../../middleware/auth-required')
const validators = [
]
const handler = async function (req, res) {
    try {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.status(422).json({ errors: errors });
        }
        let { content, postId } = req.body
        content = (content || "").trim()
        if (content.length > 1000) return res.status(422).send("Content is too long.")
        let post = await Post.findById(postId)
        if (!post) return res.status(404).send('Post not found.')
        if (post.kind != 'text') return res.status(422).send('Only text posts can be edited.')
        if (post.authorId != req.userId) return res.status(401).send('This is not your post.')
        await Promise.all([
            Comment.updateMany({ post: post._id, parent: null }, { forPastVersion: true }),
            post.updateOne({ edited: true, content: content })
        ])
        res.status(200).send('Post edited.')
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(authRequired, validators, handler)
module.exports = router