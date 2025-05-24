const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/auth');

// Rotas de usuário
router.post('/users', UserController.create); // Criar usuário
router.get('/users', authMiddleware, UserController.index); // Listar todos os usuários
router.get('/users/:id', authMiddleware, UserController.findById);
router.put('/users/:id', authMiddleware, UserController.update);
router.delete('/users/:id', authMiddleware, UserController.delete);

module.exports = router; 