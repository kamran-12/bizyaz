const Mongoose = require('mongoose');

const schema = new Mongoose.Schema({
    email: { type: String, required: true, index: true },
    resetLink: { type: String, required: false, index: true },
    confirmLink: { type: String, required: false, index: true },
    username: { type: String, required: true, index: true },
    phone: { type: String, required: false, index: true },
    password: { type: String, required: true },
    verifiedEmail: { type: Boolean, required: false },
    verified: { type: Boolean, required: false },
    admin: { type: Boolean, required: false },
    feed: { posts: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }] },
    createdAt: { type: Date, required: true },
})

schema.virtual('comments', { ref: 'Comment', localField: '_id', foreignField: 'author', })
schema.virtual('likes', { ref: 'Reaction', localField: '_id', foreignField: 'maker', match: { positive: true } })
schema.virtual('dislikes', { ref: 'Reaction', localField: '_id', foreignField: 'maker', match: { positive: false } })
schema.virtual('posts', { ref: 'Post', localField: '_id', foreignField: 'author', })
schema.virtual('follows', { ref: 'Follow', localField: '_id', foreignField: 'maker', })
schema.virtual('followsCount', { ref: 'Follow', localField: '_id', foreignField: 'maker', count: true })
schema.virtual('followers', { ref: 'Follow', localField: '_id', foreignField: 'followed', })
schema.virtual('followersCount', { ref: 'Follow', localField: '_id', foreignField: 'followed', count: true })

schema.methods.createFeed = async function () {
    let Post = require('./post')
    let follows = this.follows.map(follow => follow.followed)
    let inside = { _id: { $in: follows } }
    let conditions = { $or: [{ author: inside }, { community: inside }] }
    let posts = await Post.find(conditions, { limit: 100 })
    posts = posts.map(post => post._id)
    this.feed.posts = posts
    return this.save()
}

module.exports = Mongoose.model('User', schema);