const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const productData = await Product.findAll({
            include: [{ model: Category }, { model: Tag, through: ProductTag }],
        });
        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const productId = await Product.findByPk(req.params.id, {
            include: [{ model: Category }, { model: Tag, through: ProductTag }],
        });
        if (!productId) {
            res.status(404).json({ message: 'There is no product with that id.' });
            return;
        }
        res.status(200).json(productId);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', (req, res) => {
    const { product_name, price, stock, tagIds } = req.body;

    Product.create({ product_name, price, stock })
        .then((product) => {
            if (tagIds && tagIds.length) {
                const productTagIdArr = tagIds.map((tag_id) => ({
                    product_id: product.id,
                    tag_id,
                }));
                return ProductTag.bulkCreate(productTagIdArr);
            }
            res.status(201).json(product); 
        })
        .then((productTagIds) => {
            res.status(201).json({ productTagIds, message: 'Product and Tags created successfully' });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

router.put('/:id',(req, res) => {
    Product.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((product) => {
            return ProductTag.findAll({ where: { product_id: req.params.id } });
        })
        .then((productTags) => {
            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            const newProductTags = req.body.tagIds
                .filter((tag_id) => !productTagIds.includes(tag_id))
                .map((tag_id) => {
                    return {
                        product_id: req.params.id,
                        tag_id,
                    };
                });
            const productTagsToRemove = productTags
                .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                .map(({ id }) => id);

            return Promise.all([
                ProductTag.destroy({ where: { id: productTagsToRemove } }),
                ProductTag.bulkCreate(newProductTags),
            ]);
        })
        .then((updatedProductTags) => res.json(updatedProductTags))
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteProduct = await Product.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!deleteProduct) {
            res.status(404).json({ message: 'There is no product with that id.' });
            return;
        }
        res.status(200).json(deleteProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;