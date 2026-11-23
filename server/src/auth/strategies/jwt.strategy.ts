import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


import { UsersService } from '../../users/users.service';

import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
 constructor(
  private readonly usersService: UsersService,
) {
  console.log(
    "VERIFY SECRET =",
    process.env.JWT_ACCESS_SECRET,
  );






const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YTUyMDFlNTg4Y2YxYzhiZTUxYTcyNWQiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTc4Mzc5MTk4NSwiZXhwIjoxNzgzNzkyODg1fQ.ufx0EH4dXDleWdfNTeHnylyTnI27TF30zUbU-hE2qiI";

try {
  const decoded = jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET!,
  );

  console.log("MANUAL VERIFY OK");
  console.log(decoded);
} catch (e) {
  console.log("MANUAL VERIFY FAILED");
  console.log(e);
}
  







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