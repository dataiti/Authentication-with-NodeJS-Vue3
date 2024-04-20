const jwt = require("jsonwebtoken");

const generateAccessToken = (_id, permission) => {
  return jwt.sign({ _id, permission }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (_id, permission) => {
  return jwt.sign({ _id, permission }, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: "7d",
  });
};

const verifyAccessToken = (accessToken) => {
  return jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
};

const verifyRefreshToken = (refreshToken) => {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
