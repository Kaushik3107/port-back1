const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: ["https://portfolio-frontend-delta-gold.vercel.app"],
    methods: ["POST"],
    credentials: true,
  })
);
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://kaushikdange3107:hM9SrBMUIIexNyr0@cluster0.n8xo7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected....."))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/user", require("./routes/contact.route.js"));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(5000, () => {
  console.log(`Server is running.....`);
});

