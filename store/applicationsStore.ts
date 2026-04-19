import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockApplications } from '../data/mock-applications';

export interface Application {
  id: string;
  application_type: string;
  trademark_name: string;
  status: string;
  submitted_date: string;
  [key: string]: any;
}

interface ApplicationsState {
  applications: Application[];
  addApplication: (app: Application) => void;
  updateApplication: (id: string, data: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
  assignToACEM: (id: string, acemId: string) => void;
  assignToTRO: (id: string, troId: string) => void;
  updateStatus: (id: string, status: string) => void;
  addNote: (id: string, note: any) => void;
}

export const useApplicationsStore = create<ApplicationsState>()(
  persist(
    (set) => ({
      applications: mockApplications as Application[],
      addApplication: (app) => set((state) => ({ applications: [{...app, id: `APP-2026-${Math.floor(Math.random() * 10000)}`}, ...state.applications] })),
      updateApplication: (id, Object) => set((state) => ({
        applications: state.applications.map((app) => (app.id === id ? { ...app, ...Object } : app)),
      })),
      deleteApplication: (id) => set((state) => ({
        applications: state.applications.filter((app) => app.id !== id),
      })),
      assignToACEM: (id, acemId) => set((state) => ({
        applications: state.applications.map((app) => (app.id === id ? { ...app, assigned_acem_id: acemId, status: 'PENDING_ASSIGNMENT' } : app))
      })),
      assignToTRO: (id, troId) => set((state) => ({
        applications: state.applications.map((app) => (app.id === id ? { ...app, assigned_tro_id: troId, status: 'UNDER_REVIEW' } : app))
      })),
      updateStatus: (id, status) => set((state) => ({
        applications: state.applications.map((app) => (app.id === id ? { ...app, status } : app))
      })),
      addNote: (id, note) => set((state) => ({
        applications: state.applications.map((app) => (app.id === id ? {
            ...app, 
            audit_trail: [...(app.audit_trail || []), { timestamp: new Date().toISOString(), note, action: 'NOTE_ADDED' }]
        } : app))
      }))
    }),
    {
      name: 'fcc-applications-storage',
    }
  )
);
