const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDatabase = require("./configs/connectDatabase");
const router = require("./routes");
const handleError = require("./middlewares/handleError");

const app = express();

// connect database
connectDatabase();

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// router
router(app);

// handle error
handleError(app);

// listen server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("✅ Server running on port " + port);
});
