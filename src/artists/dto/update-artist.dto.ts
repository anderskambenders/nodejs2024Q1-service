import { IsBoolean, IsOptional } from 'class-validator';

class UpdateArtistDto {
  @IsOptional()
  name: string;
  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}

export default UpdateArtistDto;
