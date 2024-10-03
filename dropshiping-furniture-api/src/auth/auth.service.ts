import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    console.log('User found:', user); 
    if (user) {
      const isPasswordValid = await bcrypt.compare(pass, user.password);
      console.log('Password valid:', isPasswordValid);  
      if (isPasswordValid) {
        delete user.password;
        return user;
      }
    }
    return null;
  }
  

  async register({ email, password, role }: RegisterUserDto) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new Error('USer already exiists');
    }

    const saltOrRound = 10;
    const hash = await bcrypt.hash(password, saltOrRound);

    const user = await this.userService.create(email, hash, role);

    delete user.password;
    return user;
  }

  async login(user: LoginUserDto) {
    const validUser = await this.validateUser(user.email, user.password);

    if (!validUser) {
      throw new UnauthorizedException('Invalid credentilas');
    }

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
