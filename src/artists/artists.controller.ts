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
import IArtist from './dto/artists.dto';
import CreateArtistDto from './dto/create-artist.dto';
import UpdateArtistDto from './dto/update-artist.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('artist')
@Controller('artist')
class ArtistsController {
  constructor(private artistService: ArtistsService) {}

  @Get()
  @ApiOkResponse({ description: 'All founded.' })
  async findArtists(): Promise<IArtist[]> {
    return this.artistService.getArtists();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Artist not found.' })
  @ApiOkResponse({ type: IArtist, description: 'Artist found.' })
  async findArtist(@Param('id', ParseUUIDPipe) id: string): Promise<IArtist> {
    const artist = await this.artistService.getArtistById(id);
    if (artist) return artist;
    throw new NotFoundException(`Artist with id ${id} not found`);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: IArtist, description: 'Created artist.' })
  @ApiBadRequestResponse({ description: 'Body is incorrect.' })
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<IArtist> {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  @ApiNotFoundResponse({ description: 'Artist not found.' })
  @ApiOkResponse({ description: 'Artist changed.' })
  async updateArtist(
    @Body() updateArtistDto: UpdateArtistDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IArtist> {
    const artist = await this.artistService.updateArtist(id, updateArtistDto);
    if (artist) return artist;
    throw new NotFoundException(`Artist with id:${id} not found`);
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Artist not found.' })
  @ApiNoContentResponse({ description: 'Artist deleted.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.artistService.deleteArtist(id);
  }
}

export default ArtistsController;
