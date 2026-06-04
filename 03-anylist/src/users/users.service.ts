import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User } from './entities/user.entity';
import { SignupInput } from '../auth/dto/input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidRoles } from '../auth/enums/valid-roles.enums';
import { PaginationArgs, SearchArgs } from '../common/dto/args';

@Injectable()
export class UsersService {

  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(signUpInput: SignupInput): Promise<User> {

    try {

      const newUser = this.usersRepository.create({
        ...signUpInput,
        password: bcrypt.hashSync(signUpInput.password, 10),
      });

      return await this.usersRepository.save(newUser);

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(roles: ValidRoles[], paginationArgs: PaginationArgs, searchArgs: SearchArgs): Promise<User[]> {

    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    const queryBuilder = this.usersRepository.createQueryBuilder()
      .take(limit)
      .skip(offset)
      .orderBy('full_name', 'ASC');

    if (search) {
      queryBuilder.andWhere(`full_name ilike :fullName`, { fullName: `%${search}%` });
    }

    if (roles.length > 0) {
      queryBuilder.andWhere('ARRAY[roles] && ARRAY[:...roles]', { roles });
    }

    return queryBuilder.getMany();
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ email });
    } catch (error) {
      this.handleDBErrors({
        code: 'error-001',
        detail: `${email} not found`
      });
    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`${id} not found`);
    }
  }

  async update(id: string, updateUserInput: UpdateUserInput, updateBy: User): Promise<User> {

    try {
      const user = await this.usersRepository.preload({
        ...updateUserInput,
        id
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.lastUpdateBy = updateBy;

      return await this.usersRepository.save(user);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async block(id: string, adminUser: User): Promise<User> {

    const userToBlock = await this.findOneById(id);

    userToBlock.isActive = false;
    userToBlock.lastUpdateBy = adminUser;

    return await this.usersRepository.save(userToBlock);

  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new ConflictException(error.detail.replace('Key', ''));
    }

    if (error.code === 'error-001') {
      throw new NotFoundException(error.detail);
    }

    this.logger.error(error);

    throw new InternalServerErrorException('Unexpected errors - Please check server logs');
  }
}
