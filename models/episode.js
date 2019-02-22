const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
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
    relatedSeason: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season'
    },
    longDescription: {
        type: String
    },
    shortDescription: {
        type: String
    },
    featuredImage: {
        square: {
            type: String,
            required: true
        },
        wide: {
            type: String,
            required: true
        },
        extraWide: {
            type: String,
            required: true
        } 
    },
    dateOfPublish: {
        type: Date,
        default: Date.now
    },
    lastModifiedDate: {
        type: Date,
        default: Date.now
    },
    videoFragmentURL: {
        type: String
    },
    rating: {
        type: Number
    },
    season: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season'
    },
});

module.exports = mongoose.model('Episode', EpisodeSchema);