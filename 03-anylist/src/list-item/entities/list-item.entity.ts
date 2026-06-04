import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { List } from '../../lists/entities/list.entity';
import { Item } from '../../items/entities/item.entity';

@Entity({ name: 'list_items' })
@Unique('listItem-item', ['list', 'item'])
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

  @ManyToOne(() => List, (list) => list.listItems, { lazy: true, nullable: false })
  @Field(() => List)
  list: List;

  @ManyToOne(() => Item, (item) => item.listItems, { lazy: true, nullable: false })
  @Field(() => Item)
  item: Item;

}
