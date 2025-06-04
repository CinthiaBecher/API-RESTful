/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */


const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/auth");
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - username
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       422:
 *         description: Campos obrigatórios não enviados
 *       400:
 *         description: Erro ao criar usuário
 */
router.post("/users", UserController.create);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtém um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *       401:
 *         description: Usuário não autorizado
 *       404:
 *         description: Usuário não encontrado
 *       400:
 *         description: Erro ao buscar usuário
 */
router.get("/users/:id", authMiddleware, UserController.findById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - username
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       401:
 *         description: Usuário não autorizado
 *       404:
 *         description: Usuário não encontrado
 *       422:
 *         description: Campos obrigatórios não enviados
 *       400:
 *         description: Erro ao atualizar usuário
 */
router.put("/users/:id", authMiddleware, UserController.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso 
 *      401:
 *         description: Usuário não autorizado
 *       404:
 *         description: Usuário não encontrado
 *       400:
 *         description: Erro ao deletar usuário
 */
router.delete("/users/:id", authMiddleware, UserController.delete);

module.exports = router;
