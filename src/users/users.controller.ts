import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
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
    return (await this.usersService.getAllUsers()).map(
      (user) => new UserResponse(user),
    );
  }
  @Get(':id')
  async findUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserResponse> {
    const user = await this.usersService.getUserById(id);
    if (user) return user;
    throw new NotFoundException(`User with id ${id} not found`);
  }

  @Post()
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @Header('content-type', 'application/json')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    const newUser = await this.usersService.createUser(createUserDto);
    if (newUser) return new UserResponse(newUser);
    throw new InternalServerErrorException('Something went wrong');
  }

  @Put(':id')
  async updateUser(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserResponse> {
    const userToUpdate = await this.usersService.updateUserPassword(
      id,
      updatePasswordDto,
    );
    if (userToUpdate) return new UserResponse(userToUpdate);
    throw new NotFoundException(`User with id ${id} not found`);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}

export default UsersController;
