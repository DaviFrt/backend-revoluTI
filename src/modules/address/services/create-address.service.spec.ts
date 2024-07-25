import { Test, TestingModule } from '@nestjs/testing'
import { CreateAddressService } from './create-address.service'
import { PrismaService } from '../../../prisma/prisma.service'

const fakeAddresses = [
  {
    id: '19f9eb0d-6bb6-4b3d-ab0b-ad65b6d5280c',
    street: 'Rua A',
    neighborhood: 'Bairro A',
    city: 'Cidade A',
    state: 'Estado A',
    zip: '12345-678',
  },
  {
    id: 'f4d2d8c9-7a4a-4a4f-8c0c-8f3a3a1f9f3d',
    street: 'Rua B',
    neighborhood: 'Bairro B',
    city: 'Cidade B',
    state: 'Estado B',
    zip: '98765-432',
  },
  {
    id: 'b1c2b0f9-6a3a-4c3d-8b0b-8d6b6d5b2d0c',
    street: 'Rua C',
    neighborhood: 'Bairro C',
    city: 'Cidade C',
    state: 'Estado C',
    zip: '54321-876',
  },
]

const prismaMock = {
  address: {
    create: jest.fn().mockReturnValue(fakeAddresses[0]),
  },
}

describe('Create Address Service', () => {
  let createAddressService: CreateAddressService
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAddressService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile()

    createAddressService =
      module.get<CreateAddressService>(CreateAddressService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(createAddressService).toBeDefined()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create an address', async () => {
      const address = await prismaService.address.create({
        data: fakeAddresses[0],
      })

      expect(address).toEqual(fakeAddresses[0])
    })

    it('should throw an error if an address with the same zip already exists', async () => {
      const addressWithSameZip = fakeAddresses[0]

      prismaService.address.findUnique = jest
        .fn()
        .mockReturnValue(addressWithSameZip)

      await expect(
        createAddressService.create(addressWithSameZip),
      ).rejects.toThrow('Address with same zip already exists')
    })
  })
})
