const UserRepository = require('../repositories/UserRepository');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async create({ name, username, password }) {
    if (!name || !username || !password) {
      throw new Error('Nome, username e password são obrigatórios');
    }

    if (name.length < 3) {
      throw new Error('Nome deve ter pelo menos 3 caracteres');
    }

    if (username.length < 3) {
      throw new Error('Username deve ter pelo menos 3 caracteres');
    }

    if (password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }

    // Verificar se já existe um usuário com este username
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error('Username já está em uso');
    }

    return await this.userRepository.create({ name, username, password });
  }

  async findById(id) {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }

  async findByUsername(username) {
    const user = await this.userRepository.findByUsername(username);
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }

  async update(id, { name, username, password }) {
    if (!name || !username || !password) {
      throw new Error('Nome, username e senha são obrigatórios');
    }

    if (name.length < 3) {
      throw new Error('Nome deve ter pelo menos 3 caracteres');
    }

    if (username.length < 3) {
      throw new Error('Username deve ter pelo menos 3 caracteres');
    }

    if (password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }

    // Verificar se o usuário existe
    const existingUser = await this.findById(id);
    
    // Se o username está sendo alterado, verificar se já existe outro usuário com este username
    if (existingUser.username !== username) {
      const userWithUsername = await this.userRepository.findByUsername(username);
      if (userWithUsername) {
        throw new Error('Username já está em uso');
      }
    }

    return await this.userRepository.update(id, { name, username, password });
  }

  async delete(id) {
    const user = await this.findById(id);
    return await this.userRepository.delete(id);
  }
}

module.exports = new UserService(); 