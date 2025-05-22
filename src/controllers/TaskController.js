const TaskService = require('../services/TaskService');

class TaskController {
  // Listar todas as tarefas
  async index(req, res) {
    try {
      const { assignedTo } = req.query;
      
      if (assignedTo) {
        const tasks = await TaskService.findByUserId(assignedTo);
        return res.status(200).json(tasks);
      }

      const tasks = await TaskService.findAll();
      return res.status(200).json(tasks);
    } catch (error) {
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message.includes('obrigatório')) {
        return res.status(422).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  // Criar tarefa
  async create(req, res) {
    try {
      const task = await TaskService.create(req.body);
      return res.status(201).json(task);
    } catch (error) {
      if (error.message.includes('obrigatório')) {
        return res.status(422).json({ error: error.message });
      }
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  // Buscar tarefa por ID
  async findById(req, res) {
    try {
      const { id } = req.params;
      const task = await TaskService.findById(id);
      return res.status(200).json(task);
    } catch (error) {
      if (error.message === 'Tarefa não encontrada') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  // Atualizar tarefa
  async update(req, res) {
    try {
      const { id } = req.params;
      const task = await TaskService.update(id, req.body);
      return res.status(200).json(task);
    } catch (error) {
      if (error.message === 'Tarefa não encontrada') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message.includes('obrigatório')) {
        return res.status(422).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  // Deletar tarefa
  async delete(req, res) {
    try {
      const { id } = req.params;
      await TaskService.delete(id);
      return res.status(204).send();
    } catch (error) {
      if (error.message === 'Tarefa não encontrada') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new TaskController(); 