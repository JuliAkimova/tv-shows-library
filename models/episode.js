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
        type: Number
    },
    relatedShow: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Show'
    },
    relatedSeason: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Season'
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
        default: Date.now
    },
    videoFragmentURL: {
        type: String
    },
    rating: {
        type: Number
    },
});


const episode = mongoose.model('Episode', EpisodeSchema);
 
module.exports = episode;