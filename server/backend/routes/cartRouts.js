const express = require("express");
const mongoose = require("mongoose");

const Cart = require("../models/cartModel");

const router = express.Router();

router.post("/createCart", (req, res, next) => {
  const cart = new Cart({
    idClient: req.body.userID,
    time: Date.parse(Date()),
    status: 1
  });
  cart
    .save()
    .then(result => {
      res.status(201).json({
        message: "Cart created!",
        result: {
          idCart: result
        }
      });
    })
    .catch(err => {
      console.log(err);

      res.status(500).json({
        message: "Invalid authentication credentials!"
      });
    });
});

router.get("/getCart/:id", function(req, res) {
  Cart.find({ idClient: req.params.id })
    .then(cart => {
      res.status(201).json({
        cart
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "failed!"
      });
    });
});

router.get("/getCartId/:id", function(req, res) {
  Cart.find({ _id: req.params.id })
    .then(cart => {
      res.status(201).json({
        cart
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "failed!"
      });
    });
});

router.get("/getCart", function(req, res) {
  Cart.find()
    .then(cart => {
      res.status(201).json({
        cart
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "failed!"
      });
    });
});

router.post("/addProd", (req, res, next) => {
  console.log(req.body);

  Cart.findOneAndUpdate(
    { _id: req.body.cartId },
    {   status:2,
      $push: {
        products: {
          productId: req.body.prodId,
          name: req.body.prodName,
          sum: req.body.prodSm,
          price: req.body.prodPrice
        }
      }
    },
    { new: true },
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: "error"
        });
      }
      res.status(201).json({
        message: "prod in!"
      });
    }
  );
});

// router.post("/login", (req, res, next) => {
//   let fetchedUser;
//   User.findOne({ email: req.body.userEmail })
//     .then(user => {
//       if (!user) {
//         return res.status(203).json({
//           message: "Auth failed"
//         });
//       }
//       fetchedUser = user;
//       return bcrypt.compare(req.body.password, user.password);
//     })
//     .then(result => {
//       if (!result) {
//         return res.status(203).json({
//           message: "Auth failed"
//         });
//       }
//       res.status(200).json({
//         message: "ok",
//         token: fetchedUser.tokens[0].token
//       });
//     })
//     .catch(err => {
//       return res.status(203).json({
//         message: "Invalid authentication credentials!"
//       });
//     });
// });

module.exports = router;
