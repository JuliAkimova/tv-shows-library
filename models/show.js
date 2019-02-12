const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShowSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    title: {
        type: String,
        required: true 
    },
    subtitle: {
        type: String
    },
    dateOfStart: {
        type: Date
    },
    posterImage: {
        type: String,
    },
    longDescription: {
        type: String
    },
    shortDescription: {
        type: String
    },
    priority: {
        type: Number
    },
    dateOfPublish: {
        type: Date,
        default: Date.now
    },
    lastModifiedDate: {
        type: Date,
        //default: Date.now
    },
    videoFragmentURL: {
        type: String
    },
    rating: {
        type: Number
    },
    seasons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Season'}]
});

module.exports = mongoose.model('Show', ShowSchema);