import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import ITrack from './types/tracks.interface';
import CreateTrackDto from './dto/create-track.dto';
import UpdateTrackDto from './dto/update-track.dto';
import { DataService } from 'src/db/database.service';

@Injectable()
class TracksService {
  constructor(private dataService: DataService) {}

  public async getTracks(): Promise<ITrack[]> {
    return this.dataService.getTracks();
  }

  public async getTrackById(id: string): Promise<ITrack> {
    const track = await this.dataService.getTrackById(id);
    if (track) return track;
    return undefined;
  }

  public async createTrack(track: CreateTrackDto): Promise<ITrack> {
    const newTrack = {
      id: v4(),
      artistId: null,
      albumId: null,
      ...track,
    };
    try {
      return await this.dataService.createTrack(newTrack);
    } catch {
      return undefined;
    }
  }

  public async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<ITrack> {
    const track = await this.dataService.getTrackById(id);
    if (!track) return undefined;
    return this.dataService.updateTrack(id, updateTrackDto);
  }

  public async deleteTrack(id: string): Promise<void> {
    await this.dataService.deleteTrack(id);
  }
}

export default TracksService;
