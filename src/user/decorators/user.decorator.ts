import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../entities/user.entities';

export interface RequestWithUser extends Request {
  user: Omit<User, 'password'>;
}

export const LoggedInUser = createParamDecorator(
  (data: keyof RequestWithUser['user'], context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const User = request.user;
    return data ? User[data] : User;
  },
);
