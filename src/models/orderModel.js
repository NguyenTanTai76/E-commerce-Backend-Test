// Tạo đơn hàng
const db = require('../config/db');
module.exports = {
  createOrder: (order) => db('orders').insert(order).returning('*'),
  addItem: (item) => db('order_items').insert(item)
};