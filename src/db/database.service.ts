import { Injectable, NotFoundException } from '@nestjs/common';
import Artist from 'src/artists/dto/artists.dto';
import { User } from 'src/users/dto/users.dto';
import IAlbum from 'src/albums/dto/album.dto';
import ITrack from 'src/tracks/dto/tracks.dto';
import Favorite from 'src/favorites/types/favorite.type';
import { UpdatePasswordDto } from 'src/users/dto/update-user.dto';
import UpdateTrackDto from 'src/tracks/dto/update-track.dto';
import UpdateAlbumDto from 'src/albums/dto/update-album.dto';
import UpdateArtistDto from 'src/artists/dto/update-artist.dto';

@Injectable()
export class DataService {
  private users: User[] = [];
  private tracks: ITrack[] = [];
  private artists: Artist[] = [];
  private albums: IAlbum[] = [];
  private favorites: Favorite = {
    artists: [],
    tracks: [],
    albums: [],
  };
  public async getUsers(): Promise<User[]> {
    return this.users;
  }
  public async getUserById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
  public async createUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
  public async updateUserPassword(
    id: string,
    { newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const index = this.users.findIndex((user) => user.id === id);
    const user = this.users[index];
    this.users[index] = {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    return this.users[index];
  }
  public async deleteUser(id: string): Promise<void> {
    const index = this.users.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`User with id ${id} not found`);
    this.users.splice(index, 1);
  }
  public async getArtists(): Promise<Artist[]> {
    return this.artists;
  }
  public async getArtistById(id: string): Promise<Artist | undefined> {
    return this.artists.find((artist) => artist.id == id);
  }
  public async createArtist(newArtist: Artist): Promise<Artist> {
    this.artists.push(newArtist);
    return newArtist;
  }
  public async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const index = this.artists.findIndex((artist) => artist.id === id);
    const newArtist = {
      ...this.artists[index],
      ...updateArtistDto,
    };
    this.artists[index] = newArtist;
    return newArtist;
  }
  public async deleteArtist(id: string): Promise<void> {
    const index = this.artists.findIndex((item) => item.id === id);
    if (index < 0)
      throw new NotFoundException(`Artist with id ${id} not found`);
    this.artists.splice(index, 1);
    const indexInFavorites = this.favorites.artists.findIndex(
      (itemId) => itemId === id,
    );
    if (indexInFavorites !== -1) {
      this.favorites.artists.splice(indexInFavorites, 1);
    }
    this.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
    this.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
  }

  public async addArtistToFavorites(id: string): Promise<boolean> {
    this.favorites.artists.push(id);
    return true;
  }

  public async deleteArtistFromFavorites(id: string): Promise<boolean> {
    const indexInFavorites = this.favorites.artists.findIndex(
      (itemId) => itemId === id,
    );
    if (indexInFavorites === -1)
      throw new NotFoundException(
        `Artist with id ${id} not found in favorite artists`,
      );
    this.favorites.artists.splice(indexInFavorites, 1);
    return true;
  }

  public async getAlbums(): Promise<IAlbum[]> {
    return this.albums;
  }

  public async getAlbumById(id: string): Promise<IAlbum | undefined> {
    return this.albums.find((track) => track.id == id);
  }

  public async createAlbum(newAlbum: IAlbum): Promise<IAlbum> {
    this.albums.push(newAlbum);
    return newAlbum;
  }

  public async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<IAlbum> {
    const index = this.albums.findIndex((album) => album.id === id);
    const newAlbum = {
      ...this.albums[index],
      ...updateAlbumDto,
    };
    this.albums[index] = newAlbum;
    return newAlbum;
  }

  public async deleteAlbum(id: string): Promise<void> {
    const index = this.albums.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Album with id ${id} not found`);
    this.albums.splice(index, 1);

    const indexInFavorites = this.favorites.albums.findIndex(
      (itemId) => itemId === id,
    );
    if (indexInFavorites !== -1) {
      this.favorites.albums.splice(indexInFavorites, 1);
    }

    this.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }

  public async addAlbumToFavorites(id: string): Promise<boolean> {
    this.favorites.albums.push(id);
    return true;
  }

  public async deleteAlbumFromFavorites(id: string): Promise<boolean> {
    const index = this.favorites.albums.findIndex((itemId) => itemId === id);
    if (index < 0)
      throw new NotFoundException(
        `Album with id ${id} not found in favorites albums`,
      );
    this.favorites.albums.splice(index, 1);
    return true;
  }

  public async getTracks(): Promise<ITrack[]> {
    return this.tracks;
  }

  public async getTrackById(id: string): Promise<ITrack | undefined> {
    return this.tracks.find((track) => track.id == id);
  }

  public async createTrack(newTrack: ITrack): Promise<ITrack> {
    this.tracks.push(newTrack);
    return newTrack;
  }

  public async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<ITrack> {
    const index = this.tracks.findIndex((track) => track.id === id);
    const newTrack = {
      ...this.tracks[index],
      ...updateTrackDto,
    };
    this.tracks[index] = newTrack;
    return newTrack;
  }

  public async deleteTrack(id: string): Promise<boolean> {
    const index = this.tracks.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Track with id ${id} not found`);
    this.tracks.splice(index, 1);
    const indexInFavorites = this.favorites.tracks.findIndex(
      (itemId) => itemId === id,
    );
    if (indexInFavorites >= 0) {
      this.favorites.tracks.splice(indexInFavorites, 1);
      return true;
    }
  }

  public async addTrackToFavorites(id: string): Promise<boolean> {
    this.favorites.tracks.push(id);
    return true;
  }

  public async deleteTrackFromFavorites(id: string): Promise<boolean> {
    const index = this.favorites.tracks.findIndex((itemId) => itemId === id);
    if (index < 0)
      throw new NotFoundException(
        `Track with id ${id} not found in favorites tracks`,
      );
    this.favorites.tracks.splice(index, 1);
    return true;
  }

  public async getFavorites(): Promise<Favorite> {
    return this.favorites;
  }
}
