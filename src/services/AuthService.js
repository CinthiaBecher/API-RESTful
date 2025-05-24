const UserService = require('./UserService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

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

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    // Retornar usuário sem a senha e o token
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token
    };
  }
}

module.exports = new AuthService(); 