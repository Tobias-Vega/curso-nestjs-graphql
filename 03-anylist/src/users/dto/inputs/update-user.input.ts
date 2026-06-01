import { IsArray, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { ValidRoles } from '../../../auth/enums/valid-roles.enums';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  @IsUUID()
  id: string;

  @Field(() => ValidRoles, {
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  roles?: ValidRoles[];

  @Field(() => Boolean, {
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
