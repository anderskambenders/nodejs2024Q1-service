import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import CreateAlbumDto from './dto/create-album.dto';
import UpdateAlbumDto from './dto/update-album.dto';
import IAlbum from './types/album.interface';
import { DataService } from 'src/db/database.service';

@Injectable()
class AlbumsService {
  constructor(private dataService: DataService) {}
  public async getAlbums(): Promise<IAlbum[]> {
    return this.dataService.getAlbums();
  }

  public async getAlbumById(id: string): Promise<IAlbum> {
    const album = await this.dataService.getAlbumById(id);
    if (album) return album;
  }

  public async createAlbum(album: CreateAlbumDto): Promise<IAlbum> {
    const newAlbum = {
      id: v4(),
      artistId: null,
      ...album,
    };
    return this.dataService.createAlbum(newAlbum);
  }

  public async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<IAlbum> {
    const album = await this.dataService.getAlbumById(id);
    if (album) return this.dataService.updateAlbum(id, updateAlbumDto);
  }

  public async deleteAlbum(id: string): Promise<void> {
    return this.dataService.deleteAlbum(id);
  }
}

export default AlbumsService;
