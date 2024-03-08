import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import UsersService from './users.service';
import IUser from './types/users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Controller('user')
class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async findUsers() {
    return this.usersService.getAllUsers();
  }
  @Get(':id')
  async findUser(@Param('id', ParseUUIDPipe) id: string): Promise<IUser> {
    return this.usersService.getUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return await this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IUser> {
    return this.usersService.updateUserPassword(id, updatePasswordDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}

export default UsersController;
