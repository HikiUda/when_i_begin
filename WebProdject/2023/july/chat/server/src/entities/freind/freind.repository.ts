import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Freinds } from 'src/models/freinds.model';
import { IFreindRepository } from './interface/freindRepository';
import { FreindsDto } from './dto/freinds.dto';
import { Op } from 'sequelize';
import { FreinsListDBRequestDto } from './dto/freinds-list.dto';
import { User } from 'src/models/user.model';
import { Role } from 'src/models/roles.model';

@Injectable()
export class FreindRepository implements IFreindRepository {
  constructor(
    @InjectModel(Freinds) private freindModel: typeof Freinds,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async addInFreinds(dto: FreindsDto) {
    const { isFreind } = await this.isFreind(dto);
    if (isFreind) {
      throw new BadRequestException('Этот пользователь уже добавлен в друзья');
    }
    this.freindModel.create({ ...dto });
    return { isFreind: true };
  }
  async removeFromFreinds(dto: FreindsDto) {
    const { userOneId, userTwoId } = dto;
    this.freindModel.destroy({
      where: {
        [Op.or]: [
          { userOneId, userTwoId },
          { userOneId: userTwoId, userTwoId: userOneId },
        ],
      },
    });
    return { isFreind: false };
  }
  async isFreind(dto: FreindsDto) {
    const { userOneId, userTwoId } = dto;
    const isFreind = await this.freindModel.findOne({
      where: {
        [Op.or]: [
          { userOneId, userTwoId },
          { userOneId: userTwoId, userTwoId: userOneId },
        ],
      },
    });
    return { isFreind: !!isFreind };
  }
  async getFreindsList(dto: FreinsListDBRequestDto) {
    const { offset, limit, userId, search } = dto;
    const query = {
      [Op.or]: [
        { id: Number(userId) },
        {
          [Op.or]: [
            { email: { [Op.iLike]: search } },
            { phoneNumber: { [Op.iLike]: search } },
            { lastName: { [Op.iLike]: search } },
            { firstName: { [Op.iLike]: search } },
          ],
        },
      ],
    };

    const freindsList = await this.freindModel.findAndCountAll({
      offset,
      limit,
      include: [
        {
          model: User,
          as: 'userOne',
          where: query,
          include: [Role],
        },
        {
          model: User,
          as: 'userTwo',
          where: query,
          include: [Role],
        },
      ],
    });

    const freinds = freindsList.rows.map((freind) => {
      return freind.dataValues.userOne.dataValues.id === Number(userId)
        ? freind.dataValues.userTwo.dataValues
        : freind.dataValues.userOne.dataValues;
    });

    return { count: freindsList.count, freinds };
  }
}
