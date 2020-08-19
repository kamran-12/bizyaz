const Mongoose = require('mongoose');

const schema = new Mongoose.Schema({
    maker: { type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    for:  { type: Mongoose.Schema.Types.ObjectId, required: true, index: true },
    createdAt: { type: Date, required: true },
    positive: { type: Boolean, required: true },
    kind: { type: String, required: false },
});

module.exports = Mongoose.model('Like', schema);