import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Injectable()
class UsersService {
  private users: User[] = [];

  public getAllUsers(): User[] {
    return this.users;
  }
  public async getUserById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    if (user) return user;
    throw new NotFoundException(`User with id ${id} not found`);
  }

  public async createUser(user: CreateUserDto): Promise<User> {
    const newUser = {
      ...user,
      id: v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  public async updateUserPassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const index = this.users.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`User with id ${id} not found`);
    const user = this.users[index];
    if (user.password !== oldPassword) {
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
    }
    this.users[index] = {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    return this.users[index];
  }

  public async deleteUser(id: string): Promise<void> {
    const index = this.users.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`User with id ${id} not found`);
    this.users.splice(index, 1);
  }
}

export default UsersService;
