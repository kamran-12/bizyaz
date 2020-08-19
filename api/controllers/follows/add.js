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
        let promises = [
            Follow.findOne({ maker: req.userId, followed: followedId }),
            Community.findById(followedId),
            User.findById(followedId)
        ]
        let [existingFollow, community, user] = await Promise.all(promises)
        if (req.userId == followedId)
            return res.status(422).send('You cannot follow yourself.');
        if (!existingFollow && (community || user)) {
            let newFollow = new Follow({ maker: req.userId, followed: followedId });
            await newFollow.save()
        }
        res.status(200).send(`You are now following ${followedId}!`)
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(authRequired, validators, handler)
module.exports = router