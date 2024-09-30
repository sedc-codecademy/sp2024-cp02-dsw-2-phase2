import { LoginUserDto } from './login-user.dto';
import { IsEnum, IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/util/role.enum';

export class RegisterUserDto extends LoginUserDto {
  @ApiProperty({
    example: 'name_surname',
    description: 'Unique username for the user',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'name@example.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password for user authentication',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: Role.User,
    description: 'Role assigned to the user',
    enum: Role,
  })
  @IsEnum(Role)
  role: Role = Role.User;
}
