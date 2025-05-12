const express = require("express");
const router = express.Router();

const categoryRoutes = require("../controllers/categoryController");
const productRoutes = require("../controllers/productController");
const orderRoutes = require("../controllers/orderController");

// 1. Lấy danh mục
router.get("/categories", categoryRoutes.getAll);
// 2. Lấy sản phẩm theo danh mục
router.get("/categories/:id/products", productRoutes.getByCategory);
// 3. Tìm kiếm sản phẩm
router.get("/products/search", productRoutes.search);
// 4. Tạo đơn
router.post("/orders", orderRoutes.createOrder);

module.exports = router;
