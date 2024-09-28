import { IsNumber, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNumber()
    categoryId: number;

    @IsString()
    category: string;


}
