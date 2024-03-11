import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsOptional, IsUUID } from 'class-validator';
class CreateAlbumDto {
  @IsDefined()
  @ApiProperty({ type: 'string' })
  name: string;
  @IsDefined()
  @IsInt()
  @ApiProperty({ type: 'integer' })
  year: number;
  @IsOptional()
  @IsUUID()
  @ApiProperty({ type: 'string' })
  artist?: string | null;
}

export default CreateAlbumDto;
