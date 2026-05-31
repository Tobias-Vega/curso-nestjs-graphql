import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(, { name: 'signup' })
  async signup(

  ): Promise<> {
    await return this.authService.singup()
  }

  @Mutation(, { name: 'singin' })
  async sigin(

  ): Promise<> {
    return this.authService.signin();
  }

  @Query(, { name: 'revalidate' })
  async revalidateToken() {
    return this.authService.revalidateToken();
  }
  

}
