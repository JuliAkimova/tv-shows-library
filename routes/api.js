const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('./check-auth');

// Import shows controller
const showsController = require('../controllers/shows');

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

//@route GET api/shows
//@desc Get all shows
//@access Public
router.get('/', showsController.get_all_shows);

//@route GET api/shows/:id
//@desc Get show with specific id
//@access Public
router.get('/:showId', showsController.get_certain_show);

//@route POST api/shows
//@desc Create a show
//@access Private
router.post('/', checkAuth, upload.single('posterImage'), showsController.create_show);

//@route PATCH api/items/:id
//@desc Update a show
//@access Private
router.patch('/:showId', checkAuth, showsController.update_show);

//@route DELETE api/items/:id
//@desc Delete a show
//@access Private
router.delete('/:showId', checkAuth, showsController.delete_show);

module.exports = router;