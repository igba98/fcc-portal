'use client';

import { useSession } from "next-auth/react";
import Link from 'next/link';
import { ShieldCheck, FileText, AlertCircle, FileBadge, ArrowUpRight, Plus, Clock, Search } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApplicationsStore } from "@/store/applicationsStore";
import { useTrademarksStore } from "@/store/trademarksStore";
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/shared/MotionWrapper";

export default function ExternalDashboard() {
  const { data: session } = useSession();
  
  const allApplications = useApplicationsStore(state => state.applications);
  const applications = allApplications;
  const allTrademarks = useTrademarksStore(state => state.trademarks);
  const trademarks = allTrademarks;
  
  const activeTmsCount = trademarks.filter(t => t.status === 'ACTIVE').length;
  const pendingAppsCount = applications.filter(a => ['UNDER_REVIEW', 'PENDING_ASSIGNMENT', 'REQUIRES_RECTIFICATION'].includes(a.status)).length;
  const expiringCount = trademarks.filter(t => t.status === 'EXPIRING_SOON').length;
  // certificates are any approved apps or active TMs with certs
  const certsCount = trademarks.filter(t => t.certificate_no).length + applications.filter(a => a.certificate_issued).length;

  return (
    <main className="flex-1 overflow-auto p-4 md:p-8 bg-background">
        <MotionWrapper className="container mx-auto max-w-6xl">
            
            {/* Context Header */}
            <div className="mb-8">
               <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Welcome, {session?.user?.name}</h1>
               <p className="text-slate-500">Manage your trademark portfolio and recordation applications.</p>
            </div>

            {/* Expiring Alert Banner */}
            {expiringCount > 0 && (
               <StaggerContainer className="mb-8">
                   {trademarks.filter(t => t.status==='EXPIRING_SOON').map(tm => (
                       <StaggerItem key={tm.id}>
                           <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between mb-4 shadow-sm">
                              <div className="flex items-center space-x-3">
                                 <AlertCircle className="h-6 w-6 text-amber-600" />
                                 <div>
                                    <div className="font-semibold text-amber-900">{tm.trademark_name} expires in {tm.days_to_expiry} days</div>
                                    <div className="text-sm text-amber-700">Expiry Date: {tm.expiry_date}</div>
                                 </div>
                              </div>
                              <Link href={`/external/trademarks/${tm.id}/renew`} className="text-sm font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-lg transition duration-200">
                                  Renew Now &rarr;
                              </Link>
                           </div>
                       </StaggerItem>
                   ))}
               </StaggerContainer>
            )}

            {/* Quick Actions */}
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
               <Link href="/external/applications/new">
                   <Card className="hover:shadow-md hover:border-primary/40 transition cursor-pointer group">
                       <CardContent className="p-4 flex items-center space-x-3">
                           <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition"><Plus className="h-5 w-5" /></div>
                           <div className="font-semibold text-sm text-slate-900">New Application</div>
                       </CardContent>
                   </Card>
               </Link>
               <Link href="/external/trademarks">
                   <Card className="hover:shadow-md hover:border-primary/40 transition cursor-pointer group">
                       <CardContent className="p-4 flex items-center space-x-3">
                           <div className="p-2 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-primary group-hover:text-white transition"><Clock className="h-5 w-5" /></div>
                           <div className="font-semibold text-sm text-slate-900">Renew Trademark</div>
                       </CardContent>
                   </Card>
               </Link>
               <Link href="/external/public-register">
                   <Card className="hover:shadow-md hover:border-primary/40 transition cursor-pointer group">
                       <CardContent className="p-4 flex items-center space-x-3">
                           <div className="p-2 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-primary group-hover:text-white transition"><Search className="h-5 w-5" /></div>
                           <div className="font-semibold text-sm text-slate-900">Search Register</div>
                       </CardContent>
                   </Card>
               </Link>
               <Link href="/external/agents">
                   <Card className="hover:shadow-md hover:border-primary/40 transition cursor-pointer group">
                       <CardContent className="p-4 flex items-center space-x-3">
                           <div className="p-2 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-primary group-hover:text-white transition"><ArrowUpRight className="h-5 w-5" /></div>
                           <div className="font-semibold text-sm text-slate-900">Appoint Agent</div>
                       </CardContent>
                   </Card>
               </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <Card className="shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                           <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><ShieldCheck className="h-6 w-6" /></div>
                           <Badge variant="outline" className="bg-slate-50">Active</Badge>
                        </div>
                        <div className="text-3xl font-bold text-slate-900">{activeTmsCount}</div>
                        <div className="text-sm font-medium text-slate-500 mt-1">My Trademarks</div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                           <div className="p-3 bg-slate-100 text-slate-600 rounded-xl"><FileText className="h-6 w-6" /></div>
                           <Badge variant="outline" className="bg-slate-50 text-slate-500">Processing</Badge>
                        </div>
                        <div className="text-3xl font-bold text-slate-900">{pendingAppsCount}</div>
                        <div className="text-sm font-medium text-slate-500 mt-1">Pending Applications</div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                           <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><AlertCircle className="h-6 w-6" /></div>
                           <Badge variant="outline" className="bg-amber-50 text-amber-700">Action Needed</Badge>
                        </div>
                        <div className="text-3xl font-bold text-slate-900">{expiringCount}</div>
                        <div className="text-sm font-medium text-slate-500 mt-1">Expiring Soon</div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                           <div className="p-3 bg-green-50 text-green-600 rounded-xl"><FileBadge className="h-6 w-6" /></div>
                           <Badge variant="outline" className="bg-green-50 text-green-700">Available</Badge>
                        </div>
                        <div className="text-3xl font-bold text-slate-900">{certsCount}</div>
                        <div className="text-sm font-medium text-slate-500 mt-1">Certificates Available</div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Applications */}
            <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden mb-10">
               <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-semibold text-slate-900 text-lg">Recent Applications</h3>
                  <Link href="/external/applications" className="text-sm text-primary font-medium hover:underline">View All</Link>
               </div>
               <div className="overflow-x-auto">
                   <table className="w-full text-sm text-left">
                       <thead className="bg-white border-b border-border text-xs uppercase text-slate-500 font-semibold">
                           <tr>
                               <th className="px-6 py-4">App Ref</th>
                               <th className="px-6 py-4">Trademark</th>
                               <th className="px-6 py-4">Date Submittted</th>
                               <th className="px-6 py-4">Status</th>
                               <th className="px-6 py-4 text-right">Action</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-border">
                           {applications.slice(0, 5).map(app => (
                               <tr key={app.id} className="hover:bg-slate-50 transition cursor-pointer">
                                   <td className="px-6 py-4 font-medium text-primary">{app.id}</td>
                                   <td className="px-6 py-4 font-semibold text-slate-900">{app.trademark_name}</td>
                                   <td className="px-6 py-4 text-slate-500">{app.submitted_date}</td>
                                   <td className="px-6 py-4">
                                       <Badge variant="outline" className={
                                           app.status === 'UNDER_REVIEW' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                           app.status === 'REQUIRES_RECTIFICATION' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                           app.status === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' :
                                           app.status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                                       }>{app.status.replace(/_/g, ' ')}</Badge>
                                   </td>
                                   <td className="px-6 py-4 text-right">
                                       <Link href={`/external/applications/${app.id}`} className="text-secondary font-medium hover:underline">View Detail</Link>
                                   </td>
                               </tr>
                           ))}
                           {applications.length === 0 && (
                               <tr>
                                   <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                       No applications found. <br/><Link href="/external/applications/new" className="text-primary font-medium hover:underline mt-2 inline-block">Submit your first application</Link>
                                   </td>
                               </tr>
                           )}
                       </tbody>
                   </table>
               </div>
            </div>

        </MotionWrapper>
    </main>
  );
}
