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
import AlbumsService from './albums.service';
import IAlbum from './dto/album.dto';
import CreateAlbumDto from './dto/create-album.dto';
import UpdateAlbumDto from './dto/update-album.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';
import Album from './dto/album.dto';

@ApiTags('album')
@Controller('album')
class AlbumsController {
  constructor(private albumService: AlbumsService) {}

  @Get()
  @ApiOkResponse({ description: 'All founded.' })
  async findAlbums() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Album not found.' })
  @ApiOkResponse({ type: IAlbum, description: 'Album found.' })
  async findAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumService.getAlbumById(id);
    if (!album) throw new NotFoundException(`Album with id ${id} not found`);
    return album;
  }

  @Post()
  @ApiCreatedResponse({ type: Album, description: 'Created album.' })
  @ApiBadRequestResponse({ description: 'Body is incorrect.' })
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  @ApiNotFoundResponse({ description: 'Album not found.' })
  @ApiOkResponse({ description: 'Album changed.' })
  async updateAlbum(
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const album = await this.albumService.updateAlbum(id, updateAlbumDto);
    if (!album) throw new NotFoundException(`Album with id ${id} not found`);
    return album;
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Album not found.' })
  @ApiNoContentResponse({ description: 'Album deleted.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.albumService.deleteAlbum(id);
  }
}

export default AlbumsController;
