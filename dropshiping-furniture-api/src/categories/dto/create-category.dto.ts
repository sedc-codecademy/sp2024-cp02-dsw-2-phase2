import { IsNumber, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNumber()
    category_id: number;

    @IsString()
    category_name: string;


}
