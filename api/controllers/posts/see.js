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
        let { postId, withComments, personalFeed, generalFeed, author, community, limit, skip, languageFilter } = req.body
        let projection = 'title author community content createdAt kind commentsCount likesCount firstLevelComments'
        if (postId) {
            let post = await Post.findById(postId, projection)
            if (!post) return res.status(404).send("Post is not found.")
            return res.status(200).send(post) // SHOULD BE TESTED AND IMPROVED!!!
        } else {
            let posts
            projection = projection.replace(' firstLevelComments', '')
            if (author) projection = projection.replace(' author', '')
            if (community) projection = projection.replace(' community', '')
            let options = { sort: { createdAt: -1 }, skip, limit }
            limit = Math.min((parseInt(limit) || 5), 20);
            skip = parseInt(skip) || 0;
            if (personalFeed) {
                if (!req.userId) {
                    return req.status(401).send('Not authenticated, account is required.')
                }
                let user = await User.findById(req.userId)
                if (skip == 0) {
                    await user.createFeed();
                }
                posts = user.feed.posts.slice(skip, skip + limit)
            } else if (generalFeed) {
                posts = await Post.find(null, projection, options)
            } else if (author) {
                posts = await Post.find({ author }, projection, options)
            } else if (community) {
                posts = await Post.find({ community }, projection, options)
            } else {
                return res.status(501).send('this functionality is implemented!')
            }
            return res.status(200).send(posts)
        }
    } catch (error) {
        console.log("error on: " + error.message + ' line: ' + error.lineNumber);
        return res.status(500).send('Server side error');
    }
}
router.use(validators, handler)
module.exports = router

/*
* possibly not fully written yet
*/