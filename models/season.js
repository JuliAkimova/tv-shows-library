const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeasonSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true 
    },
    number: {
        type: Number,
        required: true
    },
    relatedShow: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show' 
    },
    longDescription: {
        type: String
    },
    shortDescription: {
        type: String
    },
    featuredImage: {
        type: String
    },
    dateOfPublish: {
        type: Date,
        default: Date.now
    },
    lastModifiedDate: {
        type: Date,
    },
    videoFragmentURL: {
        type: String
    },
    rating: {
        type: Number
    },
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show'
    },
    episodes: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Episode'
    }]
});

module.exports = mongoose.model('Season', SeasonSchema);