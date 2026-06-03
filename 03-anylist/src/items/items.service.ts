import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput } from './dto/inputs/create-item.input';
import { UpdateItemInput } from './dto/inputs/update-item.input';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ItemsService {

  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemInput: CreateItemInput, user: User): Promise<Item> {
    const newItem = this.itemRepository.create({
      ...createItemInput,
      user,
    });

    return await this.itemRepository.save(newItem);
  }

  async findAll(): Promise<Item[]> {
    // TODO: filtrar, paginar, por usuario...
    return await this.itemRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    const item  = await this.itemRepository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException(`Item with id: ${id} not found`);

    }
    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item>  {
    
    const item = await this.itemRepository.preload(updateItemInput);

    if (!item) throw new NotFoundException(`Item with id: ${id} not found`);
    
    return this.itemRepository.save(item);
  }

  async remove(id: string): Promise<Item> {
    // TODO: soft delete, integridad referencial
    const item = await this.findOne(id);
    const { affected } = await this.itemRepository.delete(id);

    if (affected === 0) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return { ...item, id };
  }
}
