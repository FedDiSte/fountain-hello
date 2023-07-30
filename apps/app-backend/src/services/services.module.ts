import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { OverpassService } from './overpass/overpass.service';

@Module({
  controllers: [],
  providers: [AppService, OverpassService],
  exports: [AppService, OverpassService],
})
export class ServicesModule {}
