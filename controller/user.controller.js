const User    = require("../models/users.model");
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const dotenv  = require("dotenv");

dotenv.config();
const register = (req, res) => {
  const { email, password, confirm_password }=req.body;
  if (password !== confirm_password) {
    return res.status(400).json({
      msg: "Passwords not match",
    });
  }
  User.findOne({ email: email }).then((user) => {
    //console.log(user.email);
    if (user) {
      return res.status(400).json({
        msg: " e-mail is already taken",
      });
    } else {
      let newUser = new User({
        email,
        password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password,salt,(err, hash)=>{
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            return res.status(201).json({
              success: true,
              msg: "User is registered.",
            });
          });
        });
      });
    }
  });
};
const login = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(404).json({
        msg: "e-mail is not found",
        success: false,
      });
    }
    bcrypt.compare(req.body.password, user.password)
    .then((isMatch) => {
      if (isMatch) {
        const payload = {
          _id: user._id,
          email: user.email,
        };
        jwt.sign(
          payload,
          process.env.SECRET,
          { expiresIn: 604800 },
          (err, token) => {
            res.status(200).json({
              success: true,
              token: `Bearer ${token}`,
              user:user,
              msg: "You are logged in.",
            });
          }
        );
      } else {
        return res.status(404).json({
          msg: "Incorrect password",
          success: false,
        });
      }
    });
  });
};
const profile = (req, res) => {
    return res.json({
    user: req.user,
    
  });
};
module.exports = {
  register,
  login,
  profile,
};
