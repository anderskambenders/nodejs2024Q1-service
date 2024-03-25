import { Module } from '@nestjs/common';
import ArtistsController from './artists.controller';
import ArtistsService from './artists.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [PrismaModule],
})
export class ArtistsModule {}
