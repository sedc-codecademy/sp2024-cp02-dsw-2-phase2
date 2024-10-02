import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/util/role.enum';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;




  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
