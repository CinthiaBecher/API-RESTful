require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use(userRoutes);
app.use(taskRoutes);
app.use("/auth", authRoutes);

// Rota básica para teste
app.get("/", (req, res) => {
  res.json({ message: "API de Gestão de Tarefas Colaborativas" });
});

// Configuração da porta
const PORT = process.env.PORT || 3000;

// Exporta o app para testes
module.exports = app;

// Inicialização do servidor apenas se não estiver em ambiente de teste
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}
