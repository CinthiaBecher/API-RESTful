// TaskController.js
// Recebe as requisições HTTP, chama os serviços (Services) e retorna as respostas apropriadas.
// Aqui também são definidos os status HTTP e o tratamento de erros.

const TaskService = require("../services/TaskService");

class TaskController {
  // [GET] /tasks?assignedTo={userId}
  // Lista as tarefas atribuidas a um usuário
  // Utiliza status 200 para sucesso e 400 para outros erros.
  async findByUserId(req, res) {
    try {
      const { assignedTo } = req.query;

      // Se houver filtro por usuário, busca tarefas atribuídas a esse usuário
      if (assignedTo) {
        const tasks = await TaskService.findByUserId(assignedTo);
        return res.status(200).json(tasks);
      }
    } catch (error) {
      if (error.message === "Usuário não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message.includes("obrigatório")) {
        return res.status(422).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  // [POST] /tasks
  // Cria uma nova tarefa. Espera receber os dados no corpo da requisição (JSON).
  // Retorna 201 para sucesso, 422 para erros de validação e 400 para outros erros.
  async create(req, res) {
    try {
      const task = await TaskService.create(req.body);
      return res.status(201).json(task);
    } catch (error) {
      if (error.message.includes("obrigatório")) {
        return res.status(422).json({ error: error.message });
      }
      if (error.message === "Usuário não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  // [GET] /tasks/:id
  // Busca uma tarefa pelo ID.
  // Retorna 200 para sucesso, 404 para tarefa não encontrada e 400 para outros erros.
  async findById(req, res) {
    try {
      const { id } = req.params;
      const task = await TaskService.findById(id);
      return res.status(200).json(task);
    } catch (error) {
      if (error.message === "Tarefa não encontrada") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  // [PUT] /tasks/:id
  // Atualiza uma tarefa existente pelo ID. Espera os dados no corpo da requisição.
  // Retorna 200 para sucesso, 404 para tarefa não encontrada, 422 para erros de validação e 400 para outros erros.
  async update(req, res) {
    try {
      const { id } = req.params;
      const task = await TaskService.update(id, req.body);
      return res.status(200).json(task);
    } catch (error) {
      if (error.message === "Tarefa não encontrada") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message.includes("obrigatório")) {
        return res.status(422).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  // [DELETE] /tasks/:id
  // Remove uma tarefa pelo ID.
  // Retorna 204 para sucesso, 404 para tarefa não encontrada e 400 para outros erros.
  async delete(req, res) {
    try {
      const { id } = req.params;
      await TaskService.delete(id);
      return res.status(204).send();
    } catch (error) {
      if (error.message === "Tarefa não encontrada") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}

// Exporta uma instância do controller para ser usada nas rotas
module.exports = new TaskController();
