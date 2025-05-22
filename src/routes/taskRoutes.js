const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

// Rotas de tarefa
router.get('/tasks', TaskController.index); 
router.post('/tasks', TaskController.create); 
router.get('/tasks/:id', TaskController.findById);
router.put('/tasks/:id', TaskController.update);
router.delete('/tasks/:id', TaskController.delete);

module.exports = router; 