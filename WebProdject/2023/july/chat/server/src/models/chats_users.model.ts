import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Chat } from './chats.model';

@Table({ tableName: 'chats_users', timestamps: false })
export class ChatsUsers extends Model {
  @ForeignKey(() => Chat)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  chatId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
}
