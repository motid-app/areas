import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryAreasDto } from 'src/dto/area.dto';
import { AreaService } from '../../services/area/area.service';
import { CountryService } from '../../services/country/country.service';

@ApiTags('APIs')
@Controller('api')
export class ApiController {
  constructor(
    private readonly countryService: CountryService,
    private readonly aeraService: AreaService
  ) {}

  @Get('countries')
  async getCountries() {
    return await this.countryService.all()
  }

  @Get('areas')
  async getAreas(@Query() query: QueryAreasDto) {
    return await this.aeraService.findMany(query)
  }

  @Get('areas/:id')
  async getArea(@Param('id', ParseIntPipe) id: number) {
    return await this.aeraService.findById(id)
  }
}
