import { Controller, Get } from '@nestjs/common'
import { FindAllAddressesService } from '../services/find-all-addresses.service'

@Controller('addresses')
export class FindAllAddressesController {
  constructor(
    private readonly findAllAddressesService: FindAllAddressesService,
  ) {}

  @Get()
  async handle() {
    return this.findAllAddressesService.findAll()
  }
}
