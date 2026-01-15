import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './entities/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/users/users.model';
import { RolesModule } from './entities/roles/roles.module';
import { Role } from './entities/roles/roles.model';
import { UserRoles } from './entities/roles/user_roles.model';
import { AuthModule } from './entities/auth/auth.module';
import { PostsModule } from './entities/posts/posts.module';
import { Post } from './entities/posts/posts.model';
import { FilesModule } from './entities/files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Post],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'static'),
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
})
export class AppModule {}
