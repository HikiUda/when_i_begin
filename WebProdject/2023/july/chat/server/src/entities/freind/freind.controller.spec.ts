import { Test, TestingModule } from '@nestjs/testing';
import { FreindController } from './freind.controller';

describe('FreindController', () => {
  let controller: FreindController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FreindController],
    }).compile();

    controller = module.get<FreindController>(FreindController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
