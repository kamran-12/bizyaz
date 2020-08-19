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
        let { username, email } = req.body
        let conditions = {}
        if (username) conditions.username = username
        if (email) conditions.email = email
        let user = await User.findOne(conditions)
        res.status(422).json({ "requested user": conditions, found: !!user });
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(validators, handler)
module.exports = router