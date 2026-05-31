import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, MinLength } from "class-validator";

@InputType()
export class SigninInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @MinLength(6)
  @IsString()
  password: string;
}