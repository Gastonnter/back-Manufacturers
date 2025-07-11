import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ManufacturersModule } from './manufacturers/manufacturers.module';

@Module({
  imports: [ManufacturersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
