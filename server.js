// server.js: file chạy chính
require("dotenv").config(); // load .env
const express = require("express"); // import Express
const apiRouter = require("./src/routes/api"); // import routes
const db = require("./src/config/db");

const app = express();
app.use(express.json()); // để nhận JSON trong body

db();

// mọi API dưới /api sẽ xử lý ở apiRouter
app.use("/api", apiRouter);

// Bắt đầu server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server chạy ở http://localhost:${PORT}`);
});
