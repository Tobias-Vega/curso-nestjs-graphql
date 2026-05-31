import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

@InputType()
export class SignupInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  fullName: string;

  @Field(() => String)
  @MinLength(6)
  @IsString()
  password: string;
}