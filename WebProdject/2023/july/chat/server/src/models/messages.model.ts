import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Chat } from './chats.model';

interface MessageCreateAttr {
  content: string;
  meta?: string;
  userId: number;
  ref?: number;
  chatId?: number;
  //postId?: number;
}

@Table({ tableName: 'messages' })
export class Messages extends Model<Messages, MessageCreateAttr> {
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
    description: 'Текст сообщения',
    example: 'бла бла',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @ApiProperty({
    description: 'Ссылка на изображение или файл',
    example: 'dskfisjfe.jpg',
  })
  @Column({
    type: DataType.STRING,
  })
  meta: string | null;

  @ApiProperty({
    description: 'id чата',
    example: 1,
  })
  @ForeignKey(() => Chat)
  @Column({
    type: DataType.INTEGER,
  })
  chatId: number | null;

  //   @ApiProperty({
  //     description: 'id поста',
  //     example: 1,
  //   })
  //   @ForeignKey(()=>Post)
  //   @Column({
  //     type: DataType.INTEGER,
  //   })
  //   postId: number | null;

  @ApiProperty({
    description: 'Ссылка на другое сообщение',
    example: 1,
  })
  @ForeignKey(() => Messages)
  @Column({
    type: DataType.INTEGER,
  })
  ref: number | null;

  @ApiProperty({
    description: 'Пользователь, который создал сообщение',
    example: 1,
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User, { foreignKey: 'userId' })
  user: User;

  @BelongsTo(() => Chat, { foreignKey: 'chatId' })
  chat: Chat;

  //!!!!!!!!!!!!!
  @BelongsTo(() => Messages, { foreignKey: 'ref' })
  refMessage: Messages;
  //!!!!!!!!!!!!!
  @HasMany(() => Messages)
  messages: Messages;
}
