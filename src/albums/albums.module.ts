import { Module } from '@nestjs/common';
import AlbumsController from './albums.controller';
import AlbumsService from './albums.service';
import { DataModule } from '../prisma/prisma.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [DataModule],
})
export class AlbumsModule {}
