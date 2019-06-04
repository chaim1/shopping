const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRouts");
const ProdRoutes = require("./routes/productsRouts");
const CategoryRoutes = require("./routes/categoryRouts");
const CartRoutes = require("./routes/cartRouts");
const OrderRoutes = require("./routes/orderRouts");



const app = express();


mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb+srv://chaim:cohen1234@shpping-wd8qc.mongodb.net/shopping?retryWrites=true", function(err, db) {
  if (!err) {
    console.log("We are connected"); 
  } else if (err) {
    console.log(err);
  }
});

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));
app.use(cors())


app.use("/api/user", userRoutes);
app.use("/api/Prod", ProdRoutes);
app.use("/api/Category", CategoryRoutes);
app.use("/api/Cart", CartRoutes);
app.use("/api/Order", OrderRoutes);





module.exports = app;
