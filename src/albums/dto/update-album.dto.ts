import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsUUID } from 'class-validator';

class UpdateAlbumDto {
  @IsOptional()
  @ApiProperty({ type: 'string' })
  name: string;
  @IsOptional()
  @IsInt()
  @ApiProperty({ type: 'integer' })
  year: number;
  @IsOptional()
  @IsUUID()
  @ApiProperty({ type: 'string' })
  artist?: string | null;
}

export default UpdateAlbumDto;
