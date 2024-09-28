import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }


  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(":id")
  getCategoryById(@Param("id") id: string) {
    return this.categoriesService.getCategoryById(+id);
  }

  @Post()
  createCategory(@Body() categoryData: CreateCategoryDto) {
    return this.categoriesService.createCategory(categoryData);
  }

  // @Patch(":id")
  // update(
  //   @Param("id") id: string,
  //   @Body() updateCategoryDto: UpdateCategoryDto,
  // ) {
  //   return this.categoriesService.update(+id, updateCategoryDto);
  // }

  @Delete(":id")
  deleteCategory(@Param("id") id: string) {
    return this.categoriesService.deleteCategory(Number(id));
  }
}
