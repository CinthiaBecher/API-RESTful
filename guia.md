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
  -d '{"name": "João Silva"}'
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