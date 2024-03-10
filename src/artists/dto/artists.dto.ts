import { ApiProperty } from '@nestjs/swagger';

class Artist {
  @ApiProperty({ type: 'string' })
  id: string;
  @ApiProperty({ type: 'string' })
  name: string;
  @ApiProperty({ type: 'boolean' })
  grammy: boolean;
}

export default Artist;
