import { InputType, Field } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateListInput {
  @Field(() => String)
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  name: string;
}
