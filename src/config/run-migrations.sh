#!/bin/sh

echo "Aguardando o banco de dados estar pronto..."
while ! nc -z postgres 5432; do
  sleep 1
done

echo "Executando migrations..."
PGPASSWORD=postgres psql -h postgres -U postgres -d api_db -f /init.sql

echo "Migrations executadas com sucesso!" 