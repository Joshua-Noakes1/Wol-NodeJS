const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../auth/check-auth');

const Product = require('../models/products');

router.get('/', (req, res, next) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(doc => {
            const response = {
                count: doc.length,
                products: doc.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        url: {
                            type: 'GET',
                            url: 'http://localhost:3001/products/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.post('/', checkAuth, (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created product successfuly',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3001/products/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findById(id).exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id
                });
            } else {
                res.status(404).json({
                    message: 'No data found'
                })
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, { $set: updateOps})
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.remove({
            _id: id
        })
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;