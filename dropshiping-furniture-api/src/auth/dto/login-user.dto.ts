import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'name@example.com',
    description: 'The email of the user for login',
  })
  @IsEmail()
  @IsNotEmpty()  
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user for login',
  })
  @IsString()
  @IsNotEmpty()  
  password: string;
}
