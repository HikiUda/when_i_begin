import { ApiProperty } from '@nestjs/swagger';
//import { Express } from 'express';

export class UpdateUserProfileDto {
  @ApiProperty({
    description: 'Имя',
    example: 'Виктор',
    type: 'string | null',
  })
  firstName: string;
  @ApiProperty({
    description: 'Фамилия',
    example: 'Кузницов',
    type: 'string | null',
  })
  lastName: string;
  @ApiProperty({
    description: 'Описание профиля пользователя',
    example:
      'Кем бы ты ни был, кем бы ты не стал, помни, где ты был и кем ты стал',
    type: 'string | null',
  })
  description: string;

  @ApiProperty({
    description: 'Дата рождения',
    example: new Date(2011, 0, 1, 2, 3, 4, 567),
    type: 'DateTime | null',
  })
  birthday: Date;
  @ApiProperty({
    description: 'Ссылка на аватар пользователя',
    example: 'Ссылканааватар.jpg',
  })
  avatar: string;
  //image: Express.Multer.File;
}
