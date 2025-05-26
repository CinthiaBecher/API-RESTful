#!/bin/sh

echo "Aguardando o banco de dados estar pronto..."
while ! nc -z ${POSTGRES_HOST:-postgres} ${POSTGRES_PORT:-5432}; do
  sleep 1
done

echo "Executando migrations..."
PGPASSWORD=${POSTGRES_PASSWORD:-postgres} psql -h ${POSTGRES_HOST:-postgres} -U ${POSTGRES_USER:-postgres} -d ${POSTGRES_DB:-api_db} -f /init.sql

echo "Migrations executadas com sucesso!" 