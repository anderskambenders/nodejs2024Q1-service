import { Injectable } from '@nestjs/common';
import FavoriteResponseDto from './dto/favorites.dto';
import { DataService } from '../prisma/prisma.service';

@Injectable()
class FavoritesService {
  constructor(private dataService: DataService) {}

  async removeTrack(id: string) {
    const track = await this.dataService.getTrackById(id);
    if (!track) return;
    await this.dataService.deleteTrackFromFavorites(id);
    return true;
  }

  async removeAlbum(id: string) {
    const album = await this.dataService.getAlbumById(id);
    if (!album) return undefined;
    await this.dataService.deleteAlbumFromFavorites(id);
    return true;
  }

  async removeArtist(id: string) {
    const artist = await this.dataService.getArtistById(id);
    if (!artist) return undefined;
    await this.dataService.deleteArtistFromFavorites(id);
    return true;
  }

  async addTrack(id: string) {
    const track = await this.dataService.getTrackById(id);
    return track ? this.dataService.addTrackToFavorites(id) : false;
  }

  async addArtist(id: string) {
    const artist = await this.dataService.getArtistById(id);
    return artist ? this.dataService.addArtistToFavorites(id) : false;
  }

  async addAlbum(id: string) {
    const album = await this.dataService.getAlbumById(id);
    return album ? this.dataService.addAlbumToFavorites(id) : false;
  }

  async getAll(): Promise<FavoriteResponseDto> {
    const {
      artists: artistsIds,
      tracks: tracksIds,
      albums: albumsIds,
    } = await this.dataService.getFavorites();
    return {
      artists: await Promise.all(
        artistsIds.map(async (id) => this.dataService.getArtistById(id)),
      ),
      tracks: await Promise.all(
        tracksIds.map(async (id) => this.dataService.getTrackById(id)),
      ),
      albums: await Promise.all(
        albumsIds.map(async (id) => this.dataService.getAlbumById(id)),
      ),
    };
  }
}

export default FavoritesService;
