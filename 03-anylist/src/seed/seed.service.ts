import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../items/entities/item.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SeedService {

  private isProd: boolean;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Item)
    private readonly itemsRespository: Repository<Item>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    this.isProd = configService.get('STATE') === 'prod';
  }

  async executeSeed() {

    if (this.isProd) {
      throw new ForbiddenException('We cannot run SEED on Prod');
    }
    // Limpiar la base de datos BORRAR TODO
    await this.deleteDatabase();

    // Crear usuarios

    // Crear items

    return true;
  }

  async deleteDatabase() {

    // borrar items
    await this.itemsRespository.createQueryBuilder()
      .delete()
      .where({})
      .execute();


    // borrar users
    await this.usersRepository.createQueryBuilder()
      .delete()
      .where({})
      .execute();

  }
}
