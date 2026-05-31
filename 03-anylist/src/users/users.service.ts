import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { SignUpInput } from '../auth/dto/input/signup.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(signUpInput: SignUpInput): Promise<User> {

    try {
      const newUser = this.usersRepository.create(signUpInput);
  
      return await this.usersRepository.save(newUser);

    } catch(error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  findOne(id: string): Promise<User> {
    throw new Error('Method not implemented');
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block(id: string): Promise<User> {
    throw new Error('Method not implemented');
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new ConflictException(error.detail.replace('Key', ''));
    }
    
    this.logger.error(error);

    throw new InternalServerErrorException('Unexpected errors - Please check server logs');
  }
}
