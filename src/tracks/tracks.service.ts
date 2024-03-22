import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import ITrack from './dto/tracks.dto';
import CreateTrackDto from './dto/create-track.dto';
import UpdateTrackDto from './dto/update-track.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Track } from '@prisma/client';

@Injectable()
class TracksService {
  constructor(private prismaDB: PrismaService) {}

  public async getTracks() {
    const tracks = await this.prismaDB.track.findMany();
    return tracks.map((track) => this.formatTrack(track));
  }

  public async getTrackById(id: string) {
    const track = await this.prismaDB.track.findUnique({
      where: { id },
    });
    if (track) return this.formatTrack(track);
    return;
  }

  public async createTrack(track: CreateTrackDto): Promise<ITrack> {
    const newTrack = {
      id: v4(),
      artistId: null,
      albumId: null,
      ...track,
    };
    try {
      const track = await this.prismaDB.track.create({ data: newTrack });
      return this.formatTrack(track) as Track;
    } catch {
      return;
    }
  }

  public async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<ITrack> {
    const target = await this.prismaDB.track.findUnique({ where: { id } });
    if (!target) throw new NotFoundException(`Track with id ${id} not found`);
    const track = await this.prismaDB.track.update({
      where: { id },
      data: updateTrackDto,
    });
    if (!track) return;
    return track;
  }

  public async deleteTrack(id: string): Promise<void> {
    const track = await this.prismaDB.track.findUnique({ where: { id } });
    if (!track) throw new NotFoundException(`Track with id ${id} not found`);
    await this.prismaDB.track.delete({ where: { id } });
  }

  formatTrack(track: Track) {
    return Object.fromEntries(
      Object.entries(track).filter(([key]) => !['isFavorite'].includes(key)),
    );
  }
}

export default TracksService;
