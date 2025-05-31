# API RESTful - Sistema de Gestão de Tarefas Colaborativas

Este projeto é uma API RESTful desenvolvida para a disciplina de Engenharia de Software, implementando um sistema de gestão de tarefas colaborativas. O principal objectivo desse sistema é possibilitar a criação de usuários, que poderão criar e editar tarefas, mudando seu status e conteúdo.

## Decisões Arquiteturiais

A arquitetura em camadas foi escolhida para o desenvolvimento deste trabalho, principalmente pela facilidade do seu entendimento e pela sua similaridade com o MVC, padrão que o grupo possuía mais familiaridade. Além disso, é uma arquitetura que entrega uma boa organização e modularização do código, e facilita também a implementação de testes.

Além disso, foi utilizado containers Dockers na arquitetura, para que seja mais fácil para o usuário executar a API desenvolvida, sem que ele precise instalar as diversas dependências. Três containers são criados inicialmente: um para o banco de dados, outro para a aplicação e um terceiro para a inicialização do banco e configurações iniciais. Esse terceiro é finalizado logo depois da sua criação e execução, então a arquitetura final fica de fato com dois containers em execução.

Considerando os containers e a arquitetura em camadas, a arquitetura final ficou da seguinte forma:

<img src="https://github.com/CinthiaBecher/API-RESTful/blob/main/Arquitetura_em_camadas.png" alt="Arquitetura em camadas da API" width="300px" height="400px">

## Modelagem de Dados

Haverá duas tabelas no banco de dados: uma de usuário e outra de tarefas.
- Tabela User (usuário): essa tabela armazenará os dados do usuário, incluindo ID (chave primária), nome, username e senha.
- Tabela Task (tarefa): essa tabela guarda as tarefas criadas e seus dados, incluindo ID (chave primária), título, descrição, status e user_ID (chave secundária que guarda o usuário atribuído à tarefa).

O diagrama entidade-relacional pode ser representado da seguinte maneira:

<img src="https://github.com/CinthiaBecher/API-RESTful/blob/main/Diagrama%20ER.png" alt="Arquitetura em camadas da API" width="150px" height="400px">

## Fluxo de Requisições

Os seguintes endpoints são entregues na API:

### Usuários
- POST /users = cria um novo usuário

## Tecnologias Utilizadas

- Node.js
- Express
- Jest
- PostgreSQL
- Docker
- Make

## Pré-requisitos

Antes de começar, você precisa ter instalado:
- Docker
- Make (já vem instalado no Mac, no Windows pode ser instalado via Chocolatey)

### Instalação do Make no Windows
1. Instale o Chocolatey (gerenciador de pacotes para Windows):
   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```
2. Instale o Make:
   ```powershell
   choco install make
   ```

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/CinthiaBecher/API-RESTful.git
cd API-RESTful
```

2. Certifique-se que o Docker Desktop está rodando

## Executando o Projeto

### Usando Make (Recomendado)

O projeto inclui um Makefile com vários comandos úteis. Para ver todos os comandos disponíveis:
```bash
make help
```

Para iniciar o projeto:
```bash
make run
```

Outros comandos úteis:
- `make down` - Para todos os serviços
- `make logs` - Mostra os logs de todos os serviços
- `make db-reset` - Reseta o banco de dados (remove volume e executa migrations)
- `make clean` - Remove containers, imagens e volumes não utilizados

### Usando Docker Compose diretamente

Se preferir não usar o Make, você pode usar os comandos do Docker Compose diretamente:

```bash
# Iniciar os serviços
docker-compose up -d

# Parar os serviços
docker-compose down

# Ver logs
docker-compose logs -f
```



## Serviços

O projeto utiliza três serviços Docker:

1. **PostgreSQL** (`postgres`):
   - Banco de dados principal
   - Porta: 5432
   - Credenciais padrão: postgres/postgres

2. **Migrations** (`migrations`):
   - Executa as migrations do banco de dados
   - Roda apenas uma vez durante a inicialização

3. **API** (`api`):
   - Servidor Node.js
   - Porta: 3000
   - Hot-reload ativado para desenvolvimento



## Autores

- Cinthia Becher
- Gabrielle Bussolo
