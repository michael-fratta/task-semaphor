// CREATE ROUTES FOR USER PURPOSES (MINUS LOGIN/REGISTER)
const express = require("express");
const router = express.Router();
const checkJWTToken = require("../middleware/checkJWTToken");
const UserController = require("../controllers/UserController");

// GET ALL USERS
router.get("/", checkJWTToken, UserController.getAllUsers);

// GET A SPECIFIC USER BY USER ID
router.get("/:userId", checkJWTToken, UserController.getSpecificUser);

// UPDATE A SPECIFIC USER'S ADMIN STATUS
router.put("/:userId", checkJWTToken, UserController.updateUserAdminStatus);

// DELETE USER
router.delete("/:userId", checkJWTToken, UserController.deleteUser);

// LOGIN ENDPOINT
router.post("/login", UserController.login);

// REGISTER ENDPOINT
router.post("/register", UserController.register);

module.exports = router;
