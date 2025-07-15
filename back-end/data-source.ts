import 'dotenv/config';
import { DataSource } from 'typeorm';

console.log('🔧 DataSource - Iniciando...');
console.log('🔧 DataSource - Variáveis de ambiente:');
console.log('TYPEORM_HOST:', process.env.TYPEORM_HOST);
console.log('TYPEORM_PORT:', process.env.TYPEORM_PORT);
console.log('TYPEORM_USERNAME:', process.env.TYPEORM_USERNAME);
console.log('TYPEORM_DATABASE:', process.env.TYPEORM_DATABASE);
console.log(
  '🔧 DataSource - Process.env completo:',
  Object.keys(process.env).filter((key) => key.includes('TYPEORM')),
);

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT || '5432', 10),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ['src/**/entities/**/*.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
