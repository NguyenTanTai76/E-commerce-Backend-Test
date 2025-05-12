const Category = require("../models/categoryModel");
exports.getAll = async (req, res) => {
  try {
    const data = await Category.getAll();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Lỗi lấy danh mục" });
  }
};
