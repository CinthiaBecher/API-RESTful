// UserController.js
// Recebe as requisições HTTP, chama os serviços (Services) e retorna as respostas apropriadas.
// Aqui também são definidos os status HTTP e o tratamento de erros.

const UserService = require("../services/UserService");

class UserController {
  // [GET] /users
  // Lista todos os usuários cadastrados.
  // Utiliza status 200 para sucesso e 400 para outros erros.
  async index(req, res) {
    try {
      const users = await UserService.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // [POST] /users
  // Cria um novo usuário. Espera receber os dados no corpo da requisição (JSON).
  // Retorna 201 para sucesso, 422 para erros de validação e 400 para outros erros.
  async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      if (error.message.includes("obrigatório")) {
        return res.status(422).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  // [GET] /users/:id
  // Busca um usuário pelo ID. Retorna 200 para sucesso, 404 se não encontrar e 400 para outros erros.
  async findById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.findById(id);
      return res.status(200).json(user);
    } catch (error) {
      if (error.message === "Usuário não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  // [PUT] /users/:id
  // Atualiza um usuário existente pelo ID. Espera os dados no corpo da requisição.
  // Retorna 200 para sucesso, 404 se não encontrar, 422 para erros de validação e 400 para outros erros.
  async update(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.update(id, req.body);
      return res.status(200).json(user);
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

  // [DELETE] /users/:id
  // Remove um usuário pelo ID. Retorna 204 para sucesso (sem conteúdo), 404 se não encontrar e 400 para outros erros.
  async delete(req, res) {
    try {
      const { id } = req.params;
      await UserService.delete(id);
      return res.status(204).send();
    } catch (error) {
      if (error.message === "Usuário não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}

// Exporta uma instância do controller para ser usada nas rotas
module.exports = new UserController();
