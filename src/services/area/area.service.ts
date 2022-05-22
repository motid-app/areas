import { Injectable } from "@nestjs/common"
import { QueryAreasDto } from "src/dto/area.dto";
import { PrismaService } from "..//prisma/prisma.service";

@Injectable()
export class AreaService {
  constructor(private prisma: PrismaService) {}

  async findMany({ ids, ...rest }: QueryAreasDto) {
    return await this.prisma.area.findMany({
      where: {
        parentId: null,
        id: {
          in: ids
        },
        ...rest
      }
    })
  }

  async findById(id: number) {
    return await this.prisma.area.findUnique({
      where: {
        id
      },
      include: {
        parent: true,
        subAreas: true,
        country: true
      }
    })
  }
}