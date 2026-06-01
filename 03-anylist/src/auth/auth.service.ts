import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupInput } from './dto/input/signup.input';
import { AuthResponse } from './types/auth-response.types';
import { UsersService } from '../users/users.service';
import { SigninInput } from './dto/input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signUpInput: SignupInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signUpInput);

    const token = this.getJwtToken(user.id);

    return { token, user };
  }

  async signin(signinInput: SigninInput): Promise<AuthResponse> {

    const { email, password } = signinInput;

    const user = await this.usersService.findOneByEmail(email);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException(`Email or Password do not match`);
    }

    const token = this.getJwtToken(user.id);

    return {
      token,
      user,
    }
  }

  private getJwtToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }
}
