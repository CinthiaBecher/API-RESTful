# Guia de Execução e Testes da API

## 1. Preparação do Ambiente

### 1.1 Instalação do Docker
1. **Windows**:
   - Baixe o Docker Desktop em: https://www.docker.com/products/docker-desktop
   - Durante a instalação, certifique-se de que a opção WSL2 está marcada
   - Após a instalação, reinicie o computador

2. **Mac**:
   - Baixe o Docker Desktop em: https://www.docker.com/products/docker-desktop
   - Arraste o aplicativo para a pasta Applications
   - Inicie o Docker Desktop

### 1.2 Instalação do DBeaver
1. Baixe o DBeaver Community em: https://dbeaver.io/download/
2. Instale seguindo as instruções do instalador
3. Abra o DBeaver

## 2. Executando a Aplicação

### 2.1 Iniciando os Serviços
1. Abra o terminal na pasta do projeto
2. Execute o comando:
   ```bash
   make run
   ```
   Obs.: Esse comando irá iniciar os containers. Depois de executar esse comando, pode abrir o app do Docker e os 3 containers estarão lá:

   1 - Container api_postgres: Banco de dados PostgreSQL

   2 - Container api_service: Serviço da API

   3 - Container api_migrations: Container para executar as migrations (criar as tabelas no banco de dados)

3. Aguarde até que todos os serviços estejam rodando

### 2.2 Configurando o DBeaver
1. Abra o DBeaver
2. Clique em "Nova Conexão" (ícone de tomada)
3. Selecione "PostgreSQL"
4. Preencha os dados:
   - Host: localhost
   - Porta: 5432
   - Banco de dados: api_db
   - Usuário: postgres
   - Senha: postgres
5. Clique em "Testar Conexão" para verificar (se aparecer 'connected' é porque a conexão foi feita com sucesso)
6. Clique em "Finalizar"
7. Dentro do DBeaver, para encontrar a tabela: api_db >Databases > api_db > Schemas > public > Tables > users (tabela usuarios, criada automaticamente pelo container migrations)

## 3. Testando a API

Com os containers rodando, será possível acessar http://localhost:3000/, que apresentará a mensagem `{"message":"API de Gestão de Tarefas Colaborativas"}`

http://localhost:3000/users -> lista todos os usuários (de início vai estar vazio)
http://localhost:3000/users/1 -> busca um usuário específico (com id 1)


### 3.1 Testes no terminal usando curl

#### Listar Usuários
```bash
curl http://localhost:3000/users
```

#### Criar Usuário
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuário Teste",
    "username": "teste",
    "password": "123456"
  }'
```
Obs.: se acessar o http://localhost:3000/users no browser vai ver o [{"id":1,"name":"João Silva"}], e se acessar o DBeaver vai ver essa informacao lá (pode dar um refresh se precisar)

#### Buscar Usuário
```bash
curl http://localhost:3000/users/1
```

#### Atualizar Usuário
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva Atualizado"}'
```

#### Deletar Usuário
```bash
curl -X DELETE http://localhost:3000/users/1
```

### Fazer login
- Lembre-se de criar um usuario
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "teste",
    "password": "123456"
  }'
```

## Fluxo de uma requisição

### Entrada da Requisição
```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{
  "title": "Implementar autenticação",
  "description": "Adicionar sistema de login",
  "status": "pendente"
}'
```

### Processo em Camadas
1) Camada de Rotas (routes/taskRoutes.js) recebe a requisição HTTP
```javascript
router.post('/tasks', TaskController.create);
```
Define os endpoints da API e mapeia URLs para os controllers apropriados

2) Camada de Controllers (controllers/TaskController.js) recebe os dados da requisição

```javascript
const task = await TaskService.create(req.body);
```
Recebe dados da requisição e chamar o serviço apropriado

3) Camada de Services (services/TaskService.js) faz a validação de negócio e chama o repositória para criar a tarefa
```javascript
// Validação de negócio
  if (!title) {
    throw new Error('Título é obrigatório');
  }

  const validStatuses = ['pendente', 'em_andamento', 'concluida'];
  if (!validStatuses.includes(status)) {
    throw new Error('Status inválido');
  }

  // Chama o repository para criar a tarefa
  return await this.taskRepository.create({ 
    title, 
    description, 
    status 
  });
```
Implementa regras de negócio validando os dados e aplicando as regras. Chama o repositóry

4) Camada de Repositories (repositories/TaskRepository.js) executa a operação no banco de dados e converte o resultado para um objeto Task

```javascript
async create({ title, description, status }) {
  const query = `
    INSERT INTO tasks (title, description, status)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  
  try {
    // 5. Executa a operação no banco de dados
    const result = await db.query(query, [title, description, status]);
    // 5.1. Converte o resultado para um objeto Task
    return Task.fromDatabase(result.rows[0]);
  } catch (error) {
    throw error;
  }
}
```

6) Camada de Controllers (controllers/TaskController.js) envia a resposta HTTP
```javascript
    return res.status(201).json(task);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
```

## 4. Autenticação JWT

### 4.1 Testando no Terminal

#### Criar um usuário
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuário Teste",
    "username": "teste",
    "password": "123456"
  }'
```

#### Fazer login (obter token)
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "teste",
    "password": "123456"
  }'
```
A resposta incluirá um token JWT. Guarde-o para usar nas próximas requisições.

#### Exemplos de uso do token

**Listar usuários:**
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer seu_token_aqui"
```

**Criar uma tarefa:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer seu_token_aqui" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Minha tarefa",
    "description": "Descrição da tarefa",
    "status": "pendente",
    "user_id": 1
  }'
```

**Buscar tarefas de um usuário específico:**
```bash
curl -X GET "http://localhost:3000/tasks?assignedTo=1" \
  -H "Authorization: Bearer seu_token_aqui"
```

### 4.2 Testando no Postman

#### Criar um usuário
- Método: POST
- URL: `http://localhost:3000/users`
- Headers:
  - Key: `Content-Type`
  - Value: `application/json`
- Body (raw JSON):
```json
{
    "name": "Usuário Teste",
    "username": "teste",
    "password": "123456"
}
```

#### Fazer login
- Método: POST
- URL: `http://localhost:3000/auth/login`
- Headers:
  - Key: `Content-Type`
  - Value: `application/json`
- Body (raw JSON):
```json
{
    "username": "teste",
    "password": "123456"
}
```
A resposta incluirá um token JWT. Copie-o para usar nas próximas requisições.

#### Exemplos de requisições autenticadas

**Listar usuários:**
- Método: GET
- URL: `http://localhost:3000/users`
- Headers:
  - Key: `Authorization`
  - Value: `Bearer seu_token_aqui` (substitua "seu_token_aqui" pelo token recebido no login)

**Criar uma tarefa:**
- Método: POST
- URL: `http://localhost:3000/tasks`
- Headers:
  - Key: `Authorization`
  - Value: `Bearer seu_token_aqui` (substitua "seu_token_aqui" pelo token recebido no login)
  - Key: `Content-Type`
  - Value: `application/json`
- Body (raw JSON):
```json
{
    "title": "Minha tarefa",
    "description": "Descrição da tarefa",
    "status": "pendente",
    "user_id": 1
}
```

**Buscar tarefas de um usuário:**
- Método: GET
- URL: `http://localhost:3000/tasks?assignedTo=1`
- Headers:
  - Key: `Authorization`
  - Value: `Bearer seu_token_aqui` (substitua "seu_token_aqui" pelo token recebido no login)

### 4.3 Respostas de Erro Comuns

**Token não fornecido (401):**
```json
{
    "error": "Token não fornecido"
}
```

**Token inválido (401):**
```json
{
    "error": "Token inválido"
}
```

**Token mal formatado (401):**
```json
{
    "error": "Token mal formatado"
}
```

**Usuário não encontrado (404):**
```json
{
    "error": "Usuário não encontrado"
}
```

**Senha incorreta (401):**
```json
{
    "error": "Senha incorreta"
}
```
