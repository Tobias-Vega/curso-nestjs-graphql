import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsInt, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

@InputType()
export class UpdateTodoInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => String, {
    description: 'What needs to be done',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  description?: string;

  @Field(() => Boolean, {
    nullable: true
  })
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}