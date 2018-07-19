const Order = require('../routes/models/Order')
const Product = require('../routes/models/Order')

const mongoose = require('mongoose')

exports.getAll = (req, res, next) => {
  Order.find()
    .select('_id product quantity')
    .populate('product')
    .exec()
    .then(orders => {
      const response = {
        count: orders.length,
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
}

exports.store = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: 'Product not found'
        })
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      })

      return order.save()
    })
    .then(order => {
      res.status(200).json({
        message: 'Order created!',
        order: order
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
}

exports.getById = (req, res, next) => {
  Order.findById(req.params.id)
    .exec()
    .populate('product')
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: 'Order not found'
        })
      }
      res.status(200).json({
        message: 'Order Details',
        order: order
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
}

exports.removeById = (req, res, next) => {
  Order.remove({ _id: req.params.id })
    .exec()
    .then(order => {
      res.status(200).json({
        message: 'Order Deleted'
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
}
