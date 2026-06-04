import { Mutation, Resolver } from '@nestjs/graphql';
import { SeedService } from './seed.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ValidRoles } from '../auth/enums/valid-roles.enums';
import { User } from '../users/entities/user.entity';

@Resolver()
@UseGuards(JwtAuthGuard)
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  @Mutation(() => Boolean, 
  {
    name: 'executeSeed',
    description: 'Ejecuta la construccón de la base de datos',
  })
  async executeSeed(
    @CurrentUser([ValidRoles.admin]) user: User,
  ): Promise<boolean> {

    return this.seedService.executeSeed();
  }
}
