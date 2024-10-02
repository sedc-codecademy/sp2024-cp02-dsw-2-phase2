import { Injectable, UnauthorizedException,ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    delete user.password; // Remove password before returning
    return user;
  }

  async register({ email, password, role }: RegisterUserDto) {
    // Check if the email already exists
    const existingUserByEmail = await this.userService.findByEmail(email);
    if (existingUserByEmail) {
      throw new ConflictException('Email already in use');
    }


    // Hash the password
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    // Create the user
    const user = await this.userService.create({
      email,
      password: hashedPassword,
      role,
    });

    // Optionally, remove the password before returning
    delete user.password;

    return user; // Return the newly created user (or any relevant response)
  }



  async login(user: LoginUserDto) {
    const validUser = await this.validateUser(user.email, user.password);
    
    const payload = {
      email: validUser.email,
      sub: validUser.id,
      role: validUser.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }
}
