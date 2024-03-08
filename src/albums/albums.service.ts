import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import CreateAlbumDto from './dto/create-album.dto';
import UpdateAlbumDto from './dto/update-album.dto';
import IAlbum from './types/album.interface';

@Injectable()
class AlbumsService {
  private albums: IAlbum[] = [];
  public async getAlbums(): Promise<IAlbum[]> {
    return this.albums;
  }

  public async getAlbumById(id: string): Promise<IAlbum> {
    const album = this.albums.find((album) => album.id === id);
    if (album) return album;
    throw new NotFoundException(`Album with id ${id} not found`);
  }

  public async createAlbum(album: CreateAlbumDto): Promise<IAlbum> {
    const newAlbum = {
      id: v4(),
      artistId: null,
      ...album,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  public async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<IAlbum> {
    const index = this.albums.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Album with id ${id} not found`);

    const album = this.albums[index];
    album[index] = {
      ...album,
      ...updateAlbumDto,
    };
    return album[index];
  }

  public async deleteAlbum(id: string): Promise<void> {
    const index = this.albums.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Album with id ${id} not found`);
    this.albums.splice(index, 1);
  }
}

export default AlbumsService;
