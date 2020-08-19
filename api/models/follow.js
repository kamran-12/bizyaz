const Mongoose = require('mongoose');

const schema = new Mongoose.Schema({
    maker: { type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    followed:  { type: Mongoose.Schema.Types.ObjectId, required: true, index: true },
});

module.exports = Mongoose.model('Follow', schema);