const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const getUser = asyncHandler(async (req, res) => {
  const { password, permission, ...others } = req.user._doc;

  return res.status(200).json({
    success: true,
    messsage: "Get user successfull",
    data: others,
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const { query } = req;

  const {
    search = "",
    sortBy = "-_id",
    orderBy = "asc",
    limit = 6,
    page = 1,
  } = query;

  const regex = search.trim().split(/\s+/).filter(Boolean).join("|");

  const skip = (page - 1) * limit;

  const filterArgs = {
    $or: [
      { firstName: { $regex: regex, $options: "i" } },
      { lastName: { $regex: regex, $options: "i" } },
      { email: { $regex: regex, $options: "i" } },
    ],
    permission: { $ne: "admin" },
  };

  const countUser = await User.countDocuments(filterArgs);

  if (countUser === 0) throw new Error("No users found");

  const totalPage = Math.ceil(countUser / limit);

  const currentPage = Math.min(page, totalPage);

  const findUsers = await User.find(filterArgs)
    .select("-password")
    .sort({ [sortBy]: orderBy, _id: -1 })
    .skip(skip)
    .limit(limit);

  return res.status(200).json({
    success: true,
    message: "Get users successfull",
    data: {
      total: totalPage,
      page: currentPage,
      count: countUser,
      users: findUsers,
    },
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, password, permission } = req.body;

  const updateUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { firstName, lastName, password, permission } },
    { new: true }
  );

  if (!updateUser) throw new Error("Update user fail");

  return res.status(200).json({
    success: true,
    message: "Update user successfull",
    data: updateUser,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const deleteUser = await User.findByIdAndDelete(req.user._id);

  if (!deleteUser) throw new Error("User not found");

  return res.status(200).json({
    success: true,
    message: "Delete user successfull",
  });
});

module.exports = { getUser, getUsers, updateUser, deleteUser };
