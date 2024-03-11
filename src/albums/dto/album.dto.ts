import { ApiProperty } from '@nestjs/swagger';

class Album {
  @ApiProperty({ type: 'string' })
  id: string;
  @ApiProperty({ type: 'string' })
  name: string;
  @ApiProperty({ type: 'integer' })
  year: number;
  @ApiProperty({ type: 'string' })
  artistId: string | null;
}

export default Album;
