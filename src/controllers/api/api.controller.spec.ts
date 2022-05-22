import { Test, TestingModule } from '@nestjs/testing';
import { AreaService } from '../../services/area/area.service';
import { CountryService } from '../../services/country/country.service';
import { PrismaService } from '../../services/prisma/prisma.service';
import { ApiController } from './api.controller';

describe('ApiController', () => {
  let controller: ApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [PrismaService, AreaService, CountryService]
    }).compile();

    controller = module.get<ApiController>(ApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
