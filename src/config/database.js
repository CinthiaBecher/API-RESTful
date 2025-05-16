const { Pool } = require('pg');

// Configuração do pool de conexões
const pool = new Pool({
  user: 'postgres',      // usuário do banco
  host: 'localhost',     // host do banco
  database: 'task_manager', // nome do banco
  password: 'postgres',  // senha do banco
  port: 5432,           // porta padrão do PostgreSQL
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