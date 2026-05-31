import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/input/signup.input';
import { AuthResponse } from './types/auth-response.types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signup' })
  async signup(
    @Args('signupInput') signupInput: SignUpInput
  ): Promise<AuthResponse> {
    return await this.authService.signup(signupInput);
  }

  // @Mutation(, { name: 'singin' })
  // async sigin(

  // ): Promise<> {
  //   return this.authService.signin();
  // }

  // @Query(, { name: 'revalidate' })
  // async revalidateToken() {
  //   return this.authService.revalidateToken();
  // }
  

}
