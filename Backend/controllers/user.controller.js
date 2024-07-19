const userModel = require("../models/user.model");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
  try {
    const user = new userModel(req.body);

    user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{
      expiresIn:'30m'
    });

    res.status(201).json({
      status: "user created",
      token,
      userName: user.userName,
      id: user._id,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body.password);

    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ messege: "user not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (isMatch) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      res.status(200).json({
        status: "login successfull",
        token,
        userName: user.userName,
        id: user._id,
      });
    } else {
      res.status(400).json({
        status: "login failed",
        messege: "incorrect password",
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById({ _id: id });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.find();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { signup, login,getUserById,getUser };
