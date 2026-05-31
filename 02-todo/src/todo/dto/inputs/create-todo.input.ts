import { Field, InputType } from "@nestjs/graphql";
import { IsString, MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateTodoInput {
  @Field(() => String, {
    description: 'What needs to be done'
  })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  description: string;
}