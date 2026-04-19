import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTrademarks } from '../data/mock-trademarks';

export interface Trademark {
  id: string;
  trademark_name: string;
  status: string;
  owner_id: string;
  [key: string]: any;
}

interface TrademarksState {
  trademarks: Trademark[];
  addTrademark: (tm: Trademark) => void;
  updateTrademark: (id: string, data: Partial<Trademark>) => void;
  renewTrademark: (id: string, years: number) => void;
  changeOwnership: (id: string, newOwnerId: string, newOwnerName: string) => void;
  changeName: (id: string, newName: string) => void;
  amendDetails: (id: string, details: any) => void;
}

export const useTrademarksStore = create<TrademarksState>()(
  persist(
    (set) => ({
      trademarks: mockTrademarks as Trademark[],
      addTrademark: (tm) => set((state) => ({ trademarks: [{...tm, id: `TM-2026-${Math.floor(Math.random() * 10000)}`}, ...state.trademarks] })),
      updateTrademark: (id, Object) => set((state) => ({
        trademarks: state.trademarks.map((tm) => (tm.id === id ? { ...tm, ...Object } : tm)),
      })),
      renewTrademark: (id, years) => set((state) => ({
        trademarks: state.trademarks.map((tm) => {
            if (tm.id === id) {
                const newExpiry = new Date();
                newExpiry.setFullYear(newExpiry.getFullYear() + years);
                return { ...tm, expiry_date: newExpiry.toISOString().split('T')[0], status: 'ACTIVE' };
            }
            return tm;
        })
      })),
      changeOwnership: (id, newOwnerId, newOwnerName) => set((state) => ({
          trademarks: state.trademarks.map((tm) => (tm.id === id ? { ...tm, owner_id: newOwnerId, owner_name: newOwnerName } : tm))
      })),
      changeName: (id, newName) => set((state) => ({
          trademarks: state.trademarks.map((tm) => (tm.id === id ? { ...tm, trademark_name: newName } : tm))
      })),
      amendDetails: (id, details) => set((state) => ({
          trademarks: state.trademarks.map((tm) => (tm.id === id ? { ...tm, ...details } : tm))
      }))
    }),
    {
      name: 'fcc-trademarks-storage',
    }
  )
);
