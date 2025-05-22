require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use(userRoutes);
app.use(taskRoutes);

// Rota básica para teste
app.get('/', (req, res) => {
  res.json({ message: 'API de Gestão de Tarefas Colaborativas' });
});


// Configuração da porta
const PORT = process.env.PORT || 3000;

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 