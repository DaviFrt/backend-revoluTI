import { z } from 'zod'
import { CreateAddressService } from '../services/create-address.service'
import { Body, Controller, HttpCode, Post } from '@nestjs/common'

const createAddressBodySchema = z.object({
  street: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
})

type CreateAddressBodySchema = z.infer<typeof createAddressBodySchema>

@Controller('address')
export class CreateAddressController {
  constructor(private readonly addressService: CreateAddressService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateAddressBodySchema) {
    const { street, neighborhood, city, state, zip } = data

    const cleanZip = zip.replace('-', '')

    const address = await this.addressService.create({
      street,
      neighborhood,
      city,
      state,
      zip: cleanZip,
    })

    return { address }
  }
}
