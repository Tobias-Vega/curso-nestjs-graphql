import { Injectable } from '@nestjs/common';
import { SignupInput } from './dto/input/signup.input';
import { AuthResponse } from './types/auth-response.types';
import { UsersService } from '../users/users.service';
import { SigninInput } from './dto/input';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  async signup(signUpInput: SignupInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signUpInput);

    // TODO: crear JWT
    const token = 'ABC123';


    return { token, user };
  }

  async signin(signinInput: SigninInput): Promise<AuthResponse> {

    const { email, password } = signinInput;

    const user = await this.usersService.findOneByEmail(email);

    const token = 'ABC123';

    return {
      token,
      user,
    }



  }
}
