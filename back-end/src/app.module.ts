import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/entities/task/task';
import { User } from './user/entities/user/user';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ContactModule } from './contact/contact.module';
import { ContactMessage } from './contact/contact-message.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TaskModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: (process.env.TYPEORM_CONNECTION as any) || 'postgres',
      host: process.env.TYPEORM_HOST || 'localhost',
      port: parseInt(process.env.TYPEORM_PORT || '5432', 10),
      username: process.env.TYPEORM_USERNAME || 'postgres',
      password: process.env.TYPEORM_PASSWORD || '',
      database: process.env.TYPEORM_DATABASE || '',
      entities: [Task, User, ContactMessage],
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    }),
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
