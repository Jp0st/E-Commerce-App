const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const categoryData = await Category.findAll({
            include: [{ model: Product }],
        });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const categoryId = await Category.findByPk(req.params.id, {
            include: [{ model: Product }],
        });
        if (!categoryId) {
            res.status(404).json({ message: 'There is no category with that id.' });
            return;
        }
        res.status(200).json(categoryId);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(200).json(newCategory);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updateCategory = await Category.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!updateCategory) {
            res.status(404).json({ message: 'There is no category with that id.' });
            return;
        }
        res.status(200).json(updateCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteCategory = await Category.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!deleteCategory) {
            res.status(404).json({ message: 'There is no category with that id.' });
            return;
        }
        res.status(200).json(deleteCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
