const express = require("express");

const Category = require("../models/categoryModel");

const router = express.Router();

router.post("/addCategory", (req, res, next) => {
    
  const category = new Category({
    categoryName: req.body.nameCategory,
  });
  category.save()
    .then(createdCategory => {
      res.status(201).json({
        message: "Category added successfully",
        category: {
            createdCategory 
        }
      });
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({
        message: "Creating a category failed!"
      });
    });
});

router.get("/getCategory", function(req, res) {
  Category.find().then(Category => {
    res.status(201).json({
          Category 
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
