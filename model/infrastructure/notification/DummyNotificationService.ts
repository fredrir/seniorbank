import { NotificationService } from "@/model/application/NotificationService";

export class DummyNotificationService implements NotificationService {
  async sendContactNotification(userId: string, message: string) {
    console.log(
      `[DummyNotificationService]: Sending notification to user ${userId}'s safety contact': ${message}`,
    );
  }
}
