import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import UsersService from './users.service';
import { UserResponse } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Controller('user')
class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async findUsers() {
    return this.usersService
      .getAllUsers()
      .map((user) => new UserResponse(user));
  }
  @Get(':id')
  async findUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserResponse> {
    return new UserResponse(await this.usersService.getUserById(id));
  }

  @Post()
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @Header('content-type', 'application/json')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    return new UserResponse(await this.usersService.createUser(createUserDto));
  }

  @Put(':id')
  async updateUser(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserResponse> {
    return new UserResponse(
      await this.usersService.updateUserPassword(id, updatePasswordDto),
    );
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}

export default UsersController;
