const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true  },
  price: { type: String, require: true },
  Description: { type: String },
  category : {type:String, required:true},
//   creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Product", ProductSchema);
