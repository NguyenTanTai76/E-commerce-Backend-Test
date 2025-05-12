// controllers/orderController.js
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const db = require("../config/db");
const emailService = require("../services/emailService");

exports.createOrder = async (req, res) => {
  const trx = await db.transaction();

  try {
    const { userId, addressId, items, vouchers, fees } = req.body;

    // 1. Tính tổng tiền sản phẩm
    let total = 0;
    for (let item of items) {
      const product = await trx("products").where("id", item.productId).first();
      if (!product) throw new Error("Sản phẩm không tồn tại");
      total += product.price * item.quantity;
    }

    // 2. Tính giảm giá từ voucher
    let discount = 0;
    if (vouchers?.length > 0) {
      const foundVouchers = await trx("vouchers").whereIn("id", vouchers);
      for (let voucher of foundVouchers) {
        discount += (voucher.discount_percent / 100) * total;
        await trx("user_vouchers")
          .where({ user_id: userId, voucher_id: voucher.id })
          .del(); // xóa voucher đã dùng
      }
    }

    // 3. Tính các khoản phí thêm
    let extraFee = 0;
    if (fees?.length > 0) {
      for (let fee of fees) {
        extraFee += fee.amount;
      }
    }

    const finalTotal = total - discount + extraFee;

    // 4. Tạo đơn hàng
    const [order] = await Order.createOrder({
      user_id: userId,
      address_id: addressId,
      total_amount: finalTotal,
    }).transacting(trx);

    // 5. Thêm các item vào order_items
    for (let item of items) {
      await Order.addItem({
        order_id: order.id,
        product_id: item.productId,
        price: item.price || null,
        quantity: item.quantity,
      }).transacting(trx);
    }

    // 6. Ghi nhận điều chỉnh (voucher/fee)
    if (discount > 0) {
      await trx("order_adjustments").insert({
        order_id: order.id,
        type: "discount",
        amount: -discount,
      });
    }
    if (extraFee > 0) {
      await trx("order_adjustments").insert({
        order_id: order.id,
        type: "fee",
        amount: extraFee,
      });
    }

    // 7. Gửi email xác nhận đơn hàng (không block flow)
    const user = await User.getById(userId);
    emailService
      .send(
        user.email,
        "Đơn hàng đã tạo thành công",
        `Cảm ơn bạn đã đặt hàng. Tổng thanh toán: ${finalTotal}`
      )
      .catch(console.error);

    await trx.commit();
    res.json({ success: true, order });
  } catch (e) {
    await trx.rollback();
    res.status(500).json({ error: "Lỗi tạo đơn hàng", detail: e.message });
  }
};
