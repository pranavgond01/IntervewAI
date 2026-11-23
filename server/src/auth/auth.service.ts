import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from "../users/schemas/user.schema";
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(
      registerDto.email,
    );

    if (existingUser) {
      throw new BadRequestException(
        'User already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      12,
    );

    const user = await this.usersService.create({
  firstName: registerDto.firstName,
  lastName: registerDto.lastName,
  email: registerDto.email,
  password: hashedPassword,
  role: UserRole.STUDENT,
  experience: registerDto.experience || "Fresher",
});

    const tokens = await this.generateTokens(
      user.id,
      user.email,
      user.role,
    );

    await this.usersService.updateRefreshToken(
      user.id,
      await bcrypt.hash(tokens.refreshToken, 12),
    );

    return {
      success: true,
      message: 'Registration successful.',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  }

  async login(loginDto: LoginDto) {
  console.log("Email:", loginDto.email);
  

  const user = await this.usersService.findByEmail(loginDto.email);

  console.log("User found:", user);

  if (!user) {
    throw new UnauthorizedException("Invalid credentials");
  }

  console.log("Entered password:", loginDto.password);
  console.log("Stored hash:", user.password);

  const validPassword = await bcrypt.compare(
    loginDto.password,
    user.password,
  );

  console.log("Password match:", validPassword);

  if (!validPassword) {
    throw new UnauthorizedException("Invalid credentials");
  }

  const tokens = await this.generateTokens(
    user.id,
    user.email,
    user.role,
  );
  console.log("RETURNING TOKEN:");
  console.log(tokens.accessToken);

  await this.usersService.updateRefreshToken(
    user.id,
    await bcrypt.hash(tokens.refreshToken, 12),
  );

  await this.usersService.updateLastLogin(user.id);

  return {
    success: true,
    message: "Login successful.",
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    ...tokens,
  };
}
  async profile(user: any) {
    return this.usersService.findById(user.id);
  }

  async refreshToken(
    userId: string,
    refreshToken: string,
  ) {
    const user = await this.usersService.findById(
      userId,
    );

    if (!user.refreshToken) {
      throw new UnauthorizedException();
    }

    const valid = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!valid) {
      throw new UnauthorizedException();
    }

    return this.generateTokens(
      user.id,
      user.email,
      user.role,
    );
  }

  async logout(userId: string) {
    await this.usersService.updateRefreshToken(
      userId,
      null,
    );

    return {
      success: true,
      message: 'Logged out successfully.',
    };
  }

  private async generateTokens(
    id: string,
    email: string,
    role: string,
  ) {
    const payload = {
      sub: id,
      email,
      role,
    };
    console.log("ACCESS SECRET:", process.env.JWT_ACCESS_SECRET);
    console.log("REFRESH SECRET:", process.env.JWT_REFRESH_SECRET);

    





    console.log("ACCESS SECRET:", process.env.JWT_ACCESS_SECRET);

const accessToken = await this.jwtService.signAsync(payload, {
  secret: process.env.JWT_ACCESS_SECRET,
  expiresIn: process.env.JWT_ACCESS_EXPIRES_IN as any,
});

    console.log("TOKEN:", accessToken);
    const refreshToken = await this.jwtService.signAsync(payload, {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as any,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

}