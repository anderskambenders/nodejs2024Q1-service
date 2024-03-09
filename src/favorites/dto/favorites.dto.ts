import IAlbum from 'src/albums/types/album.interface';
import IArtist from 'src/artists/types/artists.interface';
import ITrack from 'src/tracks/types/tracks.interface';

class FavoriteResponseDto {
  artists: IArtist[] = [];
  albums: IAlbum[] = [];
  tracks: ITrack[] = [];
}

export default FavoriteResponseDto;
