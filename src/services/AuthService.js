const UserService = require('./UserService');
const bcrypt = require('bcrypt');

class AuthService {
  constructor() {
    this.userService = UserService;
  }

  async login(username, password) {
    if (!username || !password) {
      throw new Error('Username e senha são obrigatórios');
    }

    // Buscar usuário pelo username
    const user = await this.userService.findByUsername(username);
    
    // Verificar se a senha está correta usando bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Senha incorreta');
    }

    // Retornar usuário sem a senha
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

module.exports = new AuthService(); 