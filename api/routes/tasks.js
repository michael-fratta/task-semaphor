// CREATE ROUTES FOR TASK PURPOSES
const express = require("express");
const router = express.Router();
const checkJWTToken = require("../middleware/checkJWTToken");
const TaskController = require("../controllers/TaskController");

// GET TASKS BASED ON FILTER
router.get("/", checkJWTToken, TaskController.getTasks);

// ADD A NEW TASK
router.post("/", checkJWTToken, TaskController.addTask);

// UPDATE A TASK
router.put("/:id", checkJWTToken, TaskController.updateTask);

// DELETE A TASK
router.delete("/:id", checkJWTToken, TaskController.deleteTask);

module.exports = router;
