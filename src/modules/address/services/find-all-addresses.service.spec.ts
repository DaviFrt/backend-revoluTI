import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../../../prisma/prisma.service'
import { FindAllAddressesService } from './find-all-addresses.service'

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
    findMany: jest.fn().mockReturnValue(fakeAddresses),
  },
}

describe('Find All Address Service', () => {
  let findAllAddressService: FindAllAddressesService
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllAddressesService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile()

    findAllAddressService = module.get<FindAllAddressesService>(
      FindAllAddressesService,
    )
    prismaService = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(findAllAddressService).toBeDefined()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create an address', async () => {
      const address = await prismaService.address.findMany()

      expect(address).toEqual(fakeAddresses)
    })
  })
})
