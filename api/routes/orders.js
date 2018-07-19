const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Order = require('./models/Order')
const Product = require('./models/Product')

router.get('/', (req, res, next) => {
  Order.find()
    .select('_id product quantity')
    .exec()
    .then(orders => {
      const response = {
        orders: orders.map(order => {
          return {
            _id: order._id,
            product: order.product,
            quantity: order.quantity,
            url:
              (req.secure ? 'https://' : 'http://') +
              req.get('host') +
              req.originalUrl +
              order._id,
            request: {
              type: req.method,
              secure: req.secure,
              host: req.get('host'),
              hostname: req.hostname,
              originalUrl: req.originalUrl
            }
          }
        })
      }

      res.status(200).json({ response })
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
})

router.post('/', (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      })

      order
        .save()
        .then(order => {
          res.status(200).json({
            order: order
          })
        })
        .catch(error => {
          res.status(500).json({
            error: error
          })
        })
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
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
