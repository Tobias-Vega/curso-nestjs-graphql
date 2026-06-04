import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListInput, UpdateListInput } from './dto/inputs';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Repository } from 'typeorm';
import { PaginationArgs, SearchArgs } from '../common/dto/args';

@Injectable()
export class ListsService {

  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  async create(createListInput: CreateListInput, user: User): Promise<List> {
    const newList = this.listRepository.create({
      ...createListInput,
      user,
    });

    return await this.listRepository.save(newList);
  }

  findAll(user: User, paginationsArgs: PaginationArgs, searchArgs: SearchArgs): Promise<List[]> {

    const { limit, offset } = paginationsArgs;
    const { search } = searchArgs;

    
    const queryBuilder = this.listRepository.createQueryBuilder('items')
      .take(limit)
      .skip(offset)
      .where(`"userId" = :userId`, { userId: user.id });

    if (search) {
      queryBuilder
        .andWhere(`name ILIKE :name`, { name: `%${search}%` });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string, user: User): Promise<List> {
    const list = await this.listRepository.findOneBy({
      id,
      user: {
        id: user.id,
      }
    });

    if (!list) throw new NotFoundException('List not found');

    return list;
  }

  async update(id: string, updateListInput: UpdateListInput, user: User): Promise<List> {

    await this.findOne(id, user);

    const list = await this.listRepository.preload(updateListInput)

    if (!list) throw new NotFoundException("List not found"); 

    return this.listRepository.save(list);
  }

  async remove(id: string, user: User): Promise<List> {
    const list = await this.findOne(id, user);

    await this.listRepository.delete(id);

    return { ...list, id }
  }

  async listCountByUser(user: User): Promise<number> {
    return this.listRepository.count({
      where: {
        user: {
          id: user.id,
        }
      }
    })
  } 
}
