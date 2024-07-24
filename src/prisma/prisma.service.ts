import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  public client: PrismaClient

  constructor() {
    super()
  }

  onModuleInit() {
    return this.$connect()
  }

  async onModuleDestroy() {
    return this.$disconnect()
  }
}
