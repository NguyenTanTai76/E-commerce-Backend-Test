exports.up = function (knex) {
  // tạo bảng theo thứ tự
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id"); // id tự tăng
      table.string("name").notNullable();
      table.string("email").unique().notNullable();
      table.string("phone").notNullable();
    })
    .createTable("addresses", (table) => {
      table.increments("id");
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.string("province");
      table.string("district");
      table.string("commune");
      table.string("street");
      table.string("housing_type");
    })
    .createTable("categories", (table) => {
      table.increments("id");
      table.string("name").notNullable();
    })
    .createTable("products", (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.integer("price").notNullable();
      table.integer("size");
      table.string("color");
      table.integer("quantity").notNullable();
    })
    .createTable("product_categories", (table) => {
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products");
      table
        .integer("category_id")
        .unsigned()
        .references("id")
        .inTable("categories");
      table.primary(["product_id", "category_id"]);
    })
    .createTable("stores", (table) => {
      table.increments("id");
      table.string("name");
      table.string("location");
    })
    .createTable("product_stocks", (table) => {
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products");
      table.integer("store_id").unsigned().references("id").inTable("stores");
      table.integer("quantity");
      table.primary(["product_id", "store_id"]);
    })
    .createTable("vouchers", (table) => {
      table.increments("id");
      table.string("code").notNullable();
      table.integer("discount_percent").notNullable();
    })
    .createTable("user_vouchers", (table) => {
      table.integer("user_id").unsigned().references("id").inTable("users");
      table
        .integer("voucher_id")
        .unsigned()
        .references("id")
        .inTable("vouchers");
      table.primary(["user_id", "voucher_id"]);
    })
    .createTable("orders", (table) => {
      table.increments("id");
      table.integer("user_id").unsigned().references("id").inTable("users");
      table
        .integer("address_id")
        .unsigned()
        .references("id")
        .inTable("addresses");
      table.integer("total_amount");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("order_items", (table) => {
      table.integer("order_id").unsigned().references("id").inTable("orders");
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products");
      table.integer("price");
      table.integer("quantity");
      table.primary(["order_id", "product_id"]);
    })
    .createTable("order_adjustments", (table) => {
      table.increments("id");
      table.integer("order_id").unsigned().references("id").inTable("orders");
      table.string("type"); // fee hoặc discount
      table.integer("amount");
    });
};

exports.down = function (knex) {
  // xóa bảng ngược lại
  return knex.schema
    .dropTableIfExists("order_adjustments")
    .dropTableIfExists("order_items")
    .dropTableIfExists("orders")
    .dropTableIfExists("user_vouchers")
    .dropTableIfExists("vouchers")
    .dropTableIfExists("product_stocks")
    .dropTableIfExists("stores")
    .dropTableIfExists("product_categories")
    .dropTableIfExists("products")
    .dropTableIfExists("categories")
    .dropTableIfExists("addresses")
    .dropTableIfExists("users");
};
