import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { User } from './user.model';

interface FreindsCreateAttr {
  userOneId: number;
  userTwoId: number;
}

@Table({ tableName: 'freinds' })
export class Freinds extends Model<Freinds, FreindsCreateAttr> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userOneId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userTwoId: number;

  //testing without - as: 'user'
  @BelongsTo(() => User, { as: 'userOne', foreignKey: 'userOneId' })
  userOne: User;
  @BelongsTo(() => User, { as: 'userTwo', foreignKey: 'userTwoId' })
  userTwo: User;
}
