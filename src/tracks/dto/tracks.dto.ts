import { ApiProperty } from '@nestjs/swagger';

class Track {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({ type: 'string', example: '"Archangel"' })
  name: string;
  @ApiProperty({
    type: 'string',
  })
  artistId: string | null;
  @ApiProperty({
    type: 'string',
  })
  albumId: string | null;
  @ApiProperty({ type: 'string', example: 131 })
  duration: number;
}

export default Track;
