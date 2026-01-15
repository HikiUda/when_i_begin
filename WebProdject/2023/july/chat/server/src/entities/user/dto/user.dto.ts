import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from 'src/entities/role/dto/role.dto';
import { Role } from 'src/models/roles.model';
import { User } from 'src/models/user.model';

export class UserDto {
  @ApiProperty({
    description: 'Уникальный индитификатор',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'Уникальный email',
    example: 'user1@gmail.com',
  })
  email: string;
  @ApiProperty({
    description: 'Номер телефона',
    example: '88005553555',
  })
  phoneNumber: string;
  @ApiProperty({
    description: 'Имя',
    example: 'Виктор',
    type: 'string | null',
  })
  firstName: string | null;
  @ApiProperty({
    description: 'Фамилия',
    example: 'Кузницов',
    type: 'string | null',
  })
  lastName: string | null;
  @ApiProperty({
    description: 'Описание профиля пользователя',
    example:
      'Кем бы ты ни был, кем бы ты не стал, помни, где ты был и кем ты стал',
    type: 'string | null',
  })
  description: string | null;
  @ApiProperty({
    description: 'Ссылка на аватар пользователя',
    example: 'Ссылканааватар.jpg',
  })
  avatar: string | null;
  @ApiProperty({
    description: 'Дата рождения',
    example: new Date(2011, 0, 1, 2, 3, 4, 567),
    type: 'DateTime | null',
  })
  birthday: Date | null;
  @ApiProperty({
    description: 'Массив ролей',
    type: [RoleDto],
  })
  roles: RoleDto[];

  constructor(data: User) {
    this.id = data.id;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.description = data.description;
    this.avatar = data.avatar;
    this.birthday = data.birthday;
    this.roles = this.toRolesDto(data.roles);
  }

  toRolesDto(roles: Role[]) {
    const rolesDto = roles.map((role) => {
      const roleDto = new RoleDto(role);
      return roleDto;
    });
    return rolesDto;
  }
}
