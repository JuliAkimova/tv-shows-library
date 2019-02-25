const mongoose = require('mongoose');

// Import Show model
const Show = require('../models/show');

// Import Season model
const Season = require('../models/season');

// Import Episode model
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
            res.status(200).json({
                episodes: season.episodes.map(e => {
                    return {
                        _id: e._id,
                        name: e.name,
                        number: e.number,
                        relatedShow: e.relatedShow,
                        relatedSeason: e.relatedSeason,
                        longDescription: e.longDescription,
                        shortDescription: e.shortDescription,
                        featuredImage: {
                            square: 'http://127.0.0.1:3000/uploads/' + e.featuredImage.square,
                            wide: 'http://127.0.0.1:3000/uploads/' + e.featuredImage.wide,
                            extraWide: 'http://127.0.0.1:3000/uploads/' + e.featuredImage.extraWide
                        },
                        videoFragmentURL: e.videoFragmentURL,
                        rating: e.rating
                    }
                })
            });
        })
    .catch(err => res.status(500).json({ error: err }));
};

exports.get_certain_episode = (req, res, next) => {
    Episode
        .findById(req.params.episodeId)
        //.then(episode => {console.log(episode)})
         .then(doc => {
            if (doc) {
                res.status(200).json({
                    episode: {
                        _id: doc._id,
                        name: doc.name,
                        number: doc.number,
                        relatedShow: doc.relatedShow,
                        relatedSeason: doc.relatedSeason,
                        longDescription: doc.longDescription,
                        shortDescription: doc.shortDescription,
                        featuredImage: {
                            square: 'http://127.0.0.1:3000/uploads/' + doc.featuredImage.square,
                            wide: 'http://127.0.0.1:3000/uploads/' + doc.featuredImage.wide,
                            extraWide: 'http://127.0.0.1:3000/uploads/' + doc.featuredImage.extraWide
                        },
                        videoFragmentURL: doc.videoFragmentURL,
                        rating: doc.rating
                    }
                })
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
