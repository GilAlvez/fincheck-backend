import { Controller, Get } from '@nestjs/common';
import { JwtPayload } from 'src/shared/decorators/jwt-payload';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(@JwtPayload() jwtPayload: JwtPayload) {
    return this.categoriesService.findAllByUserId(jwtPayload.sub);
  }
}
