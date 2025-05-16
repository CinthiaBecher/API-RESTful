require('dotenv').config();
const { Pool } = require('pg');

// Configuração do pool de conexões
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  // Só inclui password se ele existir e não for vazio
  ...(process.env.DB_PASSWORD && { password: process.env.DB_PASSWORD })
});

// Teste de conexão
pool.connect((err, client, release) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
  release();
});

module.exports = pool; 