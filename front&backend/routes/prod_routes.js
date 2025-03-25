const express = require('express')
const router = express.Router()

const {
    getAllProducts,
    getPaginatedItems,
    itemInsert,
} = require('../controllers/controllers')

router.route('/api/v1/products').get(getAllProducts)
router.route('/').get(getAllProducts)


module.exports = router