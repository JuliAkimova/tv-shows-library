const mongoose = require('mongoose');

const episodeTemplate = require('./templates/episode-template');

const convert2XML = require('../routes/convert2XML');

// Import Models
const Show = require('../models/show');
const Season = require('../models/season');
const Episode = require('../models/episode');

exports.get_all_episodes = (req, res, next) => {
    Season
        .findById(req.params.seasonId)
        .populate('episodes')
        .then(season => {
            if (!season) {
                return res.status(404).json({
                    message: "Season not found"
                });
            }
            const response = {
                episodes: season.episodes.map(doc => episodeTemplate(doc))
            }
            const query = req.query.format;
            query === 'xml'
                ? res.set('Content-Type', 'text/xml') 
                : res.set('Content-Type', 'application/json');
            res.status(200).send(convert2XML(query, response)); 

        })
    .catch(err => res.status(500).json({ error: err }));
};

exports.get_certain_episode = (req, res, next) => {
    Episode
        .findById(req.params.episodeId)
        .then(doc => {
            if (doc) {
                const response = episodeTemplate(doc);
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

exports.create_episode = (req, res, next) => {
    Season
        .findById(req.params.seasonId)
        .then(season => {
            if (!season) {
                return res.status(404).json({
                    message: "Season not found"
                });
            }
        const newEpisode = new Episode({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            number: req.body.number,
            relatedShow: req.body.relatedShow,
            relatedSeason: req.body.relatedSeason,
            longDescription: req.body.longDescription,
            shortDescription: req.body.shortDescription,
            featuredImage: {
                square: req.files.square[0].filename,
                wide: req.files.wide[0].filename,
                extraWide: req.files.extraWide[0].filename
            },
            videoFragmentURL: req.body.videoFragmentURL
        });

        //assign episode as a part of season
        newEpisode.season = season._id;

        newEpisode.save();

        //add created episode to episodes array
        season.episodes.push(newEpisode);

        season.save();
    }) 
    .then(result => {
        res.status(200).json({
            message: 'Episode created successfully',
            episode: result
        })
    })  
    .catch(err => res.status(500).json({ error: err })); 
};

exports.update_episode = (req, res, next) => {
    Episode
        .findByIdAndUpdate({ _id: req.params.episodeId }, req.body)
        .then(() => {
            Episode
                .findOne({ _id: req.params.episodeId })
                .then(result => {
                    res.status(200).json({
                        message: 'Episode updated',
                        updatedShow: result
                    })
                })
        .catch(err => res.status(500).json({ updated: false, error: err }))    
    }); 
};

exports.delete_episode = (req, res, next) => {
    Episode
        .findByIdAndRemove({ _id: req.params.seasonId })
        .then(() => {
            res.status(200).json({
                message: 'Episode deleted'
            })
        })
    .catch(err => res.status(500).json({ deleted: false, error: err }))
}
