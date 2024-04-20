const express = require("express");
const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { userById } = require("../middlewares/paramMiddleware");
const { verifyTokenUser, isAdmin } = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/users", verifyTokenUser, isAdmin, getUsers);
router.get("/users/:userId", verifyTokenUser, isAdmin, getUser);
router.put("/users/:userId", verifyTokenUser, isAdmin, updateUser);
router.delete("/users/:userId", verifyTokenUser, isAdmin, deleteUser);

router.param("userId", userById);

module.exports = router;
