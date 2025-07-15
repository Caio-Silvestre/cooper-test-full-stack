FROM node:20

WORKDIR /app

RUN npm i -g @nestjs/cli
RUN apt-get update && apt-get install -y netcat-openbsd

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3001

CMD ["sh", "-c", "sleep 15 && echo '🔍 Testando conexão com PostgreSQL...' && nc -zv cooperspostgres 5432 && echo '✅ PostgreSQL acessível!' && npm run migration:run && npm run start:prod"]       