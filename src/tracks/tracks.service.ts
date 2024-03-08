import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import ITrack from './types/tracks.interface';
import CreateTrackDto from './dto/create-track.dto';
import UpdateTrackDto from './dto/update-track.dto';

@Injectable()
class TracksService {
  private tracks: ITrack[] = [];
  public async getTracks(): Promise<ITrack[]> {
    return this.tracks;
  }

  public async getTrackById(id: string): Promise<ITrack> {
    const track = this.tracks.find((track) => track.id === id);
    if (track) return track;
    throw new NotFoundException(`Track with id ${id} not found`);
  }

  public async createTrack(track: CreateTrackDto): Promise<ITrack> {
    const newTrack = {
      id: v4(),
      artistId: null,
      albumId: null,
      ...track,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  public async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<ITrack> {
    const index = this.tracks.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Track with id ${id} not found`);

    const track = this.tracks[index];
    this.tracks[index] = {
      ...track,
      ...updateTrackDto,
    };
    return this.tracks[index];
  }

  public async deleteTrack(id: string): Promise<void> {
    const index = this.tracks.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Track with id ${id} not found`);
    this.tracks.splice(index, 1);
  }
}

export default TracksService;
