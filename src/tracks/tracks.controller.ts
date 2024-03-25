import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import TracksService from './tracks.service';
import Track from './dto/tracks.dto';
import CreateTrackDto from './dto/create-track.dto';
import UpdateTrackDto from './dto/update-track.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('track')
@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  @ApiOkResponse({ description: 'All founded.' })
  async findTracks() {
    return this.tracksService.getTracks();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Track not found.' })
  @ApiOkResponse({ type: Track, description: 'Track found.' })
  async findTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.tracksService.getTrackById(id);
    if (track) return track;
    throw new NotFoundException(`Track with id ${id} not found`);
  }

  @Post()
  @ApiBadRequestResponse({ description: 'Incorrect body.' })
  @ApiCreatedResponse({ type: Track, description: 'Track created.' })
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.tracksService.createTrack(createTrackDto);
  }

  @Put(':id')
  @ApiNotFoundResponse({ description: 'Track not found.' })
  @ApiOkResponse({ type: Track, description: 'Track changed.' })
  async updateTrack(
    @Body() updateTrackDto: UpdateTrackDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Track> {
    const trackToUpdate = await this.tracksService.updateTrack(
      id,
      updateTrackDto,
    );
    if (trackToUpdate) return trackToUpdate;
    throw new NotFoundException(`Track with id ${id} not found`);
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Track not found.' })
  @ApiNoContentResponse({ description: 'Track deleted.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.tracksService.deleteTrack(id);
  }
}

export default TracksController;
