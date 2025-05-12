const Product = require("../models/productModel");
exports.getByCategory = async (req, res) => {
  try {
    const data = await Product.getByCategory(req.params.id);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Lỗi lấy sản phẩm" });
  }
};
exports.search = async (req, res) => {
  try {
    const data = await Product.search(req.query.q || "");
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Lỗi tìm kiếm" });
  }
};
