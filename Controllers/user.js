const User = require("../Models/user");
require('dotenv').config();
const { checkHashPassword, hashPassword } = require("../Utils/helper");
const jwt = require('jsonwebtoken');

async function handelGetAllUsers(req, res) {
  try {
    const userList = await User.find({});
    res.status(200).json(userList);
  } catch (error) {
    res.status(500).send("Server error");
  }
}

const handelLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: email }, { phone: email }],
    });

    if (user && checkHashPassword(password, user.password)) {
      
      // Generate JWT
      const token = jwt.sign(
        { id: user._id, email: user.email },
        'your_jwt_secret_key', // Use a secure secret key and store it in an environment variable
        { expiresIn: '1h' } // Token expires in 1 hour
      );

      res.status(200).send({
        user: {
          id: user._id,
          email: user.email,
          phone: user.phone
        },
        token,
        message: "User authenticated successfully!"
      });

    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }

  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

async function handelCreateUsers(req, res) {
  try {
    const { firstName, lastName, email, phone } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const password = hashPassword(req.body.password);
    const newUser = await User.create({ firstName, lastName, email, password, phone });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
}


async function handelForgotUser(req, res) {
  try {
    const { email, password } = req.body;
    res.send("forgot api TODO");
  } catch (error) {
    res.status(500).send("Server error");
  }
}

async function handelResetPassword(req, res) {
  try {
    const { email, password } = req.body;
    res.send("resetPassword api TODO");
  } catch (error) {
    res.status(500).send("Server error");
  }
}

module.exports = {
  handelGetAllUsers,
  handelLoginUser,
  handelCreateUsers,
  handelForgotUser,
  handelResetPassword,
};
