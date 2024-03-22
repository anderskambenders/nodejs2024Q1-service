import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import CreateArtistDto from './dto/create-artist.dto';
import UpdateArtistDto from './dto/update-artist.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Artist } from '@prisma/client';

@Injectable()
class ArtistsService {
  constructor(private prismaDB: PrismaService) {}

  public async getArtists() {
    const artist = await this.prismaDB.artist.findMany();
    return artist.map((artist) => this.formatArtist(artist));
  }

  public async getArtistById(id: string) {
    const artist = await this.prismaDB.artist.findUnique({ where: { id } });
    if (artist) return this.formatArtist(artist);
  }

  public async createArtist(artist: CreateArtistDto) {
    const newArtist = {
      id: v4(),
      ...artist,
    };
    const artistToDB = await this.prismaDB.artist.create({ data: newArtist });
    return this.formatArtist(artistToDB);
  }

  public async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prismaDB.artist.update({
      where: { id },
      data: updateArtistDto,
    });
    if (!artist) return;

    return this.formatArtist(artist);
  }

  public async deleteArtist(id: string): Promise<void> {
    await this.prismaDB.artist.delete({ where: { id } });
  }

  formatArtist(artist: Artist) {
    return Object.fromEntries(
      Object.entries(artist).filter(([key]) => !['isFavorite'].includes(key)),
    );
  }
}

export default ArtistsService;
