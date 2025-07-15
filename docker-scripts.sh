#!/bin/bash

# Script para gerenciar a aplicação Cooper's com Docker

case "$1" in
  "up")
    echo "🚀 Iniciando aplicação Cooper's..."
    docker-compose up -d
    echo "✅ Aplicação iniciada!"
    echo "📱 Frontend: http://localhost:3000"
    echo "🔧 Backend: http://localhost:3001"
    echo "🗄️  PostgreSQL: localhost:5432"
    ;;
  "down")
    echo "🛑 Parando aplicação Cooper's..."
    docker-compose down
    echo "✅ Aplicação parada!"
    ;;
  "restart")
    echo "🔄 Reiniciando aplicação Cooper's..."
    docker-compose down
    docker-compose up -d
    echo "✅ Aplicação reiniciada!"
    ;;
  "logs")
    echo "📋 Mostrando logs..."
    docker-compose logs -f
    ;;
  "build")
    echo "🔨 Rebuildando containers..."
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    echo "✅ Containers rebuildados e iniciados!"
    ;;
  "clean")
    echo "🧹 Limpando containers e volumes..."
    docker-compose down -v
    docker system prune -f
    echo "✅ Limpeza concluída!"
    ;;
  "status")
    echo "📊 Status dos containers:"
    docker-compose ps
    ;;
  *)
    echo "Uso: $0 {up|down|restart|logs|build|clean|status}"
    echo ""
    echo "Comandos disponíveis:"
    echo "  up      - Inicia a aplicação"
    echo "  down    - Para a aplicação"
    echo "  restart - Reinicia a aplicação"
    echo "  logs    - Mostra os logs"
    echo "  build   - Rebuilda os containers"
    echo "  clean   - Limpa containers e volumes"
    echo "  status  - Mostra status dos containers"
    exit 1
    ;;
esac 