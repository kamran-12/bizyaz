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
        let { commentId, content } = req.body
        let comment = await Comment.findById(commentId)
        if (comment.author._id != req.userId) return res.status(401).send("This is not your comment, you cannot edit it.")
        let promises = []
        promises.push(comment.update({ content }))
        if (comment.childCount > 0) {
            promises.push(Comment.updateMany({ parent: comment._id }, { forPastVersion: true }))
        }
        await Promise.all(promises)
        return res.status(200).send('Comment edited!');
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(authRequired, validators, handler)
module.exports = router