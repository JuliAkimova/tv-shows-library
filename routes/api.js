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

