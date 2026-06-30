const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    limitAmount: {
      type: Number,
      required: [true, 'Please provide budget limit'],
      min: [0, 'Limit must be greater than 0'],
    },
    period: {
      type: String,
      enum: ['weekly', 'monthly', 'yearly'],
      default: 'monthly',
    },
    alertThreshold: {
      type: Number,
      default: 80,
      min: [0, 'Alert threshold must be between 0 and 100'],
      max: [100, 'Alert threshold must be between 0 and 100'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

budgetSchema.index({ userId: 1, category: 1 });

module.exports = mongoose.model('Budget', budgetSchema);
