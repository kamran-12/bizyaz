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
        let { reactionId, forWhat } = req.body
        let conditions = { maker: req.userId }
        if (reactionId) conditions._id = reactionId
        if (forWhat) conditions['for'] = forWhat
        let reaction = await Reaction.findOne(conditions)
        if (!reaction) res.status(404).send('Reaction not found, or maybe it is not yours.')
        await reaction.remove()
        res.status(200).send('Reaction removed.')
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(authRequired, validators, handler)
module.exports = router