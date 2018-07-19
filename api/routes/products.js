const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const ProductsController = require('../controllers/products')

router.get('/', ProductsController.getAll)

router.post('/', checkAuth, ProductsController.store)

router.get('/:id', ProductsController.getById)

router.patch('/:id', checkAuth, ProductsController.update)

router.delete('/:id', checkAuth, ProductsController.deleteById)

module.exports = router
