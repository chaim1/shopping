const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  email: { type: String, unique: true, required: true },
  fullName: { type: String },
  city: { type: String, require: true },
  Adress: { type: String, require: true },
  password: { type: String, required: true },
  role: {type: Number, require: true},
  tokens: [
    {
      token: {
        type: String
      }
    }
  ]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
 