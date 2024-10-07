import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Response } from "express";

@Controller("cat")
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) { }

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCats();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(Number(id));
  }

  @Post()
  createCategory(@Body() categoryData: CreateCategoryDto) {
    return this.categoryService.createCats(categoryData)
  }

  @Delete(':id')
  async deleteCategory(@Res() res: Response, @Param('id') catId: string) {
    await this.categoryService.deleteCat(Number(catId))

    res.sendStatus(204)
  }
}
