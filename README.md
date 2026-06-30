# Expense Tracker - Backend API

A comprehensive backend-focused expense tracking API built with Node.js, Express.js, and MongoDB. This application helps users manage their expenses, set budgets, and track spending patterns.

## 🚀 Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **Expense Management**: Create, read, update, and delete expenses
- **Category Management**: Organize expenses with custom categories
- **Budget Tracking**: Set monthly/weekly/yearly budgets and monitor spending
- **Expense Analytics**: Get statistics and insights about spending patterns
- **Recurring Expenses**: Support for recurring expense tracking
- **Payment Methods**: Multiple payment method support (cash, cards, UPI, bank transfer)
- **Data Validation**: Comprehensive input validation with Joi
- **CORS Support**: Configured for frontend integration

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lavkush2/ExpanseTracker.git
   cd ExpanseTracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your configuration:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/expense_tracker
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRE=7d
   API_PREFIX=/api/v1
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Run the server**
   ```bash
   npm run dev
   ```

   Server will start on `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user

### User
- `GET /api/v1/users/profile` - Get user profile (protected)
- `PUT /api/v1/users/profile` - Update user profile (protected)
- `POST /api/v1/users/change-password` - Change password (protected)

### Expenses
- `POST /api/v1/expenses` - Create new expense (protected)
- `GET /api/v1/expenses` - Get all expenses with filters (protected)
- `GET /api/v1/expenses/:id` - Get single expense (protected)
- `PUT /api/v1/expenses/:id` - Update expense (protected)
- `DELETE /api/v1/expenses/:id` - Delete expense (protected)
- `GET /api/v1/expenses/stats/summary` - Get expense statistics (protected)

### Categories
- `POST /api/v1/categories` - Create category (protected)
- `GET /api/v1/categories` - Get all categories (protected)
- `PUT /api/v1/categories/:id` - Update category (protected)
- `DELETE /api/v1/categories/:id` - Delete category (protected)

### Budgets
- `POST /api/v1/budgets` - Create budget (protected)
- `GET /api/v1/budgets` - Get all budgets (protected)
- `PUT /api/v1/budgets/:id` - Update budget (protected)
- `DELETE /api/v1/budgets/:id` - Delete budget (protected)

## 📖 Example Requests

### Register User
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Expense
```bash
POST /api/v1/expenses
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Grocery Shopping",
  "amount": 50.00,
  "category": "<category_id>",
  "date": "2024-01-15",
  "paymentMethod": "credit_card",
  "description": "Weekly groceries"
}
```

### Get Expenses with Filters
```bash
GET /api/v1/expenses?startDate=2024-01-01&endDate=2024-01-31&category=<category_id>
Authorization: Bearer <token>
```

## 📁 Project Structure

```
src/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   ├── User.js              # User schema
│   ├── Expense.js           # Expense schema
│   ├── Category.js          # Category schema
│   └── Budget.js            # Budget schema
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── user.js              # User routes
│   ├── expense.js           # Expense routes
│   ├── category.js          # Category routes
│   └── budget.js            # Budget routes
├── middleware/
│   ├── auth.js              # JWT authentication
│   └── validation.js        # Request validation
└── server.js                # Main server file
```

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

Tokens are obtained during login/registration and expire based on `JWT_EXPIRE` setting.

## 🧪 Testing

```bash
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email lavkush2@example.com or open an issue in the repository.

## 🗓️ Future Enhancements

- [ ] File upload for receipts
- [ ] Email notifications for budget alerts
- [ ] Advanced analytics and reports
- [ ] Expense sharing with multiple users
- [ ] Mobile app integration
- [ ] Data export (CSV, PDF)
- [ ] Integration with payment gateways
- [ ] Automated recurring expense creation

---

**Made with ❤️ by Lavkush**
