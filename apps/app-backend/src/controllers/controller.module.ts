import { Module } from '@nestjs/common';

import { ServicesModule } from '../services/services.module';

import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [ServicesModule],
})
export class ControllerModule {}
