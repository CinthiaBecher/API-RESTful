/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação de usuários
 */

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login do usuário e retorna um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       description: Credenciais do usuário para autenticação
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: usuario123
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso, retorna dados do usuário e token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login realizado com sucesso
 *                 user:
 *                   type: object
 *                   description: Dados do usuário autenticado (sem a senha)
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: usuario123
 *                     email:
 *                       type: string
 *                       example: usuario@example.com
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação nas demais rotas
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Senha incorreta
 *       404:
 *         description: Usuário não encontrado
 *       422:
 *         description: Campos obrigatórios não enviados
 *       400:
 *         description: Erro genérico na requisição
 */
router.post('/login', AuthController.login);

module.exports = router;