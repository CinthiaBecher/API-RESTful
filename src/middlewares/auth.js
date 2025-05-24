const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  // Formato do token: Bearer <token>
  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }

  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    // Adiciona o ID do usuário na requisição
    req.userId = decoded.id;
    return next();
  });
}; 