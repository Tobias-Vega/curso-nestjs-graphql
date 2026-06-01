import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SigninInput, SignupInput } from './dto/input';
import { AuthResponse } from './types/auth-response.types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signup' })
  async signup(
    @Args('signupInput') signupInput: SignupInput
  ): Promise<AuthResponse> {
    return await this.authService.signup(signupInput);
  }

  @Mutation(() => AuthResponse, { name: 'signin' })
  async signin(
    @Args('signinInput') signinInput: SigninInput
  ): Promise<AuthResponse> {
    return await this.authService.signin(signinInput);
  }

  @Query(() => AuthResponse, { name: 'revalidate' })
  @UseGuards(JwtAuthGuard)
  revalidateToken(

  ): AuthResponse {
    // return this.authService.revalidateToken();
    throw new Error('Not implemented')
  }
}
