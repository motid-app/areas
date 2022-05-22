import { Injectable } from "@nestjs/common"
import { PrismaService } from "..//prisma/prisma.service";

@Injectable()
export class AreaService {
  constructor(private prisma: PrismaService) {}

  async areas() {
    return await this.prisma.area.findMany()
  }
}