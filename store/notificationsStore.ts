import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockNotifications } from '../data/mock-notifications';

interface Notification {
  id: string;
  user_id: string;
  type: string;
  title?: string;
  message: string;
  read: boolean;
  created_at: string;
  action_link?: string;
}

interface NotificationsState {
  notifications: Notification[];
  addNotification: (userId: string, type: string, message: string) => void;
  markRead: (id: string) => void;
  markAllRead: (userId: string) => void;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set) => ({
      notifications: mockNotifications as unknown as Notification[],
      addNotification: (userId, type, message) => set((state) => ({
         notifications: [{
             id: `NOT-${Math.floor(Math.random() * 10000)}`,
             user_id: userId,
             type,
             message,
             read: false,
             created_at: new Date().toISOString()
         }, ...state.notifications]
      })),
      markRead: (id) => set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      })),
      markAllRead: (userId) => set((state) => ({
          notifications: state.notifications.map((n) => (n.user_id === userId ? { ...n, read: true } : n))
      })),
    }),
    {
      name: 'fcc-notifications-storage',
    }
  )
);
