// CREATE A USER CONTROLLER FOR ALL USER ENDPOINTS
// import jwt & User model
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const UserController = {
  // GET ALL USERS
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({}, { password: 0 });
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  // GET A SPECIFIC USER (by id)
  getSpecificUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);

      if (user) {
        res.json({ userId: user._id, isAdmin: user.isAdmin || false });
      } else {
        res.status(404).json({ msg: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching specific user:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  // UPDATE ADMIN USER STATUS
  updateUserAdminStatus: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { isAdmin } = req.body;

      // Check if isAdmin is a boolean
      if (typeof isAdmin !== "boolean") {
        return res.status(400).json({ msg: "isAdmin must be a boolean" });
      }

      const user = await User.findByIdAndUpdate(
        userId,
        { isAdmin },
        { new: true } // Return the updated user
      );

      if (user) {
        res.json({ userId: user._id, isAdmin: user.isAdmin });
      } else {
        res.status(404).json({ msg: "User not found" });
      }
    } catch (error) {
      console.error("Error updating user admin status:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  // DELETE A USER
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Find and remove the user by ID
      const deletedUser = await User.findByIdAndDelete(userId);

      if (deletedUser) {
        res.json({ msg: "User deleted successfully", deletedUser });
      } else {
        res.status(404).json({ msg: "User not found" });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  // LOGIN
  login: async (req, res) => {
    // set username and password from request body
    const { username, password } = req.body;

    // check if user exists and credentials are valid
    const user = await User.findOne({ username });
    // if the user does not exist, return 401 error message
    if (!user) {
      return res.status(401).json({ msg: "User does not exist" });
    }

    if (user.username === username && user.password === password) {
      // create token with additional properties, e.g., isAdmin
      const token = jwt.sign(
        { userId: user._id, username, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "90d" }
      );

      // send token as response
      res.json({ token });
    } else {
      return res.status(401).json({ msg: "Incorrect password" });
    }
  },

  // REGISTER
  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      const newUser = new User({
        username,
        password,
      });

      await newUser.save();

      const token = jwt.sign(
        { userId: newUser._id, username },
        process.env.JWT_SECRET,
        {
          expiresIn: "90d",
        }
      );

      res.json({ token });
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error (e.g. duplicate username)
        res.status(400).json({ msg: "Username is already taken" });
      } else {
        res.status(500).json({ msg: "Internal server error" });
      }
    }
  },
};

module.exports = UserController;
