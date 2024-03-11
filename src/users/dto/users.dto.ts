import { ApiProperty } from '@nestjs/swagger';

export class User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export class UserResponse {
  @ApiProperty({ type: 'string' })
  id: string;
  @ApiProperty({ type: 'string' })
  login: string;
  @ApiProperty({ type: 'integer' })
  version: number;
  @ApiProperty({ type: 'integer' })
  createdAt: number;
  @ApiProperty({ type: 'integer' })
  updatedAt: number;

  constructor(user: User) {
    this.id = user.id;
    this.login = user.login;
    this.version = user.version;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
