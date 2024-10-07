import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Category } from "./entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) { }
  async getAllCats() {
    console.log('fetch all cats');
    const categories = await this.categoryRepo.find();
    console.log('cats retrived', categories);
    return categories;
  }

  //get cat by id
  async getCategoryById(categoryId: number) {
    const categories = await this.getAllCats();
    const foundCategory = categories.find(cat => cat.category_id === categoryId)

    if (!foundCategory) throw new NotFoundException('Cat not found');

    return foundCategory;
  }

  async createCats(createCatData: CreateCategoryDto) {
    const category = this.categoryRepo.create(createCatData);
    return await this.categoryRepo.save(category);
  }

  //delete category
  async deleteCat(catId: number) {
    const foundCat = await this.getCategoryById(catId);

    await this.categoryRepo.remove(foundCat);

  }
}
