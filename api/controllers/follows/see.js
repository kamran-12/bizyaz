const { Comment, Community, Follow, Post, Reaction, User } = require('../../models/exports')
const { body, validationResult } = require('express-validator')
const router = require('express').Router()
const validators = [
    body('makerUsername').trim()
]
const handler = async function (req, res) {
    try {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.status(422).json({ errors: errors });
        }
        let { makerId, makerUsername, followedUserId, followedCommunityId, list } = req.body, maker
        if (makerId) {
            maker = await User.findById(makerId)
        } else if (makerUsername) {
            maker = await User.findOne({ username: makerUsername })
        }
        if (maker) {
            if (req.userId != maker._id) {
                return res.status(401).send('You cannot see their follow list.')
            } else {
                if (list) {
                    return res.status(200).send(maker.follows)
                } else {
                    return res.status(200).send(maker.followsCount)
                }
            }
        } else {
            if (list) {
                return res.status(401).send('You cannot see that follow list.')
            } else {
                if (followedUserId) {
                    var f = await User.findById(followedUserId)
                } else if (followedCommunityId) {
                    var f = await User.findById(followedUserId)
                }
                if (f) {
                    return res.status(200).send(f.followsCount)
                } else {
                    return res.status(404).send('Did not find that object.')
                }
            }
        }
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(validators, handler)
module.exports = router