import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { UserRole } from './users_roles.model';



interface RoleCreateAttr {
  description: string;
  value: string;
}

export enum RolesList {
  Admin = 'ADMIN',
  User = 'USER',
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreateAttr> {
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
    description: 'Описание роли',
    example: 'Администратор',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  description: string;

  @ApiProperty({
    description: 'Строковый уникальный индитификатор роли',
    example: 'ADMIN',
    enum: RolesList,
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({
    description: 'Массив Пользователей которым пренадлежат роли',
    type: () => User,
  })
  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
