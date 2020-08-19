const { Comment, Community, Follow, Post, Reaction, User } = require('../../models/exports')
const { body, validationResult } = require('express-validator')
const router = require('express').Router()
const authRequired = require('../../middleware/auth-required')
const admin = require('../../middleware/admin')
const community = require('../../models/community')
const validators = [
    body('url').trim().isLength({min: 3, max: 20}).withMessage('Url is min: 3, max: 20 symbols.'),
    body('name').trim().isLength({min: 3, max: 50}).withMessage('Name is min: 3, max: 20 symbols.'),
    body('description').trim()
]
const handler = async function (req, res) {
    try {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.status(422).json({ errors: errors });
        }
        let { url, name, description } = req.body
        await Community.create({ url, name, description, createdAt: Date.now() })
        return res.status(200).send("Community created.")
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(admin, validators, handler)
module.exports = router