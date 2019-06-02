const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  idClient : {type:String, required:true},
  time : { type : Number, required: true },
  status:{ type: Number, required: true},
  products: [{
      productId:{
          type:String
      },
      name:{
        type: String
      },
      sum:{
          type:Number
      },
      price:{
          type:Number
      }
  }]
});

module.exports = mongoose.model("Cart", CartSchema);