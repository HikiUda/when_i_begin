import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { ChatsUsers } from './chats_users.model';
import { Messages } from './messages.model';

export type ChatType = 'common' | 'person';

interface ChatCreateAttr {
  type: ChatType;
  name?: string;
  userId?: number;
  image?: string;
}

@Table({ tableName: 'chats' })
export class Chat extends Model<Chat, ChatCreateAttr> {
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
    description: 'Тип чата',
    example: 'person',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: ChatType;

  @ApiProperty({
    description: 'Название чата если он общий',
    example: 'Волки',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string | null;

  @ApiProperty({
    description: 'Изображения чата если он общий',
    example: 'оылвоаыулою.jpg',
  })
  @Column({
    type: DataType.STRING,
  })
  image: string | null;

  @ApiProperty({
    description: 'id владельца чата если он общий',
    example: '3',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number | null;

  @BelongsToMany(() => User, () => ChatsUsers)
  users: User[];

  @HasMany(() => Messages)
  messages: Messages[];
}
