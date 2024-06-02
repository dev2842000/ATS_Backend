const User = require("../Models/user");
require('dotenv').config();
const { checkHashPassword, hashPassword } = require("../Utils/helper");
const jwt = require('jsonwebtoken');

async function handleGetUsers(req, res) {
  try {
    const user = await User.findOne({ _id: req.body.userId }).select('firstName lastName email phone');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    const userDetails = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    };

    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function handelLoginUser (req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: email }, { phone: email }],
    });

    if (user && checkHashPassword(password, user.password)) {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        'your_jwt_secret_key',
        { expiresIn: '1h' }
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
      return res.status(409).send("User already exists");
    }

    const password = hashPassword(req.body.password);
    const newUser = await User.create({ firstName, lastName, email, password, phone });
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      'your_jwt_secret_key',
      { expiresIn: '1h' }
    );

    res.status(200).send({
      user: {
        id: newUser._id,
        email: newUser.email,
        phone: newUser.phone
      },
      token,
      message: "User created successfully!"
    });

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
  handleGetUsers,
  handelLoginUser,
  handelCreateUsers,
  handelForgotUser,
  handelResetPassword,
};
