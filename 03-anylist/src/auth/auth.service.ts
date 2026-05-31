import { Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/input/signup.input';
import { AuthResponse } from './types/auth-response.types';

@Injectable()
export class AuthService {

  constructor() {}

  async signup(signUpInput: SignUpInput): Promise<AuthResponse> {

    throw new Error('No implementhed');
  }
}
