import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

export const JwtPayload = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const jwtPayload = request.jwtPayload;

    if (!jwtPayload) {
      throw new UnauthorizedException();
    }

    return jwtPayload;
  },
);
