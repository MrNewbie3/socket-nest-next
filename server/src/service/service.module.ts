import { Module } from '@nestjs/common';
import { Servis } from './servis.service';

@Module({
  exports: [Servis],
  providers: [Servis],
})
export class ServiceModule {}
