// Lấy user theo id
const db = require("../config/db");
module.exports = {
  getById: (id) => db("users").where("id", id).first(),
  getByEmail: (email) => db("users").where("email", email).first(),
};
