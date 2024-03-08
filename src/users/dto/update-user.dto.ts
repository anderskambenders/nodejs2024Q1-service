import { IsDefined, IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsDefined()
  @IsNotEmpty()
  oldPassword: string;
  @IsDefined()
  @IsNotEmpty()
  newPassword: string;
}
