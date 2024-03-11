import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

class CreateTrackDto {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: '"Down with the sickness"' })
  name: string;
  @IsDefined()
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ type: 'integer', example: 186 })
  duration: number;
  @IsOptional()
  @IsUUID()
  @ApiProperty({ type: 'string' })
  artistId?: string | null;
  @IsOptional()
  @IsUUID()
  @ApiProperty({ type: 'string' })
  albumId?: string | null;
}

export default CreateTrackDto;
