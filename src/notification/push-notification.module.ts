import { Module } from '@nestjs/common';
import { DrizzleModule } from '../db/drizzle.module';
import { PushNotificationService } from './push-notification.service';
import { PushNotificationController } from './push-notification.controller';

@Module({
  imports: [DrizzleModule],
  providers: [PushNotificationService],
  controllers: [PushNotificationController],
  exports: [PushNotificationService],
})
export class PushNotficationModule {}
