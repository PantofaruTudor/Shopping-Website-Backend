const express = require('express')
const router = express.Router()

const {
    getAllProducts,
} = require('../controllers/controllers')

router.route('/api/v1/products').get(getAllProducts)
router.route('/').get(getAllProducts)


module.exports = router