import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

function excludeField(object: Record<string, any>, keys: string[]) {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key)),
  );
}

@Injectable()
class UsersService {
  constructor(private prismaDB: PrismaService) {}

  public async getAllUsers() {
    const users = await this.prismaDB.user.findMany();
    return users.map((user) => this.formatUser(user));
  }

  public async getUserById(id: string) {
    const user = await this.prismaDB.user.findUnique({
      where: { id },
    });
    if (user) {
      return this.formatUser(user);
    } else {
      return;
    }
  }

  public async createUser(user: CreateUserDto) {
    const newUser = {
      ...user,
      id: v4(),
      version: 1,
      createdAt: String(Date.now()),
      updatedAt: String(Date.now()),
    };
    const userToDb = await this.prismaDB.user.create({ data: newUser });
    return this.formatUser(userToDb);
  }

  public async updateUserPassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const user = await this.prismaDB.user.findUnique({
      where: { id },
    });
    if (!user) return;
    if (user.password === oldPassword) {
      const updatedUser = await this.prismaDB.user.update({
        where: { id },
        data: {
          password: newPassword,
          version: {
            increment: 1,
          },
        },
      });
      return this.formatUser(updatedUser);
    }
    throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.dataService.deleteUser(id);
  }
  formatUser(user: User) {
    const newUser = excludeField(user, ['password']);
    return {
      ...newUser,
      createdAt: new Date(newUser.createdAt).getTime(),
      updatedAt: new Date(newUser.updatedAt).getTime(),
    };
  }
}

export default UsersService;
