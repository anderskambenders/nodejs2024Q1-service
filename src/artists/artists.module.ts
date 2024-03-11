import { Module } from '@nestjs/common';
import ArtistsController from './artists.controller';
import ArtistsService from './artists.service';
import { DataModule } from '../db/database.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [DataModule],
})
export class ArtistsModule {}
