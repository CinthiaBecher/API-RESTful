const UserRepository = require('../repositories/UserRepository');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async create({ name }) {
    if (!name) {
      throw new Error('Nome é obrigatório');
    }

    if (name.length < 3) {
      throw new Error('Nome deve ter pelo menos 3 caracteres');
    }

    return await this.userRepository.create({ name });
  }

  async findById(id) {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }

  async update(id, { name }) {
    if (!name) {
      throw new Error('Nome é obrigatório');
    }

    if (name.length < 3) {
      throw new Error('Nome deve ter pelo menos 3 caracteres');
    }

    const user = await this.findById(id);
    return await this.userRepository.update(id, { name });
  }

  async delete(id) {
    const user = await this.findById(id);
    return await this.userRepository.delete(id);
  }
}

module.exports = new UserService(); 