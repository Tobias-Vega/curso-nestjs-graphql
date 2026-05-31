import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SigninInput, SignupInput } from './dto/input';
import { AuthResponse } from './types/auth-response.types';
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

  // @Query(, { name: 'revalidate' })
  // async revalidateToken() {
  //   return this.authService.revalidateToken();
  // }
  

}
