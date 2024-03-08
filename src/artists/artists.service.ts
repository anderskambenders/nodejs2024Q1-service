import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import CreateArtistDto from './dto/create-artist.dto';
import UpdateArtistDto from './dto/update-artist.dto';
import IArtist from './types/artists.interface';

@Injectable()
class ArtistsService {
  private artists: IArtist[] = [];
  public async getArtists(): Promise<IArtist[]> {
    return this.artists;
  }

  public async getArtistById(id: string): Promise<IArtist> {
    const artist = this.artists.find((artist) => artist.id === id);
    if (artist) return artist;
    throw new NotFoundException(`Artist with id ${id} not found`);
  }

  public async createArtist(artist: CreateArtistDto): Promise<IArtist> {
    const newArtist = {
      id: v4(),
      ...artist,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  public async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<IArtist> {
    const index = this.artists.findIndex((item) => item.id === id);
    if (index < 0)
      throw new NotFoundException(`Artist with id ${id} not found`);

    const artist = this.artists[index];
    this.artists[index] = {
      ...artist,
      ...updateArtistDto,
    };
    return this.artists[index];
  }

  public async deleteArtist(id: string): Promise<void> {
    const index = this.artists.findIndex((item) => item.id === id);
    if (index < 0)
      throw new NotFoundException(`Artist with id ${id} not found`);
    this.artists.splice(index, 1);
  }
}

export default ArtistsService;
