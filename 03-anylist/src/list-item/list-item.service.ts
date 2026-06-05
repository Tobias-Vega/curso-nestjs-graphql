import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListItemInput } from './dto/inputs/create-list-item.input';
import { UpdateListItemInput } from './dto/inputs/update-list-item.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ListItem } from './entities/list-item.entity';
import { Repository } from 'typeorm';
import { List } from '../lists/entities/list.entity';
import { PaginationArgs, SearchArgs } from '../common/dto/args';

@Injectable()
export class ListItemService {

  constructor(
    @InjectRepository(ListItem)
    private readonly listItemsRepository: Repository<ListItem>,
  ) {}

  async create(createListItemInput: CreateListItemInput): Promise<ListItem> {

    const { itemId, listId, ...rest } = createListItemInput

    const newListItem = this.listItemsRepository.create({
      ...rest,
      item: { id: itemId },
      list: { id: listId },
    });

    return await this.listItemsRepository.save(newListItem);
  }

  async findAll(list: List, paginationArgs: PaginationArgs, searchArgs: SearchArgs): Promise<ListItem[]> {

    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    const queryBuilder = this.listItemsRepository.createQueryBuilder('listItem')
    .innerJoin('listItem.item', 'item')
    .take(limit)
    .skip(offset)
    .where(`"listId" = :listId`, { listId: list.id });

    if (search) {
      queryBuilder.andWhere('item.name ilike :name', { name: `%${search}%` });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: string): Promise<ListItem> {
    const listItem = await this.listItemsRepository.findOneBy({ id });

    if (!listItem) throw new NotFoundException('ListItem not found');

    return listItem;
  }
  

  async update(id: string, updateListItemInput: UpdateListItemInput): Promise<ListItem> {

    const { listId, itemId, ...rest } = updateListItemInput

    const queryBuilder = this.listItemsRepository.createQueryBuilder()
    .update()
    .set({
      ...rest,
      ...(listId && { list: { id: listId } }),
      ...(itemId && { item: { id: itemId } })
    })
    .where('id = :id', { id })
    .execute();

    return this.findOne(id);

  }

  remove(id: number) {
    return `This action removes a #${id} listItem`;
  }

  async countListItemsByList(list: List): Promise<number> {
    return this.listItemsRepository.count({
      where: {
        list: {
          id: list.id,
        }
      }
    });
  }
}
