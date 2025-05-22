const Task = require('../models/Task');

class TaskController {
  // Listar todas as tarefas
  async index(req, res) {
    try {
      const tasks = await Task.findAll();
      return res.json(tasks);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Criar tarefa
  async create(req, res) {
    try {
      const { title, description, status = 'pendente' } = req.body;
      
      if (!title) {
        return res.status(400).json({ error: 'Título é obrigatório' });
      }

      const task = await Task.create({ title, description, status });
      return res.status(201).json(task);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Buscar tarefa por ID
  async findById(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);

      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      return res.json(task);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Atualizar tarefa
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
      
      if (!title) {
        return res.status(400).json({ error: 'Título é obrigatório' });
      }

      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      const updatedTask = await Task.update(id, { title, description, status });
      return res.json(updatedTask);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Deletar tarefa
  async delete(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);

      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      await Task.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new TaskController(); 