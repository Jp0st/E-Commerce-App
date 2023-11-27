const router = require('express').Router();
const categoryRoutes = require('./category_routes');
const productRoutes = require('./product_routes');
const tagRoutes = require('./tag_routes');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

module.exports = router;