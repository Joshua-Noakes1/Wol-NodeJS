const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
    route
} = require('./products');

router.post('/signup', (req, res, next) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(doc => {
            if (doc.length >= 1) {
                return res.status(409).json({
                    error: `email ${req.body.email} has already signed up!`
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(doc => {
                                console.log(doc);
                                res.status(201).json({
                                    message: 'User Created'
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                });
            }
        })
});

router.post('/login', (req, res, next) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(doc => {
            if (doc.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, doc[0].password, (err, result) => {
                if (err) {
                    res.status(401).json({
                        message: 'Auth Failed'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: doc[0].email,
                        userid: doc[0]._id
                    }, process.env.JWT_KEY, {
                        expiresIn: "1h",
                    })
                    return res.status(200).json({
                        message: 'Auth Successful',
                        token: token
                    })
                }
                res.status(401).json({
                    message: 'Auth Failed'
                })
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.delete('/:id', (req, res, next) => {
    User.remove({
            _id: req.params.id
        })
        .exec()
        .then(doc => {
            res.status(200).json({
                message: 'User Deleted'
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        });
});
module.exports = router;