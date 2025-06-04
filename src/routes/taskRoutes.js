/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gerenciamento de tarefas
 */


const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");
const authMiddleware = require("../middlewares/auth");

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - user_id
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pendente, em_andamento, concluida]
 *               user_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *      401:
 *         description: Usuário não autorizado
 *       404:
 *         description: Usuário não encontrado
 *       422:
 *         description: Campos obrigatórios não enviados
 *       400:
 *         description: Erro ao criar tarefa
 */
router.post("/tasks", authMiddleware, TaskController.create);


/**
 * @swagger
 * /tasks?assignedTo={id}:
 *   get:
 *     summary: Lista tarefas atribuídas a um usuário
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: assignedTo
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário para filtrar as tarefas
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 *       401:
 *         description: Usuário não autorizado
 *       404:
 *         description: Usuário não encontrado
 *       422:
 *         description: ID do usuário é obrigatório
 *       400:
 *         description: Erro ao buscar tarefas
 */
router.get("/tasks", authMiddleware, TaskController.findByUserId);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retorna uma tarefa pelo ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa encontrada com sucesso
 *       401:
 *         description: Usuário não autorizado
 *       404:
 *         description: Tarefa não encontrada
 *       400:
 *         description: Erro ao buscar tarefa
 */
router.get("/tasks/:id", authMiddleware, TaskController.findById);
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pendente, em_andamento, concluida]
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       401:
 *         description: Usuário não autorizado
 *       404:
 *         description: Tarefa não encontrada
 *       422:
 *         description: Campos obrigatórios não enviados
 *       400:
 *         description: Erro ao atualizar tarefa
 */
router.put("/tasks/:id", authMiddleware, TaskController.update);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Deleta uma tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa
 *     responses:
 *       204:
 *         description: Tarefa deletada com sucesso
 *      401:
 *         description: Usuário não autorizado
 *       404:
 *         description: Tarefa não encontrada
 *       400:
 *         description: Erro ao deletar tarefa
 */
router.delete("/tasks/:id", authMiddleware, TaskController.delete);

module.exports = router;
