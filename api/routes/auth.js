// CREATE ROUTES FOR AUTH PURPOSES
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// LOGIN ENDPOINT
router.post("/login", UserController.login);

// REGISTER ENDPOINT
router.post("/register", UserController.register);

module.exports = router;
