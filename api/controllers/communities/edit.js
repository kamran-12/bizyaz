const { Comment, Community, Follow, Post, Reaction, User } = require('../../models/exports')
const { body, validationResult } = require('express-validator')
const router = require('express').Router()
const admin = require('../../middleware/admin')
const validators = [
    body('url').trim().isLength({min: 3, max: 20}),
    body('name').trim().isLength({min: 3, max: 50}),
    body('description').trim()
]
const handler = async function (req, res) {
    try {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.status(422).json({ errors: errors });
        }
        let { url, name, description } = req.body, image = req.file, edits = {}
        if (name) edits.name = name
        if (description) edits.description = description
        if (image) {/*add later*/ }
        await Community.findOneAndUpdate({ url }, edits)
        return res.status(200).send("Community updated.")
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(admin, validators, handler)
module.exports = router