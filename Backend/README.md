# E-commerce API

A backend REST API for an e-commerce platform, supporting user accounts, product catalog management, a shopping cart, and checkout with order creation. Built with Node.js, Express, TypeScript, and Mongoose (MongoDB).

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Language:** TypeScript
- **ODM:** Mongoose
- **Database:** MongoDB
- **Auth:** JWT (jsonwebtoken) + bcrypt for password hashing
- **Email:** Nodemailer (Gmail SMTP)

## Features

- User registration and login with hashed passwords
- JWT-based authentication with role-based access control (`USER`, `ADMIN`)
- Welcome email sent automatically on registration
- Product catalog with categories (admin-only management)
- Shopping cart: add, update quantity, and remove items (auto-removes an item when its quantity is set to 0)
- Checkout flow that:
  - Validates stock availability before finalizing an order
  - Creates an order as a price/data snapshot (unaffected by later product price changes)
  - Decrements product stock and empties the cart atomically using a MongoDB transaction (all-or-nothing: if any item is out of stock, nothing is changed)
  - Sends an order confirmation email
- Rate limiting on authentication endpoints to prevent brute-force attacks

## Project Structure

```
.
├── controllers/       # Request handlers
├── db/
│   ├── dbconnections.ts   # MongoDB connection
│   └── models/             # Mongoose schemas (User, Product, Category, Cart, Order)
├── middlewares/         # Auth, rate limiting, email sending
├── routes/              # Express route definitions
├── services/            # Business logic / database queries
└── app.ts               # App entry point
```

## Prerequisites

- Node.js (v18 or later recommended)
- A running MongoDB instance (locally or via MongoDB Atlas)
- A Gmail account with an **App Password** (for sending emails via Nodemailer)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/AMINAHMED00/ecommerce.git
   cd ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root:
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/Ecommerce
   JWT_SECRET=replace_this_with_a_long_random_secret
   EMAIL_USER=your_gmail_address@gmail.com
   EMAIL_PASS=your_16_character_app_password
   ```

4. **Make sure MongoDB is running**
   - Locally: start the MongoDB service, or
   - Atlas: make sure your IP is whitelisted under Network Access

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will run at `http://localhost:2005` by default.

## API Endpoints

### Auth — `/api/users`

Rate limited on register/login.

| Method | Endpoint      | Auth required | Description              |
|--------|---------------|----------------|---------------------------|
| POST   | `/singup`     | No             | Register a new user (sends a welcome email) |
| POST   | `/login`      | No             | Log in and receive a JWT  |
| GET    | `/`           | No             | Get all users             |
| PATCH  | `/update/:id` | No             | Update a user             |
| DELETE | `/delete/:id` | No             | Delete a user             |

### Category — `/api/category`

| Method | Endpoint  | Auth required | Description         |
|--------|-----------|----------------|-----------------------|
| POST   | `/create` | No             | Create a new category |

### Products — `/api/products`

| Method | Endpoint      | Auth required   | Description       |
|--------|---------------|-------------------|---------------------|
| GET    | `/`           | No                | List all products  |
| POST   | `/create`     | Yes (`ADMIN`)     | Create a new product |
| PATCH  | `/update/:id` | Yes (`ADMIN`)     | Update a product   |
| DELETE | `/delete/:id` | Yes (`ADMIN`)     | Delete a product   |

### Cart — `/api/carts`

| Method | Endpoint  | Auth required | Description                          |
|--------|-----------|------------------|-----------------------------------------|
| POST   | `/add`    | Yes              | Add a product to the cart (or increase its quantity if already present) |
| GET    | `/myCart` | Yes              | Get the logged-in user's cart          |
| PATCH  | `/update` | Yes              | Update an item's quantity (removes the item if quantity ≤ 0) |
| DELETE | `/delete` | Yes              | Remove an item from the cart            |

### Checkout — `/api/checkout`

| Method | Endpoint | Auth required | Description                                    |
|--------|----------|------------------|---------------------------------------------------|
| POST   | `/`      | Yes              | Convert the cart into an order (stock is checked and decremented, cart is emptied, confirmation email is sent) |

## Known Limitations / Roadmap

- No request body validation library (e.g. Zod) is used yet — inputs aren't strictly validated.
- No automated tests yet.
- No `getMyOrders` / `getOrderById` endpoints yet for viewing past orders.
- Payment is mocked — orders are created with a `PENDING` status and there is no real payment gateway integration.
- Several endpoints (e.g. update/delete user, create category) do not yet enforce authentication/authorization.

## License

ISC