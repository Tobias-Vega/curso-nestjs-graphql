import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ListItem } from '../../list-item/entities/list-item.entity';

@Entity({ name: 'items' })
@ObjectType()
export class Item {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('varchar')
  @Field(() => String)
  name: string;

  // @Column('float')
  // @Field(() => Float)
  // quantity: number;

  @Column('varchar')
  @Field(() => String)
  category: string;

  @Column('varchar', {
    nullable: true,
  })
  @Field(() => String, {
    nullable: true,
  })
  quantityUnits: string // g, ml, kg, tsp

  @ManyToOne(() => User, (user) => user.items, {
    nullable: false,
    lazy: true,
  })
  @Index('user_id_index')
  @Field(() => User)
  user: User;

  @OneToMany(() => ListItem, (listItems) => listItems.item, { lazy: true })
  @Field(() => [ListItem])
  listItems: ListItem[];
}
