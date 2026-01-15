// import {
//   BelongsTo,
//   Column,
//   DataType,
//   ForeignKey,
//   Model,
//   Table,
// } from 'sequelize-typescript';

// import { User } from './user.model';
// import { ApiProperty } from '@nestjs/swagger';

// enum StatementsStatus {
//   PENDING = 'pending',
//   ACCEPT = 'accept',
//   REJECT = 'reject',
// }

// @Table({ tableName: 'statements' })
// export class Statements extends Model {
//   @ApiProperty({
//     description: 'Уникальный индитификатор',
//     example: 1,
//   })
//   @Column({
//     type: DataType.INTEGER,
//     unique: true,
//     primaryKey: true,
//     autoIncrement: true,
//   })
//   id: number;

//   @ForeignKey(() => User)
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   fromUserId: number;

//   @ForeignKey(() => User)
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   toUserId: number;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   status: StatementsStatus;

//   @BelongsTo(() => User, { as: 'fromUser', foreignKey: 'fromUserId' })
//   usetOne: User;
//   @BelongsTo(() => User, { as: 'toUser', foreignKey: 'toUserId' })
//   usetTwo: User;
// }
