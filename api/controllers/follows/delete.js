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
        let { followedId } = req.body
        let existingFollow = await Follow.findOne({ maker: req.userId, followed: followedId })
        if (existingFollow) {
            Follow.findOneAndDelete({ maker: req.userId, followed: followedId })
        }
        res.status(200).send(`You are not following ${followedId} anymore!`)
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(authRequired, validators, handler)
module.exports = router