require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET || 'chave_secreta',
  expiresIn: '1d' // Token expira em 1 dia
}; 