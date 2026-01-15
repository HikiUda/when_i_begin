import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserRole } from './users_roles.model';
import { Role } from './roles.model';
import { Token } from './tokens.model';
import { Freinds } from './freinds.model';
import { Chat } from './chats.model';
import { ChatsUsers } from './chats_users.model';
import { Messages } from './messages.model';

interface UserCreateAttr {
  email: string;
  password: string;
  phone_number: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreateAttr> {
  @ApiProperty({
    description: 'Уникальный индитификатор',
    example: 1,
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    description: 'Уникальный email',
    example: 'user1@gmail.com',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({
    description: 'Пароль',
    example: 'password123',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    description: 'Номер телефона',
    example: '88005553555',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  phoneNumber: string;

  @ApiProperty({
    description: 'Имя',
    example: 'Виктор',
    type: 'string | null',
  })
  @Column({ type: DataType.STRING })
  firstName: string;

  @ApiProperty({
    description: 'Фамилия',
    example: 'Кузницов',
    type: 'string | null',
  })
  @Column({ type: DataType.STRING })
  lastName: string;

  @ApiProperty({
    description: 'Описание профиля пользователя',
    example:
      'Кем бы ты ни был, кем бы ты не стал, помни, где ты был и кем ты стал',
    type: 'string | null',
  })
  @Column({ type: DataType.STRING })
  description: string;

  @ApiProperty({
    description: 'Ссылка на аватар пользователя',
    example: 'Ссылканааватар.jpg',
  })
  @Column({ type: DataType.STRING })
  avatar: string;

  @ApiProperty({
    description: 'Дата рождения',
    example: new Date(2011, 0, 1, 2, 3, 4, 567),
    type: 'DateTime | null',
  })
  @Column({ type: DataType.DATE })
  birthday: Date;

  @ApiProperty({
    description: 'Массив ролей',
    type: () => Role,
  })
  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @BelongsToMany(() => Chat, () => ChatsUsers)
  chats: Chat[];

  @HasOne(() => Token)
  token: Token;

  @HasMany(() => Freinds)
  freinds: Freinds[];

  @HasMany(() => Messages)
  messages: Messages[];
}
