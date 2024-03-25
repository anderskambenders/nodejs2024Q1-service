import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
// import { v4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

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
    const userToDb = await this.prismaDB.user.create({ data: user });
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
    const user = await this.prismaDB.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    await this.prismaDB.user.delete({
      where: { id },
    });
  }
  formatUser(user: User) {
    const newUser = Object.fromEntries(
      Object.entries(user).filter(([key]) => !['password'].includes(key)),
    );
    return {
      ...newUser,
      createdAt: new Date(newUser.createdAt).getTime(),
      updatedAt: new Date(newUser.updatedAt).getTime(),
    };
  }
}

export default UsersService;
