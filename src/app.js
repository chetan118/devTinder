const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectDB } = require("./config/database");
const { authRouter } = require("./routes/authRouter");
const { profileRouter } = require("./routes/profileRouter");
const { requestRouter } = require("./routes/requestRouter");
const { userRouter } = require("./routes/userRouter");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); // middleware for converting JSON data in req.body to JS object
app.use(cookieParser()); // middleware for parsing cookies in requests

app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/user", userRouter);
app.use("/", authRouter);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is running and listening on port 7777...");
    });
  })
  .catch(() => {
    console.log("Database connection failed!!!");
  });
