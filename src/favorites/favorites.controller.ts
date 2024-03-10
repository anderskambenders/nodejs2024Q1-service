import {
  Controller,
  Get,
  Post,
  Param,
  HttpStatus,
  HttpCode,
  Delete,
  Header,
  UnprocessableEntityException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import FavoritesService from './favorites.service';
import FavoriteResponseDto from './dto/favorites.dto';
import { isUUID } from 'class-validator';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @Header('content-type', 'application/json')
  findAll(): Promise<FavoriteResponseDto> {
    return this.favoritesService.getAll();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('content-type', 'application/json')
  async addTrack(@Param('id') id: string) {
    if (!isUUID(id)) throw new BadRequestException('ID is not UUID');
    const track = await this.favoritesService.addTrack(id);
    if (track) return track;
    throw new UnprocessableEntityException(`Track with id ${id} not found`);
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('content-type', 'application/json')
  async addAlbum(@Param('id') id: string) {
    if (!isUUID(id)) throw new BadRequestException('ID is not UUID');
    const album = await this.favoritesService.addAlbum(id);
    if (album) return album;
    throw new UnprocessableEntityException(`Album with id ${id} not found`);
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('content-type', 'application/json')
  async addArtist(@Param('id') id: string) {
    if (!isUUID(id)) throw new BadRequestException('ID is not UUID');
    const artist = await this.favoritesService.addArtist(id);
    if (artist) return artist;
    throw new UnprocessableEntityException(`Artist with id ${id} not found`);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('content-type', 'application/json')
  async removeTrack(@Param('id') id: string) {
    const track = await this.favoritesService.removeTrack(id);
    if (track) return true;
    throw new NotFoundException(`Track with id ${id} not found`);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('content-type', 'application/json')
  async removeAlbum(@Param('id') id: string) {
    const album = await this.favoritesService.removeAlbum(id);
    if (album) return true;
    throw new NotFoundException(`Album with id ${id} not found`);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('content-type', 'application/json')
  async removeArtist(@Param('id') id: string) {
    const artist = await this.favoritesService.removeArtist(id);
    if (artist) return true;
    throw new NotFoundException(`Artist with id ${id} not found`);
  }
}
export default FavoritesController;
