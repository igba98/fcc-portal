'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useApplicationsStore } from "@/store/applicationsStore";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ApplicationsList() {
  const { data: session } = useSession();
  const allApplications = useApplicationsStore(state => state.applications);
  const applications = allApplications;
  const [search, setSearch] = useState("");

  const filteredApps = applications.filter(a => 
      a.trademark_name.toLowerCase().includes(search.toLowerCase()) || 
      a.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-auto p-4 md:p-8 bg-background">
        <MotionWrapper className="container mx-auto max-w-6xl">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
               <div>
                   <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">My Applications</h1>
                   <p className="text-slate-500">Track and manage your trademark recordation applications.</p>
               </div>
               <Link href="/external/applications/new" className={cn(buttonVariants({ variant: "default" }), "shrink-0 bg-primary h-11 text-white")}>
                  <Plus className="mr-2 h-4 w-4" /> New Application
               </Link>
            </div>

            <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden mb-10">
               <div className="p-4 border-b border-border bg-slate-50/50 flex flex-col sm:flex-row gap-4">
                   <div className="relative flex-1">
                       <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                       <Input 
                          placeholder="Search by trademark name or application ID..." 
                          className="pl-9 h-10 w-full md:w-96"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)} 
                       />
                   </div>
                   <Button variant="outline" className="h-10 text-slate-600 bg-white"><Filter className="mr-2 h-4 w-4" /> Filter Status</Button>
               </div>
               
               <div className="overflow-x-auto min-h-[400px]">
                   <table className="w-full text-sm text-left">
                       <thead className="bg-white border-b border-border text-xs uppercase text-slate-500 font-semibold">
                           <tr>
                               <th className="px-6 py-4">App Ref</th>
                               <th className="px-6 py-4">Trademark Name</th>
                               <th className="px-6 py-4">Form Type</th>
                               <th className="px-6 py-4">Submitted Date</th>
                               <th className="px-6 py-4">Payment</th>
                               <th className="px-6 py-4">Status</th>
                               <th className="px-6 py-4 text-right">Actions</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-border">
                           {filteredApps.map(app => (
                               <tr key={app.id} className="hover:bg-slate-50 transition">
                                   <td className="px-6 py-4 font-medium text-primary"><Link href={`/external/applications/${app.id}`}>{app.id}</Link></td>
                                   <td className="px-6 py-4 font-bold text-slate-900">{app.trademark_name}</td>
                                   <td className="px-6 py-4 text-slate-500">{app.form_type}</td>
                                   <td className="px-6 py-4 text-slate-600">{app.submitted_date}</td>
                                   <td className="px-6 py-4">
                                       {app.payment_status === 'PAID' ? 
                                          <span className="text-green-600 font-medium">PAID</span> : 
                                          <span className="text-amber-600 font-medium whitespace-nowrap">PENDING PAYMENT</span>
                                       }
                                   </td>
                                   <td className="px-6 py-4">
                                       <Badge variant="outline" className={
                                           app.status === 'UNDER_REVIEW' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                           app.status === 'REQUIRES_RECTIFICATION' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                           app.status === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' :
                                           app.status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                                       }>{app.status.replace(/_/g, ' ')}</Badge>
                                   </td>
                                   <td className="px-6 py-4 text-right flex justify-end gap-2">
                                       <Link href={`/external/applications/${app.id}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 shadow-none bg-white font-semibold")}>
                                           Details
                                       </Link>
                                   </td>
                               </tr>
                           ))}
                           {filteredApps.length === 0 && (
                               <tr>
                                   <td colSpan={7} className="px-6 py-16 text-center text-slate-500 bg-slate-50/30">
                                       <div className="flex flex-col items-center">
                                           <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4"><Search className="h-6 w-6 text-slate-400" /></div>
                                           <p className="font-medium text-slate-900 mb-1">No applications found</p>
                                           <p className="text-sm">We couldn't find any applications matching your criteria.</p>
                                       </div>
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
