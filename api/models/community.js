const Mongoose = require('mongoose');

const schema = new Mongoose.Schema({
    url: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    image_url: { type: String, required: false },
    description: { type: String, required: false },
    createdAt: { type: Date, required: true },
});

schema.virtual('membersCount', { ref: 'User', localField: '_id', foreignField: 'follows', count: true })

module.exports = Mongoose.model('Community', schema);