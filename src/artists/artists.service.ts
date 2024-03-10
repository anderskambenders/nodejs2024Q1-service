import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import CreateArtistDto from './dto/create-artist.dto';
import UpdateArtistDto from './dto/update-artist.dto';
import IArtist from './types/artists.interface';
import { DataService } from 'src/db/database.service';

@Injectable()
class ArtistsService {
  constructor(private dataService: DataService) {}

  public async getArtists(): Promise<IArtist[]> {
    return this.dataService.getArtists();
  }

  public async getArtistById(id: string): Promise<IArtist> {
    const artist = await this.dataService.getArtistById(id);
    if (artist) return artist;
  }

  public async createArtist(artist: CreateArtistDto): Promise<IArtist> {
    const newArtist = {
      id: v4(),
      ...artist,
    };
    return this.dataService.createArtist(newArtist);
  }

  public async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<IArtist> {
    const artist = await this.dataService.getArtistById(id);
    if (!artist) return;

    return this.dataService.updateArtist(id, updateArtistDto);
  }

  public async deleteArtist(id: string): Promise<void> {
    await this.dataService.deleteArtist(id);
  }
}

export default ArtistsService;
