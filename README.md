# API RESTful - Sistema de Gestão de Tarefas Colaborativas

Este projeto é uma API RESTful desenvolvida para a disciplina de Engenharia de Software, implementando um sistema de gestão de tarefas colaborativas.

## Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- Arquitetura em Camadas

## Pré-requisitos

Antes de começar, você precisa ter instalado:
- Node.js (versão 14 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/CinthiaBecher/API-RESTful.git
cd API-RESTful
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o PostgreSQL:
   - Certifique-se que o PostgreSQL está instalado e rodando
   - Para acessar o PostgreSQL:
     ```bash
     # Abra o Terminal e digite:
     psql postgres
     
     # Se aparecer um erro, tente:
     psql -U postgres
     
     # Se conseguir entrar, você verá algo como:
     postgres=#
     # Este prompt indica que você está dentro do terminal do PostgreSQL
     # Dessa forma você pode executar comandos SQL diretamente
     
     # Agora crie o banco de dados:
     CREATE DATABASE task_manager;
     
     # Para sair do psql, digite:
     \q
     ```

   - Crie as tabelas do banco de dados (escolha uma das opções):
     ```bash
     # Opção 1: Execute diretamente do terminal
     psql -d task_manager -f config/init.sql
     
     # Opção 2: Execute dentro do psql
     psql -d task_manager
     \i config/init.sql
     
     # Para verificar se as tabelas foram criadas:
     \dt
     ```

## Executando o Projeto

```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

## Autores

- Cinthia Becher
- Gabrielle Bussolo
