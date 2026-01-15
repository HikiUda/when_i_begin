import { Test, TestingModule } from '@nestjs/testing';
import { FreindService } from './freind.service';

describe('FreindService', () => {
  let service: FreindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FreindService],
    }).compile();

    service = module.get<FreindService>(FreindService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
