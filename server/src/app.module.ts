import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './event/events.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ResultModule } from './result/result.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    EventsModule,
    UserModule,
    AuthModule,
    PrismaModule,
    ResultModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
