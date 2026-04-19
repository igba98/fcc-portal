'use client';

import { useSession } from "next-auth/react";
import Link from 'next/link';
import { FileStack, Search, ShieldAlert, ArrowUpRight, ShieldCheck, FileBadge } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApplicationsStore } from "@/store/applicationsStore";
import { useInspectionsStore } from "@/store/inspectionsStore";
import { useEnforcementStore } from "@/store/enforcementStore";
import { MotionWrapper } from "@/components/shared/MotionWrapper";

export default function InternalDashboard() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  
  const applications = useApplicationsStore(state => state.applications);
  const inspections = useInspectionsStore(state => state.inspections);
  const enforcementCases = useEnforcementStore(state => state.cases);

  // Computed insights based on role
  // TRO sees applications assigned to them, and any pending assignment to claim.
  const myApps = applications.filter(a => a.assigned_tro_id === session?.user?.id || a.assigned_acem_id === session?.user?.id);
  const pendingApps = applications.filter(a => a.status === 'PENDING_ASSIGNMENT' || a.status === 'UNDER_REVIEW');
  
  // CSO sees inspections assigned
  const myInspections = inspections.filter(i => i.assigned_cso_id === session?.user?.id);
  const pendingInspections = inspections.filter(i => i.status === 'MATCH_FOUND' || i.status === 'ASSIGNED');
  
  // High level metrics for CI / DAC
  const activeEnforcements = enforcementCases.filter(c => !['RESOLVED', 'CLEARED'].includes(c.status));

  return (
    <main className="flex-1 overflow-auto p-6 md:p-10 bg-slate-50/50">
        <MotionWrapper className="max-w-7xl mx-auto">
            
            <div className="mb-8">
               <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Internal Operations Portal</h1>
               <p className="text-slate-500">Welcome back, {session?.user?.name}. You are logged in as <span className="font-semibold text-primary">{role?.replace(/_/g, ' ')}</span>.</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <Card className="border-slate-200">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                           <div className="p-2.5 bg-blue-100 text-blue-700 rounded-lg"><FileStack className="h-5 w-5" /></div>
                           <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-none border-0">Queue</Badge>
                        </div>
                        <div className="text-3xl font-bold text-slate-900">{pendingApps.length}</div>
                        <div className="text-sm font-medium text-slate-500 mt-1">Pending Applications</div>
                    </CardContent>
                </Card>
                
                <Card className="border-slate-200">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                           <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-lg"><Search className="h-5 w-5" /></div>
                           <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-none border-0">Ports</Badge>
                        </div>
                        <div className="text-3xl font-bold text-slate-900">{pendingInspections.length}</div>
                        <div className="text-sm font-medium text-slate-500 mt-1">Active Inspections</div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                           <div className="p-2.5 bg-amber-100 text-amber-700 rounded-lg"><ShieldAlert className="h-5 w-5" /></div>
                           <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-100 shadow-none border-0 border-amber-200">Alerts</Badge>
                        </div>
                        <div className="text-3xl font-bold text-slate-900">{activeEnforcements.length}</div>
                        <div className="text-sm font-medium text-slate-500 mt-1">Active Enforcement Cases</div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                           <div className="p-2.5 bg-green-100 text-green-700 rounded-lg"><ShieldCheck className="h-5 w-5" /></div>
                           <Badge className="bg-green-50 text-green-700 hover:bg-green-100 shadow-none border-0">Register</Badge>
                        </div>
                        <div className="text-3xl font-bold text-slate-900">1,247</div>
                        <div className="text-sm font-medium text-slate-500 mt-1">Total Recorded Trademarks</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* My Tasks Queue depending on role */}
               <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
                   <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                      <h3 className="font-semibold text-slate-900 text-lg">My Assigned Action Items</h3>
                   </div>
                   
                   <div className="flex-1 divide-y divide-slate-100 overflow-y-auto max-h-[400px]">
                       {['TRO', 'ACEM', 'DAC', 'CHIEF_INSPECTOR'].includes(role || '') ? (
                           <>
                               {myApps.length > 0 ? myApps.map(app => (
                                   <div key={app.id} className="p-6 hover:bg-slate-50 transition cursor-pointer flex justify-between items-center">
                                       <div>
                                           <div className="font-semibold text-slate-900 mb-1">{app.trademark_name}</div>
                                           <div className="text-sm text-slate-500">Ref: {app.id} • {app.status.replace(/_/g, ' ')}</div>
                                       </div>
                                       <Link href={`/internal/applications/${app.id}/review`} className="text-primary hover:text-primary-light p-2"><ArrowUpRight className="h-5 w-5"/></Link>
                                   </div>
                               )) : (
                                   <div className="p-12 text-center text-slate-500">No applications assigned to you.</div>
                               )}
                           </>
                       ) : (
                           <>
                               {myInspections.length > 0 ? myInspections.map(insp => (
                                   <div key={insp.id} className="p-6 hover:bg-slate-50 transition cursor-pointer flex justify-between items-center">
                                       <div>
                                           <div className="font-semibold text-slate-900 mb-1">{insp.importer_name}</div>
                                           <div className="text-sm text-slate-500">Ref: {insp.id} • {insp.port}</div>
                                       </div>
                                       <Link href={`/internal/inspections/${insp.id}`} className="text-primary hover:text-primary-light p-2"><ArrowUpRight className="h-5 w-5"/></Link>
                                   </div>
                               )) : (
                                   <div className="p-12 text-center text-slate-500">No inspections assigned to you.</div>
                               )}
                           </>
                       )}
                   </div>
               </div>

               {/* System Activity Log */}
               <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
                   <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                      <h3 className="font-semibold text-slate-900 text-lg">Recent System Activity</h3>
                   </div>
                   <div className="p-6">
                       <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-100">
                           
                           {/* Activity Items (Static mocking for visual dashboard) */}
                           <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                               <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-green-100 text-green-600 shrink-0 shadow">
                                   <FileBadge className="h-5 w-5" />
                               </div>
                               <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm ml-4 md:ml-0 md:mr-4 ml:mr-0 group-odd:mr-4 group-odd:md:ml-4">
                                   <div className="flex items-center justify-between mb-1">
                                       <div className="font-semibold text-slate-900">Certificate Issued</div>
                                       <div className="text-xs text-slate-500">2h ago</div>
                                   </div>
                                   <div className="text-sm text-slate-600">FCC-CERT-2026-035 issued to Samsung Electronics.</div>
                               </div>
                           </div>

                           <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                               <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-blue-600 shrink-0 shadow">
                                   <FileStack className="h-5 w-5" />
                               </div>
                               <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm ml-4 md:ml-0 md:mr-4 ml:mr-0 group-odd:mr-4 group-odd:md:ml-4">
                                   <div className="flex items-center justify-between mb-1">
                                       <div className="font-semibold text-slate-900">New Application Submitted</div>
                                       <div className="text-xs text-slate-500">5h ago</div>
                                   </div>
                                   <div className="text-sm text-slate-600">NOKIA brand application submitted by Paul Kimaro.</div>
                               </div>
                           </div>

                           <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                               <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-amber-100 text-amber-600 shrink-0 shadow">
                                   <ShieldAlert className="h-5 w-5" />
                               </div>
                               <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm ml-4 md:ml-0 md:mr-4 ml:mr-0 group-odd:mr-4 group-odd:md:ml-4">
                                   <div className="flex items-center justify-between mb-1">
                                       <div className="font-semibold text-slate-900">TANOGA Match Found</div>
                                       <div className="text-xs text-slate-500">1d ago</div>
                                   </div>
                                   <div className="text-sm text-slate-600">Shipment matching COCA-COLA flagged at Dar Port.</div>
                               </div>
                           </div>

                       </div>
                   </div>
               </div>
            </div>

        </MotionWrapper>
    </main>
  );
}
