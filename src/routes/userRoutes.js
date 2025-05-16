const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Rotas de usuário
router.get('/users', UserController.index); // Listar todos os usuários
router.post('/users', UserController.create); // Criar usuário
router.get('/users/:id', UserController.findById);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

module.exports = router; 