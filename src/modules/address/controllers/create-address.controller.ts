import { z } from 'zod'
import { CreateAddressService } from '../services/create-address.service'
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { createZodDto } from '@anatine/zod-nestjs'

const createAddressBodySchema = z.object({
  street: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
})

export type CreateAddressType = z.infer<typeof createAddressBodySchema>
export class CreateAddressDTO extends createZodDto(createAddressBodySchema) {}

@Controller('address')
@ApiTags('Address')
export class CreateAddressController {
  constructor(private readonly addressService: CreateAddressService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAddressBodySchema))
  @ApiBody({ type: CreateAddressDTO })
  async create(@Body() data: CreateAddressType) {
    const { street, neighborhood, city, state, zip } = data

    if (!zip.includes('-')) {
      const address = await this.addressService.create({
        street,
        neighborhood,
        city,
        state,
        zip,
      })

      return { address }
    }

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
