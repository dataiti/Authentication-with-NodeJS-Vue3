const verifyToken = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = verifyAccessToken(token);

      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Access token is required",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Access token is invalid",
    });
  }
};

const verifyTokenUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id === req.params.id || req.user.permission === "admin") {
      next();
    } else {
      res.status(400).json({
        success: false,
        message: "You are not allowed to do that",
      });
    }
  });
};

const isAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.permission === "admin") {
      next();
    } else {
      res.status(400).json({
        success: false,
        message: "You are not allowed to do that",
      });
    }
  });
};

module.exports = { verifyToken, verifyTokenUser, isAdmin };
