const express = require("express");
const mongoose = require("mongoose");

const Order = require("../models/orderModel");

const router = express.Router();

router.post("/createOrder", (req, res, next) => {
  const order = new Order({
    idClient:       req.body.idClient,
    idCart:         req.body.idCart,
    finalPrice:     req.body.finalPrice,
    city:           req.body.city,
    street:         req.body.street,
    dateOrder:      req.body.dateOrder,
    dateMakeOrder:  Date(),
    craditCard:     req.body.craditCard
  });
  order
    .save()
    .then(result => {
      res.status(201).json({
        message: "order created!",
        result: {
          Order: result
        }
      });
    })
    .catch(err => {

      res.status(500).json({
        message: "Invalid authentication credentials!"
      });
    });
});

router.get("/getOrderId/:id", function(req, res) {
    Order.find({ _id: req.params.id })
    .then(orders => {
      res.status(201).json({
        orders
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "failed!"
      });
    });
});

router.get("/getOrderClient/:id", function(req, res) {
    Order.find({ idClient: req.params.id })
    .then(orders => {
      res.status(201).json({
        orders
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "failed!"
      });
    });
});

router.get("/getOrderCart/:id", function(req, res) {
    
    Order.find({ idCart: req.params.id }).sort({dateOrder: -1})
    .then(order => {
      res.status(201).json({
        order
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "failed!"
      });
      
    });
});

router.get("/getOrders", function(req, res) {
    Order.find()
    .then(orders => {
      res.status(201).json({
        orders
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "failed!"
      });
    });
});



module.exports = router;
