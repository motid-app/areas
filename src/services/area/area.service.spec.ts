import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AreaService } from './area.service';

describe('AreaService', () => {
  let service: AreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, AreaService],
    }).compile();

    service = module.get<AreaService>(AreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
