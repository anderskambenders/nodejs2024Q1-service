import IAlbum from '../../albums/dto/album.dto';
import IArtist from '../../artists/dto/artists.dto';
import ITrack from '../../tracks/dto/tracks.dto';

class FavoriteResponseDto {
  artists: IArtist[] = [];
  albums: IAlbum[] = [];
  tracks: ITrack[] = [];
}

export default FavoriteResponseDto;
