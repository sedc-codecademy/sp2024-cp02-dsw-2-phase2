import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  
  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {  
      return super.canActivate(context);
    }
    
    handleError(error, user) {
      if (error || !user) {
        throw error || new UnauthorizedException();
      }
      return user;
    }
  }
  