const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('./check-auth');

//store images in dababase
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    }
});

//require show model
const Show = require('../models/show');
//require season model
const Season = require('../models/season');
//require episode model
const Episode = require('../models/episode');


//@route POST api/shows
//@desc Create a show
//@access Private
router.post('/', checkAuth, upload.single('posterImage'), (req, res, next) => {
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
                createdShow: {
                    _id: result.id,
                    title: result.title,
                    subtitle: result.subtitle,
                    dateOfStart: result.dateOfStart,
                    longDescrition: result.longDescrition,
                    shortDescrition: result.shortDescrition,
                    priority: result.priority,
                    videoFragmentURL: result.videoFragmentURL,
                    request: {
                        type: 'GET',
                        url: `http://127.0.0.1:3000/api/shows/${result._id}`
                    } 
                } 
            });
        })
        .catch(err => res.status(500).json({error: err}))
});

//@route GET api/shows
//@desc Get all shows
//@access Public
router.get('/', (req, res, next) => {
    Show.find({})
        //.select('_id title subtitle...')
        .then(docs => {
            const response = {
                count: docs.length,
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
                        request: {
                            type: 'GET',
                            url: `http://127.0.0.1:3000/api/shows/${doc._id}`
                        }
                    };
                })

            }; 
            res.status(200).json(response);
        })    
        .catch(err => res.status(404).send(err)) 
});

//@route GET api/shows/:id
//@desc Get show with specific id
//@access Public
router.get('/:showId', (req, res, next) => {
    Show.findById(req.params.showId)
        .then(doc => {
            if(doc) {
                res.status(200).json({
                    show: doc,
                    request: {
                        type: 'GET',
                        url: `http://127.0.0.1:3000/api/shows`
                    }
                })
            } else {
                res.status(404).json({ massage: 'No valid entry found for provided ID' })
            }
        })
        .catch(err => res.status(500).json({ error: err }))
});

//@route PATCH api/items/:id
//@desc Update a show
//@access Private
router.patch('/:showId', checkAuth, (req, res, next) => {
    Show.findByIdAndUpdate({ _id: req.params.showId }, req.body)
        .then(() => {
            Show.findOne({ _id: req.params.showId })
            .then(result => {
                res.status(200).json({
                    message: 'Show updated',
                    title: result.title,
                    request: {
                        type: 'GET',
                        url: `http://127.0.0.1:3000/api/shows/${req.params.showId}`
                    }
                })
            })
        .catch(err => res.status(500).json({ error: err }))    
    });
});

//@route DELETE api/items/:id
//@desc Delete a show
//@access Private
router.delete('/:showId', checkAuth, (req, res, next) => {
    Show.findByIdAndRemove({ _id: req.params.showId })
        .then(() => {
            res.status(200).json({
                message: 'Show deleted'
            })
        })
        .catch(err => res.status(500).json({ deleted: false, error: err }))
});

module.exports = router;