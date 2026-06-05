import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../items/entities/item.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { SEED_ITEMS, SEED_LISTS, SEED_USERS } from './data/seed-data';
import { UsersService } from '../users/users.service';
import { ItemsService } from '../items/items.service';
import { ListItem } from '../list-item/entities/list-item.entity';
import { ListItemService } from '../list-item/list-item.service';
import { List } from '../lists/entities/list.entity';
import { ListsService } from '../lists/lists.service';

@Injectable()
export class SeedService {

  private isProd: boolean;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Item)
    private readonly itemsRespository: Repository<Item>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>,
    @InjectRepository(List)
    private readonly listsRepository: Repository<List>,

    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService,
    private readonly listItemsService: ListItemService,
    private readonly listsService: ListsService,
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

    // crear listas
    const list = await this.loadLists(user);

    // crear listItems

    const items = await this.itemsService.findAll(user, { limit: 15, offset: 0 }, {});
    await this.loadListItems(list, items);

    return true;
  }

  async deleteDatabase() {

    // borrar listItems
    await this.listItemRepository.createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // borrar listas
    await this.listsRepository.createQueryBuilder()
      .delete()
      .where({})
      .execute();

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

  async loadLists(user: User): Promise<List> {
    const lists: List[] = [];

    for (const list of SEED_LISTS) {
      lists.push(await this.listsService.create(list, user));
    }

    return lists[0];
  }

  async loadListItems(list: List, items: Item[]): Promise<void> {
    
    for (const item of items) {
      await this.listItemsService.create({
        quantity: Math.round(Math.random() * 10),
        completed: Math.round(Math.random() * 1) === 0 ? false : true,
        listId: list.id,
        itemId: item.id,
      })
    }

  }
}
