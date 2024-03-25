import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import TracksService from './tracks.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [PrismaModule],
})
export class TracksModule {}
