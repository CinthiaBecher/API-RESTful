const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");
const authMiddleware = require("../middlewares/auth");

// Rotas de tarefa
router.get("/tasks", authMiddleware, TaskController.findByUserId);
router.post("/tasks", authMiddleware, TaskController.create);
router.get("/tasks/:id", authMiddleware, TaskController.findById);
router.put("/tasks/:id", authMiddleware, TaskController.update);
router.delete("/tasks/:id", authMiddleware, TaskController.delete);

module.exports = router;
