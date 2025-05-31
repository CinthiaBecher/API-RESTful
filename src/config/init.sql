-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,    -- Identificador único auto-incrementado
    name VARCHAR(100) NOT NULL, -- Nome do usuário (obrigatório)
    username VARCHAR(50) NOT NULL UNIQUE, -- Nome de usuário único para login
    password VARCHAR(255) NOT NULL -- Senha criptografada
);

-- Criação da tabela de tarefas
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,    -- Identificador único auto-incrementado
    title VARCHAR(100) NOT NULL, -- Título da tarefa (obrigatório)
    description TEXT, -- Descrição da tarefa
    status VARCHAR(20) NOT NULL DEFAULT 'pendente'::VARCHAR(20), -- Status da tarefa (obrigatório)
    user_id INTEGER REFERENCES users(id) -- ID do usuário responsável pela tarefa
);
