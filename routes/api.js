const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

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
//@access Public
router.post('/', upload.single('posterImage'), (req, res, next) => {
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

module.exports = router;