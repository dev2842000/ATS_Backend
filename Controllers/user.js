const User = require("../Models/user");
const { checkHashPassword, hashPassword } = require("../Utils/helper");

async function handelGetAllUsers(req, res) {
  try {
    const userList = await User.find({});
    res.status(200).json(userList);
  } catch (error) {
    res.status(500).send("Server error");
  }
}

async function handelLoginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: email }, { phone: email }],
    });

    if (user && checkHashPassword(password, user.password)) {
      res.send("User authenticated successfully!");
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
}

async function handelCreateUsers(req, res) {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const password = hashPassword(req.body.password);
    await User.create({ firstName, lastName, email, password, phone });
    res.send("User Registerd!");
  } catch (error) {
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
