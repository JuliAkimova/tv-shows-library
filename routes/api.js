const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('./check-auth');

// Import shows controller
const showsController = require('../controllers/shows');

// Import seasons controller
const seasonsController = require('../controllers/seasons');

// Import seasons controller
const episodesController = require('../controllers/episodes');

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
router.post('/', checkAuth, 
                upload.fields([
                    { name: 'square', maxCount: 1 },
                    { name: 'wide', maxCount: 1 },
                    { name: 'extraWide', maxCount: 1 }
                ]),
                showsController.create_show
);
//@route PATCH api/shows/:id
//@desc Update a show
//@access Private
router.patch('/:showId', checkAuth, showsController.update_show);

//@route DELETE api/showss/:id
//@desc Delete a show
//@access Private
router.delete('/:showId', checkAuth, showsController.delete_show);


//@route GET api/shows/:id/seasons
//@desc Get all seasons of a specific show
//@access Public
router.get('/:showId/seasons',  seasonsController.get_all_seasons);

//@route GET api/shows/:id/seasons/:id
//@desc Get certain season of a specific show
//@access Public
router.get('/:showId/seasons/:seasonId',  seasonsController.get_certain_season);

//@route POST api/shows/:id/seasons
//@desc Create a season of a certain show
//@access Private
router.post('/:showId/seasons', checkAuth, 
                                upload.fields([
                                    { name: 'square', maxCount: 1 },
                                    { name: 'wide', maxCount: 1 },
                                    { name: 'extraWide', maxCount: 1 }
                                ]),
                                seasonsController.create_season
);
//@route PATCH api/shows/:id/seasons/:id
//@desc Season update
//@access Private
router.patch('/:showId/seasons/:seasonId', checkAuth, seasonsController.update_season);

//@route DELETE api/shows/:id/seasons/:id
//@desc Delete season
//@access Private
router.delete('/:showId/seasons/:seasonId', checkAuth, seasonsController.delete_season);


//@route GET api/shows/:id/seasons/:id/episodes
//@desc Get all episodes of a specific season
//@access Public
router.get('/:showId/seasons/:seasonId/episodes',  episodesController.get_all_episodes);

//@route GET api/shows/:id/seasons/:id/episodes/:id
//@desc Get a certain episode of a specific season
//@access Public
router.get('/:showId/seasons/:seasonId/episodes/:episodeId',  episodesController.get_certain_episode);

//@route POST api/shows/:id/seasons/:id
//@desc Create an episode of a certain season
//@access Private
router.post('/:showId/seasons/:seasonId/episodes', checkAuth , 
                                                    upload.fields([
                                                        { name: 'square', maxCount: 1 },
                                                        { name: 'wide', maxCount: 1 },
                                                        { name: 'extraWide', maxCount: 1 }
                                                    ]),
                                                    episodesController.create_episode);

//@route PATCH api/shows/:id/seasons/:id/episodes/:id
//@desc Update episode
//@access Private
router.patch('/:showId/seasons/:seasonId/episodes/:episodeId', checkAuth, episodesController.update_episode);

//@route DELETE api/shows/:id/seasons/:id/episodes/:id
//@desc Delete episode
//@access Private
router.delete('/:showId/seasons/:seasonId/episodes/:episodeId', checkAuth, episodesController.delete_episode);

module.exports = router;