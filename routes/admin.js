const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Import admin model
const Admin = require('../models/admin');

//@route POST admin/signup
//@desc Create new administrator
//@access Public
router.post('/signup', (req, res, next) => {
    const admin = new Admin({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: req.body.password
        });
        admin
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Admin created!'
                });
            })
            .catch(err => res.status(500).json({error: err}))
});