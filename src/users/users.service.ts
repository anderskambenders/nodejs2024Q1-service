import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { DataService } from 'src/db/database.service';

@Injectable()
class UsersService {
  constructor(private dataService: DataService) {}

  public getAllUsers(): Promise<User[]> {
    return this.dataService.getUsers();
  }
  public async getUserById(id: string): Promise<User> {
    const user = await this.dataService.getUserById(id);
    if (user) {
      return user;
    } else {
      return;
    }
  }

  public async createUser(user: CreateUserDto): Promise<User> {
    const newUser = {
      ...user,
      id: v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.dataService.createUser(newUser);
    return newUser;
  }

  public async updateUserPassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.dataService.getUserById(id);
    if (!user) return;
    if (user.password === oldPassword) {
      const updatedUser = await this.dataService.updateUserPassword(id, {
        oldPassword,
        newPassword,
      });
      return updatedUser;
    }
    throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.dataService.deleteUser(id);
  }
}

export default UsersService;
