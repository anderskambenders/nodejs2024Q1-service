import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

class UpdateTrackDto {
  @ApiProperty({ type: 'string' })
  name?: string;
  @IsInt()
  @ApiProperty({ type: 'integer' })
  duration?: number;
  @ApiProperty({ type: 'string' })
  artistId?: string | null;
  @ApiProperty({ type: 'string' })
  albumId?: string | null;
}

export default UpdateTrackDto;
