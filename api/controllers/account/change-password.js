const { Comment, Community, Follow, Post, Reaction, User } = require('../../models/exports')
const { body, validationResult } = require('express-validator')
const router = require('express').Router()
const authRequired = require('../../middleware/auth-required')
const bcrypt = require('bcryptjs');
const validators = [
    body('oldPassword')
        .trim(),
    body('newPassword')
        .trim()
        .isAlphanumeric()
        .isLength({ min: 8, max: 30 }).withMessage('Password length should be minimum: 8 and maximum: 30.')
]
const handler = async function (req, res) {
    try {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.status(422).json({ errors: errors });
        }
        let { oldPassword, newPassword } = req.body
        let user = await User.findById(req.userId)
        let passwordMatch = await bcrypt.compare(oldPassword, user.password)
        if (passwordMatch) {
            let newPasswordHash = await bcrypt.hash(newPassword, 12)
            await user.update({ password: newPasswordHash })
            res.status(401).send('Password updated`.')
        } else {
            res.status(401).send('Old password is wrong.')
        }
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(authRequired, validators, handler)
module.exports = router