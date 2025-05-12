const db = require("../config/db");

exports.getAll = async (req, res) => {
  try {
    const categories = await db("categories").select("*");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Lỗi lấy danh mục" });
  }
};
