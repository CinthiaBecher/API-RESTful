# API RESTful - Sistema de Gestão de Tarefas Colaborativas

Este projeto é uma API RESTful desenvolvida para a disciplina de Engenharia de Software, implementando um sistema de gestão de tarefas colaborativas.

## Tecnologias Utilizadas

- Node.js
- Express
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