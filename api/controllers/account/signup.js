const { Comment, Community, Follow, Post, Reaction, User } = require('../../models/exports')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../../config');
const router = require('express').Router();
const validators = [
    body('email')
        .trim()
        .isEmail().withMessage('This is not valid email')
        .custom(email => {
            return User.findOne({ email }).then(user => {
                if (user) return Promise.reject('E-mail already in use');
            });
        })
        .normalizeEmail(),
    body('username')
        .trim()
        .customSanitizer(x => x.toLowerCase())
        .isLength({ min: 4, max: 20 }).withMessage('Username length should be minimum: 4 and maximum: 20.')
        .custom(username => /^[a-z0-9_]+$/.test(username)).withMessage('This is not a valid username.')
        .custom(username => {
            return User.findOne({ username }).then(user => {
                if (user) return Promise.reject('Username already in use');
            });
        }),
    body('password')
        .trim()
        .isAlphanumeric().withMessage('Password should be alphanumeric.')
        .isLength({ min: 6, max: 30 }).withMessage('Password length should be minimum: 6 and maximum: 30.')
]
const handler = async function (req, res) {
    try {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.status(422).json({ errors: errors });
        }
        let { username, email, password } = req.body
        let user = new User({
            username,
            email,
            password: await bcrypt.hash(password, 12),
            createdAt: Date.now()
        })
        await user.save()
        const token = jwt.sign({ userId: user._id.toString() }, JWT_KEY, { expiresIn: '10d' });
        res.status(200).send({ token: token, userId: user._id.toString(), email: user.email, username: user.username });
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(validators, handler)
module.exports = router