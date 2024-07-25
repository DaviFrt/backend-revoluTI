import { Controller, Get } from '@nestjs/common'
import { FindAllAddressesService } from '../services/find-all-addresses.service'
import { ApiTags } from '@nestjs/swagger'

@Controller('addresses')
@ApiTags('Addresses')
export class FindAllAddressesController {
  constructor(
    private readonly findAllAddressesService: FindAllAddressesService,
  ) {}

  @Get()
  async handle() {
    return this.findAllAddressesService.findAll()
  }
}
