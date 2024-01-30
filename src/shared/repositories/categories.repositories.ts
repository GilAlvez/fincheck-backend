import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findManyByUserId(id: string) {
    return this.prismaService.category.findMany({
      where: { user_id: id },
    });
  }
}
