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
import { UserResponse } from './dto/users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ description: 'All founded.' })
  async findUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @ApiOkResponse({
    type: UserResponse,
    description: 'Get successfully proceed.',
  })
  @ApiNotFoundResponse({ description: 'User with id:{id} not found.' })
  async findUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.getUserById(id);
    if (user) return user;
    throw new NotFoundException(`User with id ${id} not found`);
  }

  @Post()
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @Header('content-type', 'application/json')
  @ApiBadRequestResponse({ description: 'Body is incorrect.' })
  @ApiCreatedResponse({
    type: UserResponse,
    description: 'The record has been successfully created.',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto);
    if (newUser) return newUser;
    throw new InternalServerErrorException('Something went wrong');
  }

  @Put(':id')
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiOkResponse({ type: UserResponse, description: 'User password updated.' })
  async updateUser(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const userToUpdate = await this.usersService.updateUserPassword(
      id,
      updatePasswordDto,
    );
    if (userToUpdate) return userToUpdate;
    throw new NotFoundException(`User with id ${id} not found`);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiNoContentResponse({ description: 'User deleted.' })
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}

export default UsersController;
