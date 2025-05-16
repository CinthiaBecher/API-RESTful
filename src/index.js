const express = require('express');
const cors = require('cors');
const db = require('./config/database');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota básica para teste
app.get('/', (req, res) => {
  res.json({ message: 'API de Gestão de Tarefas Colaborativas' });
});

// Configuração da porta
const PORT = 3000;

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 