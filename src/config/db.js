// src/config/db.js

const knex = require("knex");
require("dotenv").config(); // đọc file .env

const db = knex({
  client: "pg", // loại DB Postgres
  connection: {
    host: process.env.DB_HOST, // địa chỉ máy chủ DB
    port: process.env.DB_PORT, // cổng kết nối
    user: process.env.DB_USER, // tên user
    password: process.env.DB_PASSWORD, // mật khẩu
    database: process.env.DB_NAME, // tên DB
  },
});

module.exports = db;
