import { IsDefined, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsNotEmpty()
  login: string;
  @IsNotEmpty()
  @IsDefined()
  password: string;
}
