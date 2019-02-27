const mongoose = require('mongoose');

const showTemplate = require('./templates/show-template');

const convert2XML = require('../routes/convert2XML');

// Import Show model
const Show = require('../models/show');

exports.get_all_shows = (req, res, next) => {
    Show
        .find()
        .sort({ priority: -1 })
        .populate({
            path: 'seasons',
            populate: { path: 'episodes' }
        }) 
        .then(docs => {
            const response = {
                shows: docs.map(doc => showTemplate(doc))
            } 
            const query = req.query.format;
            query === 'xml'
                ? res.set('Content-Type', 'text/xml') 
                : res.set('Content-Type', 'application/json');
            res.status(200).send(convert2XML(query, response)); 
        })    
        .catch(err => res.status(404).json({ error: err }))     
};

exports.get_certain_show = (req, res, next) => {
    Show
        //.findOne({ title: req.query.title })
        .findById(req.params.showId)
        .populate({
            path: 'seasons',
            populate: { path: 'episodes' }
        }) 
        .then(doc => {
            if(doc) {
                const response = showTemplate(doc);
                const query = req.query.format;
                query === 'xml'
                ? res.set('Content-Type', 'text/xml') 
                : res.set('Content-Type', 'application/json');
                res.status(200).send(convert2XML(query, response)); 
            } else {
                res.status(404).json({ massage: 'No valid entry found for provided ID' })
            }
        })
        .catch(err => res.status(500).json({ error: err })) 
};

exports.create_show = (req, res, next) => {
    const newShow = new Show({
        _id: new mongoose.Types.ObjectId,
        title: req.body.title,
        subtitle: req.body.subtitle,
        dateOfStart: req.body.dateOfStart,
        posterImage: {
            square: req.files.square[0].filename,
            wide: req.files.wide[0].filename,
            extraWide: req.files.extraWide[0].filename
        }, 
        longDescription: req.body.longDescription,
        shortDescription: req.body.shortDescription,
        priority: req.body.priority,
        videoFragmentURL: req.body.videoFragmentURL
    });
    newShow
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Show created successfully',
                createdShow: result
            });
        })
        .catch(err => res.status(500).json({ error: err }))
};

exports.update_show = (req, res, next) => {
    Show
        .findByIdAndUpdate({ _id: req.params.showId }, req.body)
        .then(() => {
            Show
                .findOne({ _id: req.params.showId })
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
    Show
        .findByIdAndRemove({ _id: req.params.showId })
        .then(() => {
            res.status(200).json({
                message: 'Show deleted'
            })
        })
        .catch(err => res.status(500).json({ deleted: false, error: err }))
};