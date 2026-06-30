const express = require('express');
const Category = require('../models/Category');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create category
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, icon, color } = req.body;

    const categoryExists = await Category.findOne({ userId: req.user._id, name });
    if (categoryExists) {
      return res.status(400).json({ success: false, message: 'Category already exists' });
    }

    const category = new Category({
      userId: req.user._id,
      name,
      description,
      icon,
      color,
    });
    await category.save();

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all categories
router.get('/', authMiddleware, async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update category
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete category
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
