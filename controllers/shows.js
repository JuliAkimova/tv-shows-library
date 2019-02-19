const mongoose = require('mongoose');

// Import Show model
const Show = require('../models/show');

exports.get_all_shows = (req, res, next) => {
    Show.find()
    .then(docs => {
        const response = {
            shows: docs.map(doc => {
                return {
                    _id: doc._id,
                    title: doc.title,
                    subtitle: doc.subtitle,
                    dateOfStart: doc.dateOfStart,
                    posterImage: doc.posterImage,
                    longDescrition: doc.longDescrition,
                    shortDescrition: doc.shortDescrition,
                    priority: doc.priority,
                    videoFragmentURL: doc.videoFragmentURL,
                };
            })
        }; 
        res.status(200).json(response);
    })    
    .catch(err => res.status(404).json({ error: err })) 
};

exports.get_certain_show = (req, res, next) => {
    Show.findById(req.params.showId)
    .then(doc => {
        if(doc) {
            res.status(200).json({
                show: doc
            })
        } else {
            res.status(404).json({ massage: 'No valid entry found for provided ID' })
        }
    })
    .catch(err => res.status(500).json({ error: err }))
};

exports.create_show = (req, res, next) => {
    const show = new Show({
        _id: new mongoose.Types.ObjectId,
        title: req.body.title,
        subtitle: req.body.subtitle,
        dateOfStart: req.body.dateOfStart,
        posterImage: req.file.path,
        longDescrition: req.body.longDescrition,
        shortDescrition: req.body.shortDescrition,
        priority: req.body.priority,
        videoFragmentURL: req.body.videoFragmentURL
    });
    show.save()
        .then(result => {
            res.status(201).json({
                message: 'Show created successfully',
                createdShow: result
            });
        })
        .catch(err => res.status(500).json({ error: err }))
};

exports.update_show = (req, res, next) => {
    Show.findByIdAndUpdate({ _id: req.params.showId }, req.body)
        .then(() => {
            Show.findOne({ _id: req.params.showId })
            .then(result => {
                res.status(200).json({
                    message: 'Show updated',
                    updatedShow: result
                })
            })
        .catch(err => res.status(500).json({ updated: false, error: err }))    
    }); 
};

exports.delete_show = (req, res, next) => {
    Show.findByIdAndRemove({ _id: req.params.showId })
        .then(() => {
            res.status(200).json({
                message: 'Show deleted'
            })
        })
        .catch(err => res.status(500).json({ deleted: false, error: err }))
};