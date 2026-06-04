import { InputType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsUUID, Max, Min } from 'class-validator';

@InputType()
export class CreateListItemInput {

  @Field(() => Number, {
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1000)
  quantity: number = 0;

  @Field(() => Boolean, {
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  completed: boolean = false;

  @Field(() => ID)
  @IsUUID()
  listId: string;

  @Field(() => ID)
  @IsUUID()
  itemId: string;

}
