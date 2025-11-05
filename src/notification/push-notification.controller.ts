import { Controller, Post, Body } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import * as webPush from 'web-push';

@Controller('notifications')
export class PushNotificationController {
  constructor(private readonly pushService: PushNotificationService) {
  }

  @Post('subscribe')
  async subscribe(@Body() body: { subscription: webPush.PushSubscription }) {
    return this.pushService.subscribe(body);
  }

  @Post('send')
  async sendPushNotification(@Body() body: { subscription: webPush.PushSubscription; payload: any; }) {
        console.log("body of Controller", body);
    return this.pushService.sendNotification(body.subscription, body.payload);
  }
}