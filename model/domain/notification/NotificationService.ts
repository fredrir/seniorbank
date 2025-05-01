export interface NotificationService {
  sendNotification: (userId: string, message: string) => Promise<void>;
}
