import { Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/input/signup.input';
import { AuthResponse } from './types/auth-response.types';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  async signup(signUpInput: SignUpInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signUpInput);

    // TODO: crear JWT
    const token = 'ABC123';


    return { token, user };
  }
}
