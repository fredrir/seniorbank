export interface NotificationService {
  sendContactNotification: (userId: string, message: string) => Promise<void>;
}
