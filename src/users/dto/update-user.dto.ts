import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ type: 'string' })
  @IsDefined()
  @IsNotEmpty()
  oldPassword: string;
  @ApiProperty({ type: 'string' })
  @IsDefined()
  @IsNotEmpty()
  newPassword: string;
}
