const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('./models/Product')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET Request to /products'
    })
})

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    product.save()
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            console.log(error)
        })

    res.status(201).json({
        message: 'Product created!',
        product: product
    })
})

router.get('/:id', (req, res, next) => {
    let id = req.params.id
    res.status(200).json({
        message: 'You passed an ID',
        id: id
    })
})

router.patch('/:id', (req, res, next) => {
    let id = req.params.id
    res.status(200).json({
        message: 'Product Updated',
    })
})

router.delete('/:id', (req, res, next) => {
    let id = req.params.id
    res.status(200).json({
        message: 'Product Deleted',
    })
})


module.exports = router