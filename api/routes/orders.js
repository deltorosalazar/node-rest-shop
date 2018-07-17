const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders fetched'
    })
})

router.post('/', (req, res, next) => {
    const order = {
        product_id: req.body.product_id,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'Order created!',
        order: order
    })
})

router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Order Details',
        id: id
    })
})

router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Order Deleted',
        id: id
    })
})

module.exports = router