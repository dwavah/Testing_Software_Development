// app/models/order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Order', OrderSchema);
