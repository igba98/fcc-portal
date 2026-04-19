import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockUsers } from '../data/mock-users';

interface User {
  id: string;
  name: string;
  role: string;
  status?: string;
  [key: string]: any;
}

interface UsersState {
  users: User[];
  addUser: (user: User) => void;
  updateRole: (id: string, role: string) => void;
  deactivateUser: (id: string) => void;
}

export const useUsersStore = create<UsersState>()(
  persist(
    (set) => ({
      users: mockUsers as User[],
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateRole: (id, role) => set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, role } : u))
      })),
      deactivateUser: (id) => set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, status: 'INACTIVE' } : u))
      }))
    }),
    {
      name: 'fcc-users-storage',
    }
  )
);
