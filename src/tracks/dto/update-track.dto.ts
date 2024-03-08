import { IsInt } from 'class-validator';

class UpdateTrackDto {
  name?: string;
  @IsInt()
  duration?: number;
  artistId?: string | null;
  albumId?: string | null;
}

export default UpdateTrackDto;
