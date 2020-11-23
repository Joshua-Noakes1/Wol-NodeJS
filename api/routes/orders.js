const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/orders');
const Product = require('../models/products');
router.get('/', (req, res, next) => {
    Order.find()
        .select('product quanity _id')
        .exec()
        .then(doc => {
            res.status(200).json({
                count: doc.length,
                orders: doc.map(doc => {
                    return {
                        _id: doc._id,
                        procuct: doc.product,
                        quanity: doc.quanity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3001/orders/' + doc._id
                        }
                    }
                }),
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

router.post('/', (req, res, next) => {
    Product.findById(req.body.product)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save();
        })
        .then(doc => {
            console.log(doc);
            res.status(201).json({
                message: "Order Made",
                request: {
                    type: 'GET',
                    url: 'http://localhost:3001/orders/' + doc._id
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
    Order.findById(req.params.id)
        .exec()
        .then(doc => {
            res.status(200).json({
                order: doc,
            })
        })
});

router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted',
        Orderid: req.params.id
    });
});
module.exports = router;