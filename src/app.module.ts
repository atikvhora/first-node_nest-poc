import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { PatientsModule } from './patients/patients.module';
import { DrizzleModule } from './db/drizzle.module';
import { PushNotficationModule } from './notification/push-notification.module';

@Module({
  imports: [DrizzleModule, CatsModule, PatientsModule, PushNotficationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
