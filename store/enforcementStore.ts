import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockEnforcement } from '../data/mock-enforcement';

interface EnforcementCase {
  id: string;
  status: string;
  [key: string]: any;
}

interface EnforcementState {
  cases: EnforcementCase[];
  confirmCounterfeit: (id: string, confirmed: boolean) => void;
  calculateFine: (id: string, details: any) => void;
  generateFormG: (id: string) => void;
  recordPayment: (id: string, paymentDetails: any) => void;
  generateOffloadingLetter: (id: string) => void;
  generateWarehouseReceipt: (id: string) => void;
}

export const useEnforcementStore = create<EnforcementState>()(
  persist(
    (set) => ({
      cases: mockEnforcement as EnforcementCase[],
      confirmCounterfeit: (id, confirmed) => set((state) => ({
          cases: state.cases.map((c) => (c.id === id ? { ...c, counterfeit_confirmed: confirmed, status: confirmed ? 'CONFIRMED_COUNTERFEIT' : 'CLEARED' } : c))
      })),
      calculateFine: (id, details) => set((state) => ({
          cases: state.cases.map((c) => (c.id === id ? { ...c, fine_details: details } : c))
      })),
      generateFormG: (id) => set((state) => ({
          cases: state.cases.map((c) => (c.id === id ? { ...c, status: 'COMPOUNDMENT_IN_PROGRESS', form_g_generated: true } : c))
      })),
      recordPayment: (id, paymentDetails) => set((state) => ({
          cases: state.cases.map((c) => (c.id === id ? { ...c, payment_details: paymentDetails, payment_status: 'PAID' } : c))
      })),
      generateOffloadingLetter: (id) => set((state) => ({
          cases: state.cases.map((c) => (c.id === id ? { ...c, offloading_letter_generated: true } : c))
      })),
      generateWarehouseReceipt: (id) => set((state) => ({
          cases: state.cases.map((c) => (c.id === id ? { ...c, warehouse_receipt_generated: true, status: 'RESOLVED' } : c))
      })),
    }),
    {
      name: 'fcc-enforcement-storage',
    }
  )
);
