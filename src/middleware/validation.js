const Joi = require('joi');

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return res.status(400).json({ success: false, errors: messages });
    }

    req.body = value;
    next();
  };
};

const schemas = {
  register: Joi.object({
    name: Joi.string().required().max(50),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  createExpense: Joi.object({
    title: Joi.string().required().max(100),
    description: Joi.string().max(500),
    amount: Joi.number().positive().required(),
    category: Joi.string().required(),
    date: Joi.date().required(),
    paymentMethod: Joi.string().valid('cash', 'credit_card', 'debit_card', 'upi', 'bank_transfer'),
    tags: Joi.array().items(Joi.string()),
  }),
};

module.exports = { validateRequest, schemas };
