const mongoose = require('mongoose');

const seasonTemplate = require('./templates/season-template');

const convert2XML = require('../routes/convert2XML');

// Import Models
const Show = require('../models/show');
const Season = require('../models/season');
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
                seasons: show.seasons.map(s => seasonTemplate(s))
            }     
            const query = req.query.format;
            query === 'xml'
                ? res.set('Content-Type', 'text/xml') 
                : res.set('Content-Type', 'application/json');
            res.status(200).send(convert2XML(query, response)); 
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.get_certain_season = (req, res, next) => {
    Season
        .findById(req.params.seasonId)
        .populate('episodes')
        .then(doc => {
            if (doc) {
                const response = seasonTemplate(doc);
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
