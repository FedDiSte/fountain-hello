import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ControllerModule } from './controllers/controller.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ControllerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
