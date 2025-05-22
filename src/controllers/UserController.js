const UserService = require('../services/UserService');

class UserController {
  // Listar todos os usuários
  async index(req, res) {
    try {
      const users = await UserService.findAll();
      return res.json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Criar usuário
  async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Buscar usuário por ID
  async findById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.findById(id);
      return res.json(user);
    } catch (error) {
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  // Atualizar usuário
  async update(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.update(id, req.body);
      return res.json(user);
    } catch (error) {
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  // Deletar usuário
  async delete(req, res) {
    try {
      const { id } = req.params;
      await UserService.delete(id);
      return res.status(204).send();
    } catch (error) {
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController(); 