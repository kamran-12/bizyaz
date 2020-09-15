const { Comment, Community, Follow, Post, Reaction, User } = require('../../models/exports')
const { body, validationResult } = require('express-validator')
const router = require('express').Router()
const validators = [
]
const handler = async function (req, res) {
    try {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.status(422).json({ errors: errors });
        }
        let { author, post, parent, withChildren } = req.body
        let conditions = {}
        if (author) conditions = { author }
        else if (parent) conditions = { parent }
        else if (post) {
            conditions = { post }
            if (!withChildren) {
                conditions.parent = null
            }
        }
        else return res.status(400).send('No conditions.')
        let comments = await Comment.find(conditions, 'author childCount content date edited fpv deleted parent likeCount')
        res.status(200).send(comments)
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(validators, handler)
module.exports = router