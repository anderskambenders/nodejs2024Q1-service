import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TrackModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [UsersModule, TrackModule, ArtistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
