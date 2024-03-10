import IAlbum from 'src/albums/dto/album.dto';
import IArtist from 'src/artists/dto/artists.dto';
import ITrack from 'src/tracks/dto/tracks.dto';

class FavoriteResponseDto {
  artists: IArtist[] = [];
  albums: IAlbum[] = [];
  tracks: ITrack[] = [];
}

export default FavoriteResponseDto;
