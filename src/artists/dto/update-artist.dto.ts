import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

class UpdateArtistDto {
  @IsOptional()
  @ApiProperty({ type: 'string' })
  name: string;
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ type: 'boolean' })
  grammy: boolean;
}

export default UpdateArtistDto;
