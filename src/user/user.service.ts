import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import * as bcrypt from 'bcrypt';
import { UpdatedPasswordDto } from './dtos/updated-password.dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async list(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Not found user with this ${id} id`);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(`Not found user with this ${email} email`);
    }
    return user;
  }

  async findUserWithRelations(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        adresses: {
          city: {
            state: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`Not found user with this ${id} id`);
    }
    return user;
  }

  async create(user: CreateUserDto) {
    const { email, password } = user;
    const emailExists = await this.usersRepository.count({
      where: {
        email,
      },
    });
    if (emailExists === 1) {
      throw new ConflictException(`User with email ${email} already exists`);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    user.password = passwordHash;

    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async updatedPassword(
    { oldPassword, newPassword }: UpdatedPasswordDto,
    id: number,
  ) {
    const user = await this.findUserById(id);

    const verifyOldPassowrd = await bcrypt.compare(oldPassword, user.password);

    if (!verifyOldPassowrd) {
      throw new ForbiddenException('Old password invalid!');
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    return await this.usersRepository.save({ ...user, password: passwordHash });
  }
}
