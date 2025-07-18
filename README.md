# 🛒 E-commerce-Backend-Test

Backend API for an e-commerce platform built with **Node.js** and **PostgreSQL**.

## 📦 Features

- Product & category management with discount support  
- Track inventory across stores  
- Multi-voucher support during checkout  
- Fees & discount handling in orders  
- RESTful API with async email confirmation  

---

## 🧰 Stack
Node.js, Express, PostgreSQL

Sequelize or Knex.js

Nodemailer, dotenv, pg

---

## 🧩 Challenge Summary

### a) Database Design

Normalized relational schema includes:

- `users`, `addresses`, `products`, `categories`, `stores`, `orders`, `order_items`, `vouchers`, `fees`
- Applied **1NF**, **2NF**, **3NF**

---

### b) Sample Order Insert

```sql
-- Insert user, get user_id
-- Insert order with user_id, get order_id
-- Insert order_items linked to order_id and product_id

---

### c) Avg Order Value per Month

SELECT DATE_TRUNC('month', o.order_date) AS month,
AVG(oi.quantity * oi.price) AS avg_value
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
WHERE EXTRACT(YEAR FROM o.order_date) = EXTRACT(YEAR FROM CURRENT_DATE)
GROUP BY month;

---

### d) Churn Rate

-- % of users who ordered 6–12 months ago but not in last 6 months

---

### e) RESTful API Endpoints

GET /api/categories

GET /api/categories/:id/products

GET /api/products/search?...

POST /api/orders
(Email confirmation sent asynchronously)

---

## Setup
git clone <repo-url>
cd E-commerce-Backend-Test
npm install
cp .env.example .env
npm run dev

## .env.example 
# Server configuration
PORT=3000

# PostgreSQL Database configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_NAME=ecommerce_db

# Email service configuration
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password