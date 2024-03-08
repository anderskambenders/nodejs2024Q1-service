import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import ArtistsService from './artists.service';
import IArtist from './types/artists.interface';
import CreateArtistDto from './dto/create-artist.dto';
import UpdateArtistDto from './dto/update-artist.dto';

@Controller('artist')
class ArtistsController {
  constructor(private artistService: ArtistsService) {}

  @Get()
  async findArtists(): Promise<IArtist[]> {
    return this.artistService.getArtists();
  }

  @Get(':id')
  async findArtist(@Param('id', ParseUUIDPipe) id: string): Promise<IArtist> {
    return this.artistService.getArtistById(id);
  }

  @Post()
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<IArtist> {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  async updateArtist(
    @Body() updateArtistDto: UpdateArtistDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IArtist> {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.artistService.deleteArtist(id);
  }
}

export default ArtistsController;
