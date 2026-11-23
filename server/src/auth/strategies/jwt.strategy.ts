import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_ACCESS_SECRET ||
        "interviewai-secret",
    });
  }
  async validate(payload: any) {
  console.log("JWT PAYLOAD:", payload);

  const user = await this.usersService.findById(payload.sub);

  console.log("USER:", user);

  
  console.log(
  "VERIFY SECRET:",
  process.env.JWT_ACCESS_SECRET,
);

  if (!user) {
    throw new UnauthorizedException("User not found");
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
}
}