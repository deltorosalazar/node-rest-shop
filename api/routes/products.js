const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('./models/Product')

router.get('/', (req, res, next) => {
    Product.find()
        .select('_id name price')
        .then(products => {

            const response = {
                count: products.length,
                products: products.map(product => {
                    return {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        url: (req.secure ? 'https://' : 'http://') + req.get('host') + req.originalUrl + product._id,
                        request: {
                            type: req.method,
                            secure: req.secure,
                            host: req.get('host') ,
                            hostname: req.hostname,
                            originalUrl: req.originalUrl
                        }
                    }
                })
            }

            if (products.length > 0) {
                res.status(200).json(response)
            } else {
                res.status(200).json({
                    message: "No Products founds"
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: error
            })
        })

})

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    product.save()
        .then(product => {

            const response = {
                _id: product._id,
                name: product.name,
                price: product.price,
                url: (req.secure ? 'https://' : 'http://') + req.get('host') + req.originalUrl + product._id,
                request: {
                    type: req.method,
                    secure: req.secure,
                    host: req.get('host') ,
                    hostname: req.hostname,
                    originalUrl: req.originalUrl
                }
            }
            
            res.status(201).json(response)
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id

    Product.findById(id)
        .then(product => {
            console.log(product)
            if (product) {
                res.status(200).json({
                    product: product
                })
            } else {
                res.status(404).json({
                    message: 'Product not found!'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
            console.log(response)
        })
})

router.patch('/:id', (req, res, next) => {
    const id = req.params.id

    const updateOperations = {}

    for (let operation of req.body) {
        console.log(req.body)
        updateOperations[operation.propName] = operation.value;   
    }

    Product.update({ _id: id}, {
        $set: updateOperations
    })
    .then(product => {
        res.status(200).json({
            product: product
        })
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id

    Product.remove({
        _id: id
    })
    .then(result => {
        res.status(200).json({
            result: result
        })
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
})


module.exports = router