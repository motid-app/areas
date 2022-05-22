import { Controller, Get } from '@nestjs/common';
import { AreaService } from '../../services/area/area.service';
import { CountryService } from '../../services/country/country.service';

@Controller('api')
export class ApiController {
  constructor(
    private readonly countryService: CountryService,
    private readonly aeraService: AreaService
  ) {}

  @Get('countries')
  async getCountries() {
    return await this.countryService.countries()
  }

  @Get('areas')
  async getAreas() {
    return await this.aeraService.areas()
  }
}
