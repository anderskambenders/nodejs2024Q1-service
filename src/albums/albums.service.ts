import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import CreateAlbumDto from './dto/create-album.dto';
import UpdateAlbumDto from './dto/update-album.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Album } from '@prisma/client';

@Injectable()
class AlbumsService {
  constructor(private prismaDB: PrismaService) {}

  public async getAlbums() {
    const albums = await this.prismaDB.album.findMany();
    return albums.map((album) => this.formatAlbum(album));
  }

  public async getAlbumById(id: string) {
    const album = await this.prismaDB.album.findUnique({
      where: { id },
    });
    if (album) return this.formatAlbum(album);
  }

  public async createAlbum(album: CreateAlbumDto) {
    const newAlbum = {
      id: v4(),
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    };
    const albumToDb = await this.prismaDB.album.create({
      data: newAlbum,
    });
    return this.formatAlbum(albumToDb);
  }

  public async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.prismaDB.album.findFirst({ where: { id: id } });
    if (!album) throw new NotFoundException('album not found');
    if (
      (!updateAlbumDto?.name &&
        !updateAlbumDto?.year &&
        !updateAlbumDto?.artistId) ||
      (updateAlbumDto?.name && typeof updateAlbumDto?.name !== 'string') ||
      (updateAlbumDto?.year && typeof updateAlbumDto?.year !== 'number') ||
      (updateAlbumDto?.artistId && typeof updateAlbumDto?.artistId !== 'string')
    )
      throw new BadRequestException('invalid dto');

    const newAlbumData = {
      ...album,
      name: updateAlbumDto?.name,
      year: updateAlbumDto?.year,
      artistId: updateAlbumDto?.artistId,
    };

    const updAlbum = await this.prismaDB.album.update({
      where: {
        id: id,
      },
      data: newAlbumData,
    });
    return this.formatAlbum(updAlbum);
  }

  public async deleteAlbum(id: string): Promise<void> {
    const album = await this.prismaDB.album.findUnique({ where: { id } });
    if (!album) throw new NotFoundException(`Album with id ${id} not found`);
    await this.prismaDB.album.delete({
      where: {
        id: id,
      },
    });
  }

  formatAlbum(album: Album) {
    return Object.fromEntries(
      Object.entries(album).filter(([key]) => !['isFavorite'].includes(key)),
    );
  }
}

export default AlbumsService;
