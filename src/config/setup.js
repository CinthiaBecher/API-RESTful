// Configura variáveis de ambiente para testes
process.env.NODE_ENV = "test";
process.env.PORT = 3002; // Porta específica para testes

// Configurações do banco de dados de teste no Docker
process.env.DB_USER = "postgres";
process.env.DB_PASSWORD = "postgres";
process.env.DB_HOST = "localhost"; // Host local para acessar o Docker
process.env.DB_PORT = "5433"; // Porta mapeada no docker-compose
process.env.DB_NAME = "api_db_test";

// Log das configurações do banco
console.log("Configurações do banco de teste:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
});
