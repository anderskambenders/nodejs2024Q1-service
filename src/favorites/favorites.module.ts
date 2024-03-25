import { Module } from '@nestjs/common';
import FavoritesService from './favorites.service';
import FavoritesController from './favorites.controller';
import TracksService from '../tracks/tracks.service';
import AlbumsService from '../albums/albums.service';
import ArtistsService from '../artists/artists.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, TracksService, AlbumsService, ArtistsService],
  imports: [PrismaModule],
})
export class FavoritesModule {}
