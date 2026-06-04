import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../items/entities/item.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { SEED_ITEMS, SEED_USERS } from './data/seed-data';
import { UsersService } from '../users/users.service';
import { ItemsService } from '../items/items.service';
import { CreateItemInput } from '../items/dto/inputs';

@Injectable()
export class SeedService {

  private isProd: boolean;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Item)
    private readonly itemsRespository: Repository<Item>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService,
  ) {
    this.isProd = configService.get('STATE') === 'prod';
  }

  async executeSeed(): Promise<boolean> {

    if (this.isProd) {
      throw new ForbiddenException('We cannot run SEED on Prod');
    }
    // Limpiar la base de datos BORRAR TODO
    await this.deleteDatabase();

    // Crear usuarios
    const user = await this.loadUsers();

    // Crear items
    await this.loadItems(user);

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

  async loadUsers(): Promise<User> {

    const users: User[] = [];

    for (const user of SEED_USERS) {
      users.push(await this.usersService.create(user));
    }

    return users[0];

  }

  async loadItems(user: User): Promise<void> {

    const insertPromises = SEED_ITEMS.map(item => this.itemsService.create(item, user))

    await Promise.all(insertPromises);
  }
}
