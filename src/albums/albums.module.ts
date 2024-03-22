import { Module } from '@nestjs/common';
import AlbumsController from './albums.controller';
import AlbumsService from './albums.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [PrismaModule],
})
export class AlbumsModule {}
