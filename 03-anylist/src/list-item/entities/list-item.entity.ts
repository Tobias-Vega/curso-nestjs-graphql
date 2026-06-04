import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { List } from '../../lists/entities/list.entity';
import { Item } from '../../items/entities/item.entity';

@Entity({ name: 'list_items' })
@ObjectType()
export class ListItem {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('numeric')
  @Field(() => Number)
  quantity: number;

  @Column('boolean')
  @Field(() => Boolean)
  completed: boolean;

  list: List;

  item: Item;

}
