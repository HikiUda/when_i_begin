import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';

interface TokenCreateAttr {
  userId: number;
  token: string;
}

@Table({ tableName: 'tokens' })
export class Token extends Model<Token, TokenCreateAttr> {
  @ApiProperty({
    description: 'Уникальный индитификатор',
    example: 1,
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  userId: number;

  @ApiProperty({
    description: 'jwt токен',
    example: 'token',
  })
  @Column({
    type: DataType.TEXT,
    unique: true,
    allowNull: false,
  })
  token: string;

  @BelongsTo(() => User)
  user: User;
}
