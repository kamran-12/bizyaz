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
        let { username, email, id } = req.body, user
        if (id) user = await User.findById(id)
        else if (username) user = await User.findOne({username})
        else if (email) user = await User.findOne({email})
        if (user) {
            res.status(200).send({id: user._id, username: user.username})
        } else {
            res.status(404).send("User not found.")
        }
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(validators, handler)
module.exports = router