// BACKEND ENTRY POINT
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/conn");
const usersRoutes = require("./routes/users");
const tasksRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// enable cors options from all origins and methods
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());

let server;

const startServer = async () => {
  try {
    await connectDB.connectToServer();

    app.use("/api/users", usersRoutes);
    app.use("/api/tasks", tasksRoutes);
    app.use("/api/auth", authRoutes);

    server = app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });

    return server;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

startServer();

module.exports = app;
