import { InputType, Field, Float } from '@nestjs/graphql';
import { IsOptional, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateItemInput {
  @Field(() => String)
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  name: string;

  @Field(() => Float)
  @IsPositive()
  quantity: number;

  @Field(() => String, {
    nullable: true,
  })
  @IsOptional()
  @IsString()
  quantityUnits?: string;
}
