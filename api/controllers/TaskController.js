// CREATE A TASK CONTROLLER FOR ALL TASKS ENDPOINTS
// import Task model
const Task = require("../models/Task");

const TaskController = {
  // GET TASKS
  getTasks: async (req, res) => {
    try {
      const { userId, isAdmin } = req.user;
      const filter = req.query.filter || "myTasks";

      let tasks;

      if (isAdmin && filter === "otherTasks") {
        // If the user is an admin and the filter is 'otherTasks', fetch all tasks
        tasks = await Task.find();
      } else if (filter === "myTasks") {
        // If the filter is 'myTasks', fetch tasks created by the user
        tasks = await Task.find({ creator: userId });
      } else {
        // If the filter is neither 'myTasks' nor 'otherTasks', return an empty array
        tasks = [];
      }

      res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  // ADD A TASK
  addTask: async (req, res) => {
    try {
      const { title, deadline, description } = req.body;

      const newTask = new Task({
        title,
        deadline,
        description,
        creator: req.user.userId,
        username: req.user.username,
      });

      await newTask.save();

      res.json({ msg: "Task successfully added", task: newTask });
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  // UPDATE A TASK
  updateTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      const { title, deadline, description } = req.body;

      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        {
          title,
          deadline,
          description,
        },
        { new: true }
      );

      if (updatedTask) {
        res.json({ msg: "Task successfully updated", updatedTask });
      } else {
        res.status(404).json({ msg: "Task not found" });
      }
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  // DELETE A TASK
  deleteTask: async (req, res) => {
    try {
      const taskId = req.params.id;

      const deletedTask = await Task.findByIdAndDelete(taskId);

      if (deletedTask) {
        res.json({
          msg: "Task successfully removed",
          removedTask: deletedTask,
        });
      } else {
        res.status(404).json({ msg: "Task not found" });
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
};

module.exports = TaskController;
