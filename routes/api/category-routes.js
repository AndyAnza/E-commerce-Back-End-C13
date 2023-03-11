const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }], // be sure to include its associated Products
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const selectedCategory = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    if (!selectedCategory) {
      return res
        .status(404)
        .json({ message: 'No category found with that id' });
    }
    return res.status(200).json(selectedCategory);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new category
    const category = await Category.create(req.body);

    res.status(200).json(req.body);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value
    const category = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!category) {
      return res
        .status(400)
        .json({ message: 'No category was found with that id' });
    }
    return res.status(200).json(req.body);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const category = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!category) {
      return res
        .status(400)
        .json({ message: 'No category was found with that id' });
    }
    return res.status(200).json({ message: 'Category deleted 🚮' });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
