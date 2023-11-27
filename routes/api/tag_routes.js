const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const tagData = await Tag.findAll({
            include: [{ model: Product }],
        });
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const tagId = await Tag.findByPk(req.params.id, {
            include: [{ model: Product }],
        });
        if (!tagId) {
            res.status(404).json({ message: 'There is no tag with that id.' });
            return;
        }
        res.status(200).json(tagId);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newTag = await Tag.create(req.body);
        if (!newTag) {
            res.status(404).json({ message: 'There is no tag with that id.' });
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updateTag = await Tag.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!updateTag) {
            res.status(404).json({ message: 'There is no tag with that id.' });
            return;
        }
        res.status(200).json(updateTag);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteTag = await Tag.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!deleteTag) {
            res.status(404).json({ message: 'There is no tag with that id.' });
            return;
        }
        res.status(200).json(deleteTag);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;