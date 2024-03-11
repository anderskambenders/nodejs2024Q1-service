import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined } from 'class-validator';

class CreateArtistDto {
  @IsDefined()
  @ApiProperty({ type: 'string' })
  name: string;
  @IsDefined()
  @IsBoolean()
  @ApiProperty({ type: 'boolean' })
  grammy: boolean;
}

export default CreateArtistDto;
