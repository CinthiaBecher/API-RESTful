const AuthService = require('../services/AuthService');

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const { user, token } = await AuthService.login(username, password);
      
      return res.status(200).json({
        message: 'Login realizado com sucesso',
        user,
        token
      });
    } catch (error) {
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'Senha incorreta') {
        return res.status(401).json({ error: error.message });
      }
      if (error.message.includes('obrigatórios')) {
        return res.status(422).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new AuthController(); 