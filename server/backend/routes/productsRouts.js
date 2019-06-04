const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");


const Product = require("../models/productModel");



const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images/");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ") 
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});


router.post("/AddProd",
multer({ storage: storage }).single("image"),
(req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
  const product = new Product({
    name: req.body.name,
    image: url + "/images/" + req.file.filename,
    Description: req.body.Description,
    price: req.body.price,
    category: req.body.category,
    sum: req.body.sum
  });
  product.save()
  .then(createdProd => {
    res.status(201).json({
      message: "Prod added successfully",
      post: {
        ...createdProd,
        id: createdProd._id
      }
    });
  })
  .catch(error => {
    console.log(error);

    res.status(500).json({
      message: "Creating a prod failed!"
    });
  });
}
);

router.get("/allProd", function(req, res) {
    Product.find().then(product => {
        res.status(201).json({
            product 
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "failed!"
        });
      });
});
router.get("/ProdByCategory/:nameCat", function(req, res) {
  Product.find({category: req.params.nameCat}).then(product => {
      res.status(201).json({
          product 
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "failed!"
      }); 
    });
});
module.exports = router;
