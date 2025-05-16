-- Este arquivo contém os comandos SQL necessários para criar a estrutura do banco de dados
-- Execute este arquivo após criar o banco de dados 'task_manager'

-- Criação da tabela de usuários (versão simplificada)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,    -- Identificador único auto-incrementado
    name VARCHAR(100) NOT NULL -- Nome do usuário (obrigatório)
);

-- Para verificar se a tabela foi criada corretamente, você pode usar:
-- \dt (lista todas as tabelas)
-- \d users (mostra a estrutura da tabela users) 