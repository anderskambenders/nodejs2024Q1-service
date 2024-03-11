import { IsArray } from 'class-validator';

class Favorite {
  @IsArray()
  artists: string[] = [];
  @IsArray()
  albums: string[] = [];
  @IsArray()
  tracks: string[] = [];
}

export default Favorite;
