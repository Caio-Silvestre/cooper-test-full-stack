# 🐳 Cooper's Full-Stack com Docker

Este projeto está configurado para rodar completamente em containers Docker, incluindo:

- **Frontend**: Next.js (porta 3000)
- **Backend**: NestJS (porta 3001)
- **Banco de dados**: PostgreSQL (porta 5432)

## 📋 Pré-requisitos

- Docker Desktop instalado e rodando
- Docker Compose instalado
- Git

## 🚀 Como usar

### Opção 1: Usando o script (Recomendado)

1. **Torne o script executável:**

   ```bash
   chmod +x docker-scripts.sh
   ```

2. **Inicie a aplicação:**

   ```bash
   ./docker-scripts.sh up
   ```

3. **Para parar:**
   ```bash
   ./docker-scripts.sh down
   ```

### Opção 2: Usando Docker Compose diretamente

1. **Iniciar todos os serviços:**

   ```bash
   docker-compose up -d
   ```

2. **Parar todos os serviços:**
   ```bash
   docker-compose down
   ```

## 📱 Acessos

Após iniciar a aplicação, você pode acessar:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **PostgreSQL**: localhost:5432

## 🔧 Comandos úteis

### Usando o script:

```bash
./docker-scripts.sh up      # Inicia a aplicação
./docker-scripts.sh down    # Para a aplicação
./docker-scripts.sh restart # Reinicia a aplicação
./docker-scripts.sh logs    # Mostra logs
./docker-scripts.sh build   # Rebuilda containers
./docker-scripts.sh clean   # Limpa tudo
./docker-scripts.sh status  # Status dos containers
```

### Usando Docker Compose:

```bash
docker-compose up -d        # Inicia em background
docker-compose down         # Para e remove containers
docker-compose restart      # Reinicia containers
docker-compose logs -f      # Mostra logs em tempo real
docker-compose build        # Rebuilda imagens
docker-compose ps           # Status dos containers
```

## 🗄️ Banco de dados

O PostgreSQL é configurado com:

- **Database**: coopers_db
- **Usuário**: coopers_user
- **Senha**: coopers_password
- **Porta**: 5432

Os dados são persistidos em um volume Docker, então não serão perdidos ao parar os containers.

## 🔄 Desenvolvimento

Para desenvolvimento local sem Docker:

### Backend:

```bash
cd coopers-test-back-end
npm install
npm run start:dev
```

### Frontend:

```bash
cd coopers-test-front-end
npm install
npm run dev
```

## 🐛 Troubleshooting

### Se os containers não iniciarem:

1. **Verifique se o Docker está rodando**
2. **Verifique as portas disponíveis** (3000, 3001, 5432)
3. **Limpe containers antigos:**
   ```bash
   ./docker-scripts.sh clean
   ```

### Para ver logs específicos:

```bash
docker-compose logs backend    # Logs do backend
docker-compose logs frontend   # Logs do frontend
docker-compose logs postgres   # Logs do banco
```

### Para acessar o banco de dados:

```bash
docker exec -it coopers-postgres psql -U coopers_user -d coopers_db
```

## 🔒 Variáveis de ambiente

As variáveis de ambiente estão configuradas no `docker-compose.yml`. Para produção, considere:

1. Usar um arquivo `.env` separado
2. Alterar as senhas padrão
3. Configurar JWT_SECRET adequadamente
4. Usar secrets do Docker Swarm ou Kubernetes

## 📝 Estrutura dos arquivos Docker

```
├── docker-compose.yml           # Orquestração dos serviços
├── docker-scripts.sh           # Script de gerenciamento
├── coopers-test-back-end/
│   ├── Dockerfile              # Container do backend
│   └── .dockerignore           # Arquivos ignorados no build
└── coopers-test-front-end/
    ├── Dockerfile              # Container do frontend
    └── .dockerignore           # Arquivos ignorados no build
```
