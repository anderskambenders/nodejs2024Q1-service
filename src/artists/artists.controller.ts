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
    const artist = await this.artistService.getArtistById(id);
    if (artist) return artist;
    throw new NotFoundException(`Artist with id ${id} not found`);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
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
    const artist = await this.artistService.updateArtist(id, updateArtistDto);
    if (artist) return artist;
    throw new NotFoundException(`Artist with id:${id} not found`);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.artistService.deleteArtist(id);
  }
}

export default ArtistsController;
