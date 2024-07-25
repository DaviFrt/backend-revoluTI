import { Module } from '@nestjs/common'
import { CreateAddressService } from './services/create-address.service'
import { CreateAddressController } from './controllers/create-address.controller'
import { FindAllAddressesController } from './controllers/find-all-addresses.controller'
import { FindAllAddressesService } from './services/find-all-addresses.service'
import { PrismaService } from '../../prisma/prisma.service'

@Module({
  controllers: [CreateAddressController, FindAllAddressesController],
  providers: [CreateAddressService, FindAllAddressesService, PrismaService],
})
export class AddressModule {}
