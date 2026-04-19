import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockInspections } from '../data/mock-inspections';
import { mockTanoga } from '../data/mock-tanoga';

interface Inspection {
  id: string;
  tanoga_ref: string;
  status: string;
  [key: string]: any;
}

interface InspectionsState {
  inspections: Inspection[];
  syncTANOGA: () => void;
  assignCSO: (id: string, csoId: string) => void;
  recordOutcome: (id: string, outcome: string) => void;
  createSeizureReport: (id: string, report: any) => void;
  updateSeizureStatus: (id: string, status: string) => void;
}

export const useInspectionsStore = create<InspectionsState>()(
  persist(
    (set) => ({
      inspections: mockInspections as Inspection[],
      syncTANOGA: () => set((state) => {
          const newEntry = mockTanoga[Math.floor(Math.random() * mockTanoga.length)];
          if (newEntry && !state.inspections.find(i => i.id === newEntry.id)) {
              return { inspections: [{...newEntry, tanoga_ref: newEntry.id}, ...state.inspections] };
          }
          return state;
      }),
      assignCSO: (id, csoId) => set((state) => ({
          inspections: state.inspections.map((i) => (i.id === id ? { ...i, assigned_cso_id: csoId, status: 'ASSIGNED' } : i))
      })),
      recordOutcome: (id, outcome) => set((state) => ({
          inspections: state.inspections.map((i) => (i.id === id ? { ...i, outcome, status: outcome === 'DETAIN' ? 'DETAINED' : 'CLEARED' } : i))
      })),
      createSeizureReport: (id, report) => set((state) => ({
          inspections: state.inspections.map((i) => (i.id === id ? { ...i, seizure_report: report, status: 'SEIZED' } : i))
      })),
      updateSeizureStatus: (id, status) => set((state) => ({
          inspections: state.inspections.map((i) => (i.id === id && i.seizure_report ? 
             { ...i, seizure_report: { ...i.seizure_report, status } } : i))
      }))
    }),
    {
      name: 'fcc-inspections-storage',
    }
  )
);
