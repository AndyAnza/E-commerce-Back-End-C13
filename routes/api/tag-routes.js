const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // find all tags
    // be sure to include its associated Product data
    const allTags = await Tag.findAll({
      include: [{ model: Product }],
      distinct: true,
    });
    res.status(200).json(allTags);
  } catch {
    err => res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const selectedTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!selectedTag) {
      return res
        .status(400)
        .json({ message: 'There are no tags that match the provided ID' });
    }
    return res.status(200).json(selectedTag);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    return res.status(200).json(tag);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tag[0]) {
      return res
        .status(400)
        .json({ message: 'There are no tags that match the provided ID' });
    }
    return res.status(200).json(req.body);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedTag) {
      return res
        .status(400)
        .json({ message: 'There are no tags that match the provided ID' });
    }
    return res.status(200).json({ message: 'Tag deleted 🚮' });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
