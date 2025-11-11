import { Injectable } from '@nestjs/common';
import * as webPush from 'web-push';
import { config } from "dotenv";

export interface pushResponse {
  json : string
}

config();
@Injectable()
export class PushNotificationService {
  constructor() {
    // const vpiday = webPush.generateVAPIDKeys();
    webPush.setVapidDetails(
      'mailto:atikvhora92@gmail.com',
      process.env.WEB_PUSH_PUBLIC_KEY,
      process.env.WEB_PUSH_PRIVATE_KEY,
    );
  }

  async subscribe(body: webPush.PushSubscription) : Promise<boolean> {
    return true;
  }

  async sendNotification(subscription: webPush.PushSubscription, payload: any): Promise<pushResponse> {
    try {
      const result = await webPush.sendNotification(subscription, JSON.stringify(payload));
        console.log("result notificaiton", result);
      return result.body;
    } catch (error) {
      throw error;
    }
  }
}