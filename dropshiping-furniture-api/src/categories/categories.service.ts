import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import { writeFile } from "fs/promises";
import { join } from "path";

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category)
  private readonly categoryRepo: Repository<Category>
  ) { }


//get all categories
  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepo.find();
    console.log('categories list:', categories);

    return categories;
  }
//save categories
//categories json-ot go kreirav za da istestiram categories
  async saveCategories(categories: Category[]) {
  await writeFile(join(process.cwd(), 'src', 'categories', 'data', 'categories.json'), JSON.stringify(categories, null, 2),
      'utf-8'
    );
  }

  //get category by id
 async getCategoryById(categoryId: number) {
    const foundCategory = await this.categoryRepo.findOneBy({categoryId});

    if(!foundCategory) throw new NotFoundException('category not found')
    return foundCategory;
  }

//create category
  async createCategory(categoryData: CreateCategoryDto) {
    const categories = await this.getAllCategories();

    const newCategory: Category = {
      categoryId: Number,
      ...categoryData,
    }

    categories.push(newCategory);

    await this.saveCategories(categories);

    return newCategory;
  }

  //update mislam nema potreba
  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }


  async deleteCategory(catId: number) {
    const foundCategory = await this.getCategoryById(catId);

    await this.categoryRepo.remove(foundCategory)
  }
}
