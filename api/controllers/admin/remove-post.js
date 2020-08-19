const { Comment, Community, Follow, Post, Reaction, User } = require('../../models/exports')
const { body, validationResult } = require('express-validator')
const router = require('express').Router()
const admin = require('../../middleware/admin')
const validators = [
]
const handler = async function (req, res) {
    try {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.status(422).json({ errors: errors });
        }
        let { postId } = req.body
        let post = Post.findById(postId)
        if (!post) return res.status(404).send('Post not found.')
        await Promise.all([
            Comment.deleteMany({ post: post._id }),
            post.remove()
        ])
        res.status(200).send('Post deleted.')
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(admin, validators, handler)
module.exports = router