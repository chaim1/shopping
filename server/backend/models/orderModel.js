const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  idClient: { type: String, required: true },
  idCart: { type: String, required: true },
  finalPrice: { type: Number, required: true },
  city: {type: String, required:true},
  street: {type: String, required: true},
  dateOrder: {type: Date, required: true},
  dateMakeOrder: {type: Date, required: true},
  craditCard: { type: Number,required: true}
});

module.exports = mongoose.model("Order", OrderSchema);
