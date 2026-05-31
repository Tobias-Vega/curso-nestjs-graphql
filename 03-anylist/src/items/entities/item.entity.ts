import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'items' })
@ObjectType()
export class Item {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('varchar')
  @Field(() => String)
  name: string;

  @Column('float')
  @Field(() => Float)
  quantity: number;

  @Column('varchar')
  @Field(() => String)
  quantityUnits: string // g, ml, kg, tsp

}
