import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/repositories/categories.repositories';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAllByUserId(userId: string) {
    return this.categoriesRepository.findManyById(userId);
  }
}
