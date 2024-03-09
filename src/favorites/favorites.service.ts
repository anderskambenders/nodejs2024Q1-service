import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import Favorite from './types/favorite.type';
import FavoriteResponseDto from './dto/favorites.dto';
import TracksService from 'src/tracks/tracks.service';
import AlbumsService from 'src/albums/albums.service';
import ArtistsService from 'src/artists/artists.service';

@Injectable()
class FavoritesService {
  private favorites: Favorite = new Favorite();
  @Inject(TracksService)
  private readonly tracksService: TracksService;
  @Inject(AlbumsService)
  private readonly albumsService: AlbumsService;
  @Inject(ArtistsService)
  private readonly artistsService: ArtistsService;

  removeTrack(id: string) {
    const o = this.favorites.tracks.find((p) => p === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    this.favorites.tracks = this.favorites.tracks.filter((item) => item !== id);
  }

  removeAlbum(id: string) {
    const o = this.favorites.albums.find((p) => p === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    this.favorites.albums = this.favorites.albums.filter(
      (item) => item !== id && item !== null,
    );
  }

  removeAlbumIfExist(id: string) {
    const o = this.favorites.albums.find((p) => p === id);
    if (o === undefined) return;
    this.favorites.albums = this.favorites.albums.filter(
      (item) => item !== id && item !== null,
    );
  }

  removeArtist(id: string) {
    const o = this.favorites.artists.find((p) => p === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    this.favorites.artists = this.favorites.artists.filter(
      (item) => item !== id && item !== null,
    );
  }

  findOne(id: string) {
    return this.tracksService.tracks.find((p) => p.id === id);
  }

  addTrack(id: string) {
    if (this.tracksService.tracks.find((p) => p.id === id) === undefined) {
      throw new HttpException(
        'Track is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const o = this.favorites.tracks.find((p) => p === id);
    if (o !== undefined)
      throw new HttpException(
        'Track is already in favorites',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this.favorites.tracks.push(id);
  }

  addArtist(id: string) {
    if (this.artistsService.getArtistById(id) === undefined) {
      throw new HttpException(
        'Artist is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const o = this.favorites.artists.find((p) => p === id);
    if (o !== undefined)
      throw new HttpException(
        'Track is already in artists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    this.favorites.artists.push(id);
  }

  addAlbum(id: string) {
    if (this.albumsService.getAlbumById(id) === undefined) {
      throw new HttpException(
        'Album is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const o = this.favorites.albums.find((p) => p === id);
    if (o !== undefined)
      throw new HttpException(
        'Track is already in albums',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    this.favorites.albums.push(id);
  }

  async findAll(): Promise<FavoriteResponseDto> {
    const result = new FavoriteResponseDto();
    this.favorites.albums.forEach(async (o) => {
      const x = this.albumsService.getAlbumById(o);
      if (x !== null && x !== undefined) result.albums.push(await x);
    });
    result.artists = [];
    this.favorites.artists.forEach(async (o) => {
      const x = this.artistsService.getArtistById(o);
      if (x !== null && x !== undefined) result.artists.push(await x);
    });

    result.tracks = [];
    this.favorites.tracks.forEach(async (o) => {
      const x = this.tracksService.getTrackById(o);
      if (x !== null && x !== undefined) result.tracks.push(await x);
    });

    return result;
  }
}

export default FavoritesService;
