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
        let { postId } = req.body
        let post = Post.findById(postId)
        if (!post) return res.status(404).send('Post not found')
        if (post.authorId == req.userId) {
            await Promise.all([
                Comment.deleteMany({post: post._id}),
                post.remove()
            ])
            res.status(200).send('post deleted!')
        } else {
            res.status(401).send('this is not your post')
        }
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(authRequired, validators, handler)
module.exports = router