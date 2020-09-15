const { Comment, Community, Follow, Post, Reaction, User } = require('../../models/exports')
const { body, validationResult } = require('express-validator')
const router = require('express').Router()
const authRequired = require('../../middleware/auth-required')
const dislikeTypes = "lowq disagree sorry spam harmful".split(' ')
const validators = [ //maybe something here for kind
    body('kind').custom(kind => kind ? dislikeTypes.includes(kind) : true)
]
const handler = async function (req, res) {
    try {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.status(422).json({ errors: errors });
        }
        let { reactedId, positive, kind } = req.body
        if (!([true, false].includes(positive))) return res.status(422).send('Positive or negative is not shown.')
        if (!positive && !kind) return res.status(422).send('Kind is required for negative reactions.')
        let promises = [
            Reaction.findOne({ maker: req.userId, for: reactedId }),
            Post.findById(reactedId),
            Comment.findById(reactedId)
        ]
        let [existingReaction, post, comment] = await Promise.all(promises)
        if (existingReaction) await existingReaction.remove()
        if ([post.author._id, comment.author._id].includes(req.userId)) {
            return res.status(422).send('You cannot react to your post.');
        }
        if (post || comment) {
            let newReaction = new Reaction({ maker: req.userId, for: reactedId, positive, kind, createdAt: Date.now() });
            await newReaction.save()
            return res.status(200).send('Reaction saved.')
        } else {
            return res.status(404).send('Thing to react is not found.')
        }
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(authRequired, validators, handler)
module.exports = router