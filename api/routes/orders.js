const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const OrdersController = require('../controllers/orders')

router.get('/', OrdersController.getAll)

router.post('/', checkAuth, OrdersController.store)

router.get('/:id', OrdersController.getById)

router.delete('/:id', checkAuth, OrdersController.removeById)

module.exports = router
