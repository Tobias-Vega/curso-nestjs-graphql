import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsOptional, Max, Min } from "class-validator";


@ArgsType()
export class PaginationArgs {

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @Min(0)
  offset: number;

  @Field(() => Int, { nullable: true, defaultValue: 10 })

  @Min(1)
  @Max(30)
  limit: number;

}