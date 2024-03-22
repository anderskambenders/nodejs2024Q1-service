import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import TracksService from './tracks.service';
import { DataModule } from '../prisma/prisma.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [DataModule],
})
export class TracksModule {}
