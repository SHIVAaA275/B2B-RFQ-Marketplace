# B2B RFQ Marketplace

A full-stack B2B Request for Quotation (RFQ) marketplace that connects Buyers and Suppliers. Buyers can create and manage RFQs, while Suppliers can browse RFQs and submit quotations.

## Features

### Buyer
- User registration and login
- Create and manage RFQs
- Edit RFQs before quotations are submitted
- View submitted RFQs
- View supplier quotations for RFQs

### Supplier
- User registration and login
- Browse available RFQs
- Search RFQs
- View RFQ details
- Submit quotations
- View submitted quotations

### Authentication & Security
- JWT-based authentication
- HTTP-only cookies for authentication tokens
- bcrypt password hashing
- Role-based authorization
- Protected API routes
- User ownership validation
- Duplicate quotation prevention

## Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios
- JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## Project Structure

```text
B2B-RFQ-Marketplace/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
│   └── package.json
│
└── README.md