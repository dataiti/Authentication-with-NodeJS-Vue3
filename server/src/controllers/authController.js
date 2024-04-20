const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const RefreshToken = require("../models/refreshTokenModel");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwtUtil");

const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password)
    throw new Error("All fields are required");

  const existingUser = await User.findOne({ email });

  if (existingUser) throw new Error("Email is existing");

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });

  await newUser.save();

  return res.status(200).json({
    success: true,
    message: "Register user successfull",
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new Error("Email or Password is required");

  const findUser = await User.findOne({ email });

  if (!findUser) throw new Error("Incorrect Email");

  if (!(await findUser.isCorrectPassword(password)))
    throw new Error("Incorrect password");

  const accessToken = generateAccessToken(findUser._id, findUser.permission);
  const refreshToken = generateRefreshToken(findUser._id, findUser.permission);

  const newRefreshToken = new RefreshToken({
    userId: findUser._id,
    token: refreshToken,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  await newRefreshToken.save();

  const { password: userPassword, permission, ...others } = findUser._doc;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: false,
  });

  return res.status(200).json({
    success: true,
    message: "Login account successfull",
    accessToken,
    refreshToken,
    data: others,
  });
});

const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) throw new Error("RefreshToken not found in cookies");

  const deleteRefreshToken = await RefreshToken.findOneAndDelete({
    token: refreshToken,
  });

  if (!deleteRefreshToken) throw new Error("Invalid refresh token");

  res.clearCookie("refreshToken");

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) throw new Error("RefreshToken not found in cookies");

  let decoded;

  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw new Error("Invalid refresh token");
  }

  const findUser = await User.findById(decoded._id);

  if (!findUser) throw new Error("User not found");

  const findRefreshToken = await RefreshToken.findOne({
    token: refreshToken,
  });

  if (!findRefreshToken) throw new Error("RefreshToken not found");

  if (new Date(findRefreshToken.expires) < new Date()) {
    await findRefreshToken.remove();
    throw new Error("RefreshToken expried");
  }

  const newAccessToken = generateAccessToken(findUser._id, findUser.permission);

  return res.status(200).json({
    success: true,
    message: "Refresh token successfull",
    accessToken: newAccessToken,
  });
});

const resetPassword = asyncHandler(async (req, res) => {});

const forgotPassword = asyncHandler(async (req, res) => {});

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  resetPassword,
  forgotPassword,
};
