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
  name: string;
  @IsDefined()
  @IsNotEmpty()
  @IsInt()
  duration: number;
  @IsOptional()
  @IsUUID()
  artistId?: string | null;
  @IsOptional()
  @IsUUID()
  albumId?: string | null;
}

export default CreateTrackDto;
