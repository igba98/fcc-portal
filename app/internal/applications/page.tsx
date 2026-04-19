'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { Search, Filter, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useApplicationsStore } from "@/store/applicationsStore";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ApplicationsQueue() {
  const { data: session } = useSession();
  const applications = useApplicationsStore(state => state.applications);
  const [search, setSearch] = useState("");

  const filteredApps = applications.filter(a => 
      a.trademark_name.toLowerCase().includes(search.toLowerCase()) || 
      a.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-auto p-6 md:p-10 bg-slate-50/50">
        <MotionWrapper className="max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
               <div>
                   <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Applications Queue</h1>
                   <p className="text-slate-500">Review, verify and process trademark recordation applications.</p>
               </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-10">
               <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row gap-4">
                   <div className="relative flex-1">
                       <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                       <Input 
                          placeholder="Search applications..." 
                          className="pl-9 h-10 w-full md:w-96 text-sm"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)} 
                       />
                   </div>
                   <div className="flex gap-2">
                      <Button variant="outline" className="h-10 text-slate-600 bg-white text-sm"><Filter className="mr-2 h-4 w-4" /> Filter Role Items</Button>
                      <Button variant="outline" className="h-10 text-slate-600 bg-white text-sm">Sort By Date</Button>
                   </div>
               </div>
               
               <div className="overflow-x-auto min-h-[500px]">
                   <table className="w-full text-sm text-left">
                       <thead className="bg-white border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                           <tr>
                               <th className="px-6 py-4">App Ref</th>
                               <th className="px-6 py-4">Trademark/Entity</th>
                               <th className="px-6 py-4">Date Submitted</th>
                               <th className="px-6 py-4">Status & Stage</th>
                               <th className="px-6 py-4">Assigned To</th>
                               <th className="px-6 py-4 text-right">Action</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                           {filteredApps.map(app => (
                               <tr key={app.id} className="hover:bg-amber-50/50 transition">
                                   <td className="px-6 py-5 font-semibold text-slate-700">{app.id}</td>
                                   <td className="px-6 py-5">
                                       <div className="font-bold text-slate-900">{app.trademark_name}</div>
                                       <div className="text-xs text-slate-500 mt-1">{app.applicant_name}</div>
                                   </td>
                                   <td className="px-6 py-5 text-slate-600">{app.submitted_date}</td>
                                   <td className="px-6 py-5">
                                       <Badge variant="outline" className={
                                           app.status === 'UNDER_REVIEW' ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-none' :
                                           app.status === 'REQUIRES_RECTIFICATION' ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-none' :
                                           app.status === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200 shadow-none' :
                                           app.status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200 shadow-none' : 'bg-slate-100 text-slate-700 border-slate-200 shadow-none'
                                       }>{app.status.replace(/_/g, ' ')}</Badge>
                                   </td>
                                   <td className="px-6 py-5 text-slate-600">
                                       {app.assigned_tro_name || app.assigned_acem_name || 'Unassigned'}
                                   </td>
                                   <td className="px-6 py-5 text-right flex justify-end gap-2">
                                       <Link href={`/internal/applications/${app.id}/review`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 shadow-sm font-medium flex items-center")}>
                                           Review <ArrowUpRight className="ml-1.5 h-3 w-3" />
                                       </Link>
                                   </td>
                               </tr>
                           ))}
                           {filteredApps.length === 0 && (
                               <tr>
                                   <td colSpan={6} className="px-6 py-16 text-center text-slate-500 bg-slate-50/30">
                                       No applications found.
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
