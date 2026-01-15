import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UserModule } from './entities/user/user.module';
import { Role } from './models/roles.model';
import { UserRole } from './models/users_roles.model';
import { Freinds } from './models/freinds.model';
import { RoleModule } from './entities/role/role.module';
import { AuthModule } from './entities/auth/auth.module';
import { Token } from './models/tokens.model';
import { FileModule } from './entities/file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FreindModule } from './entities/freind/freind.module';
import { Chat } from './models/chats.model';
import { ChatsUsers } from './models/chats_users.model';
import { Messages } from './models/messages.model';
import { ChatModule } from './entities/chat/chat.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [
        User,
        Role,
        UserRole,
        Freinds,
        Token,
        Chat,
        ChatsUsers,
        Messages,
      ],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    UserModule,
    RoleModule,
    AuthModule,
    FileModule,
    FreindModule,
    ChatModule,
  ],
})
export class AppModule {}
