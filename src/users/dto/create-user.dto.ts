import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: 'string' })
  @IsDefined()
  @IsNotEmpty()
  login: string;
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsDefined()
  password: string;
}
