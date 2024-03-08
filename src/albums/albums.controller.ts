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
import AlbumsService from './albums.service';
import IAlbum from './types/album.interface';
import CreateAlbumDto from './dto/create-album.dto';
import UpdateAlbumDto from './dto/update-album.dto';

@Controller('album')
class AlbumsController {
  constructor(private albumService: AlbumsService) {}

  @Get()
  async findAlbums(): Promise<IAlbum[]> {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  async findAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<IAlbum> {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  async updateAlbum(
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IAlbum> {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.albumService.deleteAlbum(id);
  }
}

export default AlbumsController;
