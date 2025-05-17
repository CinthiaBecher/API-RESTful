.PHONY: up down build logs clean reset help run

# Variáveis
DOCKER_COMPOSE = docker-compose
CONTAINER_API = api_service
CONTAINER_DB = api_postgres

# Comandos principais
run: ## Inicia todos os serviços (com build se necessário)
	$(DOCKER_COMPOSE) up -d --build

down: ## Para todos os serviços
	$(DOCKER_COMPOSE) down

logs: ## Mostra os logs de todos os serviços
	$(DOCKER_COMPOSE) logs -f

# Comandos de banco de dados
db-logs: ## Mostra os logs do banco de dados
	$(DOCKER_COMPOSE) logs -f $(CONTAINER_DB)

db-reset: ## Reseta o banco de dados (remove volume e executa migrations)
	$(DOCKER_COMPOSE) down -v
	$(DOCKER_COMPOSE) up -d postgres
	sleep 5
	$(DOCKER_COMPOSE) up migrations
	$(DOCKER_COMPOSE) up -d api

# Comandos de limpeza
clean: ## Remove containers, imagens e volumes não utilizados
	$(DOCKER_COMPOSE) down -v
	docker system prune -f

# Comandos de ajuda
help: ## Mostra esta mensagem de ajuda
	@echo "Comandos disponíveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Comando padrão
.DEFAULT_GOAL := help 