// const express = require('express')
// const router = express.Router()

// const {
//     getAllProducts,
// } = require('../controllers/controllers')

// router.route('/').get(getAllProducts)


// module.exports = router


const express = require('express');

module.exports = (Product) => {
    const router = express.Router();

    const { getAllProducts } = require('../controllers/controllers')(Product);

    router.route('/').get(getAllProducts);

    return router;
};