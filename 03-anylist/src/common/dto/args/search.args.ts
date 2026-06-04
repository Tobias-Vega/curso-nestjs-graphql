import { ArgsType, Field } from "@nestjs/graphql";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

@ArgsType()
export class SearchArgs {

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  search?: string;

}