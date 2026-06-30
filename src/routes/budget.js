const express = require('express');
const Budget = require('../models/Budget');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create budget
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { category, limitAmount, period, alertThreshold } = req.body;

    const budgetExists = await Budget.findOne({
      userId: req.user._id,
      category,
      period,
    });
    if (budgetExists) {
      return res.status(400).json({ success: false, message: 'Budget already exists for this category' });
    }

    const budget = new Budget({
      userId: req.user._id,
      category,
      limitAmount,
      period,
      alertThreshold,
    });
    await budget.save();
    await budget.populate('category');

    res.status(201).json({
      success: true,
      message: 'Budget created successfully',
      data: budget,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all budgets
router.get('/', authMiddleware, async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user._id }).populate('category');
    res.status(200).json({ success: true, data: budgets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update budget
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const budget = await Budget.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate('category');

    if (!budget) {
      return res.status(404).json({ success: false, message: 'Budget not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Budget updated successfully',
      data: budget,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete budget
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!budget) {
      return res.status(404).json({ success: false, message: 'Budget not found' });
    }

    res.status(200).json({ success: true, message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
