// Xử lý sản phẩm
const db = require('../config/db');
module.exports = {
  getAll: () => db('products').select('*'),
  getByCategory: (catId) =>
    db('products')
      .join('product_categories', 'products.id', 'product_categories.product_id')
      .where('category_id', catId)
      .select('products.*'),
  search: (q) =>
    db('products').whereILike('name', `%${q}%`).select('*')
};