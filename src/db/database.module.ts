import { Module } from '@nestjs/common';
import { DataService } from './database.service';

@Module({
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}
