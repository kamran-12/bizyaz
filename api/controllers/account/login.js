const { Comment, Community, Follow, Post, Reaction, User } = require('../../models/exports')
const { body, validationResult } = require('express-validator')
const router = require('express').Router()
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../../config');
const validators = [
    body('login')
        .trim()
        .customSanitizer(x => x.toLowerCase()),
    body('password')
        .trim(),
    body('email')
        .if(body('email').exists())
        .trim()
        .isEmail().withMessage('This is not a valid email.')
        .normalizeEmail(),
    body('username')
        .trim()
        .customSanitizer(x => x.toLowerCase())
]
const handler = async function (req, res) {
    try {
        const errors = validationResult(req).array();
        if (errors.length == 0) {
            let { login, password, email, username } = req.body, conditions
            if (username) conditions = { username }
            else if (email) conditions = { email }
            else if (validator.isEmail(login)) conditions = { email: login }
            else conditions = { username: login }
            if (typeof conditions.username != "string" && typeof conditions.email != "string")
                return res.status(422).send("Nice try, hacker.");
            var users = await User.find(conditions).lean()
            if (users.length == 0) {
                errors.push({ "location": "body", "msg": "User not found" })
            } else {
                console.log(users)
                for (let user of users) {
                    if (await bcrypt.compare(password, user.password)) {
                        const token = jwt.sign({ userId: user._id.toString() }, JWT_KEY, { expiresIn: '10d' });
                        return res.status(200).send({ token: token, userId: user._id.toString(), email: user.email, username: user.username });
                    } else {
                        errors.push({ "location": "body", "msg": "Password is wrong.", "param": "password" })
                    }
                }
            }
        }
        if (errors.length > 0) {
            return res.status(422).json({ errors: errors });
        }
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(validators, handler)
module.exports = router