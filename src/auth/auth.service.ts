import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService, // To use JWT token
    private config: ConfigService, // To import JWT secret from .env
  ) {}

  // Async function to allow user to sign up. It takes a dto as an argument
  // See src/auth/dto/auth.dto.ts for format
  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      // return the user token
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // duplicate error code
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials already used');
        }
        throw error;
      }
    }
  }

  async signin(dto: AuthDto) {
    // Find the user by email using Prisma's findUnique
    // since there should only be one user with this email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // If user does not exist, throw exception
    if (!user) throw new ForbiddenException('Credentials are incorrect');

    // Compare password using argon's verify method
    const pwMatches = await argon.verify(user.hash, dto.password);

    // If password is incorrect, throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials are incorrect');

    // Return the value after adding the token w/signToken
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    //Sets return type to an object with access_token as a property and string val
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15M',
      secret: secret,
    });
    // Returns the access token as an object
    return {
      access_token: token,
    };
  }
}
