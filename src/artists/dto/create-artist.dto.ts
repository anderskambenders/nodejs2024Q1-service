import { IsBoolean, IsDefined } from 'class-validator';

class CreateArtistDto {
  @IsDefined()
  name: string;
  @IsDefined()
  @IsBoolean()
  grammy: boolean;
}

export default CreateArtistDto;
