const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  console.log(123);
  
  req.body.userPwd1 !== req.body.userPwd2? res.status(500).json({ message: "password" }): "";
  bcrypt.hash(req.body.userPwd1, 10).then(hash => {
    const user = new User({
      id: req.body.userID,
      email: req.body.userEmail,
      fullName: req.body.fullName,
      city: req.body.userCity,
      Adress: req.body.userAddress,
      password: hash,
      role: 2
    });
    user.save().then(result => {
        const token = jwt.sign(
          { email: result.email, userId: result._id, id: result.id },
          "rTockrns-secreetCodeString-1989247972492742@#$$%$#$%$#$#@#(($*^#(#",
          { expiresIn: "365d" }
        );
        User.findOneAndUpdate(
          { _id: result._id },
          { $set: { tokens: { token: token } } },
          { new: true },
          (err, result) => {
            if (err) {
              res.status(500).json({
                message: "Invalid authentication credentials!"
              });
            }
            res.status(201).json({
              message: "User created!",
              result: {
                name: result.fullName,
                token: result.tokens[0].token
              }
            });
          }
        );
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      }); 
  });
});
    
router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.userEmail })
    .then(user => {
      if (!user) {
        return res.status(203).json({
          message: "Auth failed"
        }); 
      }
      fetchedUser = user;      
      return bcrypt.compare(req.body.password, user.password);
    }).then(result=>{
      if (!result) {
        return res.status(203).json({
          message: "Auth failed"
        });
      }
      res.status(200).json({
        message: "ok",
        token: fetchedUser.tokens[0].token
      });
    })
    .catch(err => {
      return res.status(203).json({
        message: "Invalid authentication credentials!"
      }); 
    });
});

router.post("/token", (req, res, next) => {
  
  User.findOne({ "tokens.token": req.body.token })
    .then(user => {
      if (!user) {
        return res.status(203).json({
          message: "Auth failed"
        }); 
      }else if(user){        
        return res.status(200).json({
          useId: user._id,
          name:user.fullName,
          message: "good"
        });
      }
    })
    .catch(err => {
      return res.status(203).json({
        message: "Invalid authentication credentials!"
      }); 
    });
});
 
router.get("/userId:id/email:email", function(req, res) {  
  User.find({ id: req.params.id ,email:req.params.email}).exec(function(err, id) {
    if (err) {
      res.send(404, "Error has occurred!");
    } else {
      if (id.length == 0) {
        User.find({email:req.params.email}).exec(function(err, email) {          
          if (err) {
            res.send(404, "Error has occurred!");
          } else {
            if (email.length == 0) {
              res.status(201).json("ok");
            } else {
              res.status(203).json("email already used");
            }
          }
        });
      } else {
        res.status(203).json("ID already used");
      }
    }
  });
});
module.exports = router;
