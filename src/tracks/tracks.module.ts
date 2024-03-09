import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import TracksService from './tracks.service';
import { DataModule } from 'src/db/database.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [DataModule],
})
export class TracksModule {}
