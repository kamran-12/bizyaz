const Mongoose = require('mongoose');

const schema = new Mongoose.Schema({ kind: { type: String, required: true },
    author: { type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    community: { type: Mongoose.Schema.Types.ObjectId, ref: 'Community', required: false },
    title: { type: String, required: true },
    content: { type: String, required: false },
    createdAt: { type: Date, required: true },
    kind: { type: String, required: true },
});

schema.virtual('likes',                        { ref: 'Reaction', localField: '_id', foreignField: 'for',  match: { positive: true  },              })
schema.virtual('likesCount',                   { ref: 'Reaction', localField: '_id', foreignField: 'for',  match: { positive: true  }, count: true, })
schema.virtual('dislikes',                     { ref: 'Reaction', localField: '_id', foreignField: 'for',  match: { positive: false },              })
schema.virtual('dislikesCount',                { ref: 'Reaction', localField: '_id', foreignField: 'for',  match: { positive: false }, count: true, })
schema.virtual('comments',                     { ref: 'Comment',  localField: '_id', foreignField: 'post',                                          })
schema.virtual('commentsCount',                { ref: 'Comment',  localField: '_id', foreignField: 'post',                             count: true, })
schema.virtual('firstLevelComments',           { ref: 'Comment',  localField: '_id', foreignField: 'post', match: { parent: null },                 })
schema.virtual('firstThreeFirstLevelComments', { ref: 'Comment',  localField: '_id', foreignField: 'post', match: { parent: null },                 })
schema.virtual('firstLevelCommentsCount',      { ref: 'Comment',  localField: '_id', foreignField: 'post', match: { parent: null },    count: true, })

module.exports = Mongoose.model('Post', schema);