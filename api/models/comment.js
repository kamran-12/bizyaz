const Mongoose = require('mongoose');

const schema = new Mongoose.Schema({
    author: { type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: false, index: true },
    content: { type: String, required: false },
    post: { type: Mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    parent: { type: Mongoose.Schema.Types.ObjectId, ref: 'Comment', required: false, index: true },
    createdAt: { type: Date, required: true },
    fpv: { type: Boolean, required: false, alias: 'forPastVersion' },
    deleted: { type: Boolean, required: false },
    edited: { type: Boolean, required: false },
});

schema.index({ post: 1, parent: 1 })

schema.virtual('likes', { ref: 'Reaction', localField: '_id', foreignField: 'for', match: { positive: true }, })
schema.virtual('likesCount', { ref: 'Reaction', localField: '_id', foreignField: 'for', match: { positive: true }, count: true, })
schema.virtual('dislikes', { ref: 'Reaction', localField: '_id', foreignField: 'for', match: { positive: false }, })
schema.virtual('dislikesCount', { ref: 'Reaction', localField: '_id', foreignField: 'for', match: { positive: false }, count: true, })
schema.virtual('children', { ref: 'Comment', localField: '_id', foreignField: 'parent', })
schema.virtual('childCount', { ref: 'Comment', localField: '_id', foreignField: 'parent', count: true })

module.exports = Mongoose.model('Comment', schema);