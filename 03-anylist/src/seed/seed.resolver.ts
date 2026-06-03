import { Mutation, Resolver } from '@nestjs/graphql';
import { SeedService } from './seed.service';

@Resolver()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  @Mutation(() => Boolean, 
  {
    name: 'excecuteSeed',
    description: 'Ejecuta la construccón de la base de datos',
  })
  async excecuteSeed(): Promise<Boolean> {

    return this.seedService.executeSeed();
  }
}
