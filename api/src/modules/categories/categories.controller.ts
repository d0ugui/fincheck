import { Controller, Get } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CategoriesService } from './services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.categoriesService.findAllByUserId(userId);
  }

  // @Post()
  // create(@Body() createCategoryDto: CreateCategoryDto) {
  //   return this.categoriesService.create(createCategoryDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoriesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
  //   return this.categoriesService.update(+id, updateCategoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoriesService.remove(+id);
  // }
}
