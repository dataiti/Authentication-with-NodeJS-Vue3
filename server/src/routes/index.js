const authRouter = require("./authRouter");
const userRouter = require("./userRouter");

const router = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter);
};

module.exports = router;
