const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const userById = asyncHandler(async (req, res, next, id) => {
  const isValidId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidId) {
    return res.status(400).json({
      success: false,
      message: "User Id is invalid",
    });
  }

  const findUser = await User.findById(id);

  if (!findUser) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  req.user = findUser;
  next();
});

module.exports = { userById };
