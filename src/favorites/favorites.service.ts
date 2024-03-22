import { Injectable } from '@nestjs/common';
import FavoriteResponseDto from './dto/favorites.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
class FavoritesService {
  constructor(private prismaDB: PrismaService) {}

  async removeTrack(id: string) {
    const track = await this.prismaDB.track.findUnique({ where: { id } });
    if (!track) return;
    await this.prismaDB.track.update({
      where: { id },
      data: { isFavorite: false },
    });
    return true;
  }

  async removeAlbum(id: string) {
    const album = await this.prismaDB.album.findUnique({ where: { id } });
    if (!album) return;
    await this.prismaDB.album.update({
      where: { id },
      data: { isFavorite: false },
    });
    return true;
  }

  async removeArtist(id: string) {
    const artist = await this.prismaDB.artist.findUnique({ where: { id } });
    if (!artist) return;
    await this.prismaDB.artist.update({
      where: { id },
      data: { isFavorite: false },
    });
    return true;
  }

  async addTrack(id: string) {
    const track = await this.prismaDB.track.findUnique({ where: { id } });
    return track
      ? this.prismaDB.track.update({
          where: { id },
          data: { isFavorite: true },
        })
      : false;
  }

  async addArtist(id: string) {
    const artist = await this.prismaDB.artist.findUnique({ where: { id } });
    return artist
      ? this.prismaDB.artist.update({
          where: { id },
          data: { isFavorite: true },
        })
      : false;
  }

  async addAlbum(id: string) {
    const album = await this.prismaDB.album.findUnique({ where: { id } });
    return album
      ? this.prismaDB.album.update({
          where: { id },
          data: { isFavorite: true },
        })
      : false;
  }

  async getAll(): Promise<FavoriteResponseDto> {
    const tracks = await this.prismaDB.track.findMany({
      where: { isFavorite: true },
    });
    const albums = await this.prismaDB.album.findMany({
      where: { isFavorite: true },
    });
    const artists = await this.prismaDB.artist.findMany({
      where: { isFavorite: true },
    });
    return {
      tracks: this.formatResult(tracks),
      albums: this.formatResult(albums),
      artists: this.formatResult(artists),
    };
  }

  formatResult(array) {
    return array.map((item) =>
      Object.fromEntries(
        Object.entries(item).filter(([key]) => !['isFavorite'].includes(key)),
      ),
    );
  }
}

export default FavoritesService;
