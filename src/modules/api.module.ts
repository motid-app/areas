import { Module } from '@nestjs/common';
import { AreaService } from 'src/services/area/area.service';
import { CountryService } from 'src/services/country/country.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ApiController } from 'src/controllers/api/api.controller';

@Module({
  controllers: [ApiController],
  providers: [
    PrismaService,
    CountryService,
    AreaService
  ]
})
export class ApiModule {}
