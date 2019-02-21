const mongoose = require('mongoose');

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
                        seasons: 
                            doc.seasons.map(s => {
                                return {
                                    _id: s._id,
                                    name: s.name,
                                    number: s.number,
                                    //relatedShow: s.relatedShow,
                                    longDescription: s.longDescription,
                                    shortDescrition: s.shortDescrition,
                                    featuredImage: s.featuredImage,
                                    videoFragmentURL: s.videoFragmentURL,
                                    //rating: s.rating,
                                    episodes:
                                        s.episodes.map(e => {
                                            return {
                                                id: e._id,
                                                number: e.number,
                                                name: e.name,
                                                //relatedShow: e.relatedShow,
                                                //relatedSeason: e.relatedSeason 
                                                longDescription: e.longDescription,
                                                shortDescrition: e.shortDescrition,
                                                featuredImage: e.featuredImage,
                                                videoFragmentURL: e.videoFragmentURL,
                                                //rating: e.rating
                                            } 
                                        })
                                    }
                            })
                    }
                })
            };
            res.status(200).json(response);
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
                res.status(200).json({
                    _id: doc._id,
                    title: doc.title,
                    subtitle: doc.subtitle,
                    dateOfStart: doc.dateOfStart,
                    posterImage: doc.posterImage,
                    longDescrition: doc.longDescrition,
                    shortDescrition: doc.shortDescrition,
                    priority: doc.priority,
                    videoFragmentURL: doc.videoFragmentURL,
                    seasons:
                        doc.seasons.map(s => {
                            return {
                                _id: s._id,
                                name: s.name,
                                number: s.number,
                                //relatedShow: s.relatedShow,
                                longDescription: s.longDescription,
                                shortDescrition: s.shortDescrition,
                                featuredImage: s.featuredImage,
                                videoFragmentURL: s.videoFragmentURL,
                                //rating: s.rating,
                                episodes:
                                    s.episodes.map(e => {
                                        return {
                                            id: e._id,
                                            number: e.number,
                                            name: e.name,
                                            //relatedShow: e.relatedShow,
                                            //relatedSeason: e.relatedSeason 
                                            longDescription: e.longDescription,
                                            shortDescrition: e.shortDescrition,
                                            featuredImage: e.featuredImage,
                                            videoFragmentURL: e.videoFragmentURL,
                                            //rating: e.rating
                                        }
                                    })        
                            }   
                        })
                })
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
        posterImage: req.file.path,
        longDescrition: req.body.longDescrition,
        shortDescrition: req.body.shortDescrition,
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