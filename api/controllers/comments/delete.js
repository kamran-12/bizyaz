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
        let { commentId } = req.body
        let comment = await Comment.findById(commentId)
        if (comment.author._id != req.userId) return res.status(401).send("This is not your comment, you cannot delete it.")
        let promises = []
        if (comment.childCount == 0) {
            promises.push(comment.remove())
        } else {
            promises.push(comment.update({ content: null, author: null, deleted: true }))
        }
        promises.push(Reaction.deleteMany({for: comment._id}))
        await Promise.all(promises)
        return res.status(200).send('Comment deleted!');
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(authRequired, validators, handler)
module.exports = router