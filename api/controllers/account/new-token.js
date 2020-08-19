const { Comment, Community, Follow, Post, Reaction, User } = require('../../models/exports')
const { body, validationResult } = require('express-validator')
const authRequired = require('../../middleware/auth-required')
const router = require('express').Router()
const validator = require('validator');
const { JWT_KEY } = require('../../config');
const validators = [
]
const handler = async function (req, res) {
    try {
        if (req.userId) {
            var user = await User.findById(req.userId)
        }
        if (user) {
            let token = jwt.sign({ userId: user._id.toString() }, JWT_KEY, { expiresIn: '10d' });
            res.status(200).send({ token: token, email: user.email, username: user.username });
        } else {
            res.status(422).send("Nothing.")
        }
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(authRequired, validators, handler)
module.exports = router