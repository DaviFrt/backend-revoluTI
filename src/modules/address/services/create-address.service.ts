import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaService } from '../../../prisma/prisma.service'
import { AddressDTO } from '../address.dto'

@Injectable()
export class CreateAddressService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: AddressDTO) {
    const { street, neighborhood, city, state, zip } = data

    const addressWithSameZip = await this.prisma.address.findUnique({
      where: {
        zip,
      },
    })

    if (addressWithSameZip) {
      throw new ConflictException('Address with same zip already exists')
    }

    const address = await this.prisma.address.create({
      data: {
        street,
        neighborhood,
        city,
        state,
        zip,
      },
    })

    return address
  }

  async findAll() {
    return this.prisma.address.findMany()
  }
}
