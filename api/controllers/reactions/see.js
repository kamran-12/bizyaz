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
        let { kind, likedId } = req.body
        switch (kind) {
            case 'postLikeCount':
                let post = await Post.findById(likedId)
                if (!post) return res.status(404).send("Post not found.")
                res.status(200).send(post.likesCount)
                break
            case "mrft": //my reaction for this
                let reaction = await Reaction.find({ maker: req.userId, for: likedId })
                res.status(200).send(reaction)
                break
            //other cases needed
            default:
                res.status(501).send('Not the case')
        }
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(validators, handler)
module.exports = router