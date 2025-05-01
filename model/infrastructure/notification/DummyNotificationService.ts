import { NotificationService } from "@/model/domain/notification/NotificationService";

export class DummyNotificationService implements NotificationService {
  async sendNotification(phoneNumber: string, message: string) {
    console.log(
      `[DummyNotificationService]: Sending notification to ${phoneNumber}: ${message}`,
    );
  }
}
