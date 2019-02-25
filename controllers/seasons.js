const mongoose = require('mongoose');

// Import Show model
const Show = require('../models/show');

// Import Season model
const Season = require('../models/season');

// Import Episode model
const Episode = require('../models/episode');

exports.get_all_seasons = (req, res, next) => {
    Show
        .findById(req.params.showId)
        .populate({
            path: 'seasons',
            populate: { path: 'episodes' }
        }) 
        .then(show => {
            if (!show) {
                return res.status(404).json({
                    message: "Show not found"
                });
            }
            const response = {
                seasons: show.seasons.map(s => {
                    return {
                        _id: s._id,
                        name: s.name,
                        number: s.number,
                        //relatedShow: s.relatedShow,
                        longDescription: s.longDescription,
                        shortDescrition: s.shortDescrition,
                        featuredImage: {
                            square: 'http://127.0.0.1:3000/uploads/' + s.featuredImage.square,
                            wide: 'http://127.0.0.1:3000/uploads/' + s.featuredImage.wide,
                            extraWide: 'http://127.0.0.1:3000/uploads/' + s.featuredImage.extraWide
                        },
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
                                    shortDescription: e.shortDescription,
                                    featuredImage: {
                                        square: 'http://127.0.0.1:3000/uploads/' + e.featuredImage.square,
                                        wide: 'http://127.0.0.1:3000/uploads/' + e.featuredImage.wide,
                                        extraWide: 'http://127.0.0.1:3000/uploads/' + e.featuredImage.extraWide
                                    },
                                    videoFragmentURL: e.videoFragmentURL,
                                    //rating: e.rating
                                } 
                            })
                    }
                })
            }     
        res.status(200).json(response);
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.get_certain_season = (req, res, next) => {
    Season
        .findById(req.params.seasonId)
        .populate('episodes')
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    season: {
                        _id: doc._id,
                        name: doc.name,
                        number: doc.number,
                        relatedShow: doc.relatedShow,
                        longDescription: doc.longDescription,
                        shortDescription: doc.shortDescription,
                        featuredImage: {
                            square: 'http://127.0.0.1:3000/uploads/' + doc.featuredImage.square,
                            wide: 'http://127.0.0.1:3000/uploads/' + doc.featuredImage.wide,
                            extraWide: 'http://127.0.0.1:3000/uploads/' + doc.featuredImage.extraWide
                        },
                        videoFragmentURL: doc.videoFragmentURL,
                        rating: doc.rating,
                        episodes: doc.episodes.map(e => {
                            return {
                                id: e._id,
                                number: e.number,
                                name: e.name,
                                //relatedShow: e.relatedShow,
                                //relatedSeason: e.relatedSeason 
                                longDescription: e.longDescription,
                                shortDescription: e.shortDescription,
                                featuredImage: {
                                    square: 'http://127.0.0.1:3000/uploads/' + e.featuredImage.square,
                                    wide: 'http://127.0.0.1:3000/uploads/' + e.featuredImage.wide,
                                    extraWide: 'http://127.0.0.1:3000/uploads/' + e.featuredImage.extraWide
                                },
                                videoFragmentURL: e.videoFragmentURL,
                                //rating: e.rating
                            }
                        })
                    }
                })
            } else {
                res.status(404).json({ massage: 'No valid entry found for provided ID' })
            }
        })
        .catch(err => res.status(500).json({ error: err }))
};

exports.create_season = (req, res, next) => {
    Show
        .findById(req.params.showId)
        .then(show => {
            if (!show) {
                return res.status(404).json({
                    message: "Show not found"
                });
            }
            const newSeason = new Season({
                _id: new mongoose.Types.ObjectId,
                name: req.body.name,
                number: req.body.number,
                longDescription: req.body.longDescription,
                shortDescription: req.body.shortDescription,
                featuredImage: {
                    square: req.files.square[0].filename,
                    wide: req.files.wide[0].filename,
                    extraWide: req.files.extraWide[0].filename
                },
                videoFragmentURL: req.body.videoFragmentURL,
                relatedShow: req.body.relatedShow
            });

            // assign season as part of the show
            newSeason.show = show._id;

            newSeason.save();

            //add created season to seasons array
            show.seasons.push(newSeason);

            show.save();
        })
        .then(result => {
            res.status(201).json({
                message: 'Season created successfully',
                createdShow: result
            });
        })
        .catch(err => res.status(500).json({ error: err }))
};

exports.update_season = (req, res, next) => {
    Season
        .findByIdAndUpdate({ _id: req.params.seasonId }, req.body)
        .then(() => {
            Season.
                findOne({ _id: req.params.seasonId })
                .then(result => {
                    res.status(200).json({
                        message: 'Season updated',
                        updatedSeason: result
                    })
                })
        .catch(err => res.status(500).json({ updated: false, error: err }))    
    }); 
};

exports.delete_season = (req, res, next) => {
    Season
        .findByIdAndRemove({ _id: req.params.seasonId })
        .then(() => {
            res.status(200).json({
                message: 'Season deleted'
            })
        })
        .catch(err => res.status(500).json({ deleted: false, error: err }))
}
