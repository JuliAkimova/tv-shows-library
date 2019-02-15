const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Import admin model
const Admin = require('../models/admin');

//@route POST admin/signup
//@desc Create new administrator
//@access Public
router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: err });
        } else {
            const admin = new Admin({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
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
        }
    })
});

//@route POST admin/signin
//@desc Administrator authentication
//@access Public
router.post('/signin', (req, res, next) => {
    Admin.findOne({ email: req.body.email })
    .then(admin => {
        if (!admin) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, admin.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if (result) {
                return res.status(200).json({
                    message: 'Auth successful'
            });
            }
            res.status(401).json({
                message: 'Auth failed'
            });
        });
    })
    .catch(err => res.status(500).json({error: err}))
});


module.exports = router;