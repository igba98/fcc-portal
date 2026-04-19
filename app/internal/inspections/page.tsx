'use client';

import { useState } from "react";
import Link from 'next/link';
import { Search, MapPin, RefreshCw, Ship, ArrowUpRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useInspectionsStore } from "@/store/inspectionsStore";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function InspectionsQueue() {
  const inspections = useInspectionsStore(state => state.inspections);
  const syncTANOGA = useInspectionsStore(state => state.syncTANOGA);
  const [search, setSearch] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const filtered = inspections.filter(i => {
      const searchLower = search.toLowerCase();
      return (
          (i.importer_name || '').toLowerCase().includes(searchLower) || 
          (i.id || '').toLowerCase().includes(searchLower) ||
          (i.tanoga_ref || '').toLowerCase().includes(searchLower)
      );
  });

  const handleSync = () => {
     setIsSyncing(true);
     setTimeout(() => {
         syncTANOGA();
         setIsSyncing(false);
         toast.success("Synchronized successfully with TANOGA Customs System.");
     }, 1500);
  };

  return (
    <main className="flex-1 overflow-auto p-6 md:p-10 bg-slate-50/50">
        <MotionWrapper className="max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
               <div>
                   <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Border Enforcement & Inspections</h1>
                   <p className="text-slate-500">Coordinate and execute field verifications of flagged shipments at ports of entry.</p>
               </div>
               <Button onClick={handleSync} disabled={isSyncing} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-semibold h-11 px-6">
                   <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} /> Sync TANOGA
               </Button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-10">
               <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row gap-4">
                   <div className="relative flex-1">
                       <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                       <Input 
                          placeholder="Search consignments, importers or TANOGA references..." 
                          className="pl-9 h-10 w-full md:w-96 text-sm"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)} 
                       />
                   </div>
               </div>
               
               <div className="overflow-x-auto min-h-[500px]">
                   <table className="w-full text-sm text-left">
                       <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                           <tr>
                               <th className="px-6 py-4">Consignment / Importer</th>
                               <th className="px-6 py-4">TANOGA Ref & Port</th>
                               <th className="px-6 py-4">Arrival Date</th>
                               <th className="px-6 py-4">CSO Assigned</th>
                               <th className="px-6 py-4">Status</th>
                               <th className="px-6 py-4 text-right">Action</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                           {filtered.map(insp => (
                               <tr key={insp.id} className="hover:bg-slate-50/80 transition">
                                   <td className="px-6 py-5">
                                       <div className="font-bold text-slate-900">{insp.importer_name}</div>
                                       <div className="text-xs font-semibold text-slate-500 mt-1">{insp.goods_description}</div>
                                   </td>
                                   <td className="px-6 py-5">
                                       <div className="font-mono text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 inline-block mb-1 tracking-wide">{insp.tanoga_ref}</div>
                                       <div className="text-xs text-slate-500 flex items-center mt-1"><MapPin className="h-3 w-3 mr-1" /> {insp.port}</div>
                                   </td>
                                   <td className="px-6 py-5 text-slate-600 font-medium">
                                       {insp.arrival_date}
                                   </td>
                                   <td className="px-6 py-5 text-slate-600">
                                       {insp.assigned_cso_name || 'Unassigned'}
                                   </td>
                                   <td className="px-6 py-5">
                                       <Badge variant="outline" className={
                                           insp.status === 'ASSIGNED' ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-none' :
                                           insp.status === 'MATCH_FOUND' ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-none' :
                                           insp.status === 'CLEARED' ? 'bg-green-50 text-green-700 border-green-200 shadow-none' :
                                           'bg-red-50 text-red-700 border-red-200 shadow-none'
                                       }>{insp.status.replace(/_/g, ' ')}</Badge>
                                   </td>
                                   <td className="px-6 py-5 text-right flex justify-end gap-2">
                                       <Link href={`/internal/inspections/${insp.id}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 shadow-sm font-medium flex items-center")}>
                                           Action <ArrowUpRight className="ml-1.5 h-3 w-3" />
                                       </Link>
                                   </td>
                               </tr>
                           ))}
                           {filtered.length === 0 && (
                               <tr>
                                   <td colSpan={6} className="px-6 py-16 text-center text-slate-500 bg-slate-50/30">
                                       <div className="flex flex-col items-center justify-center">
                                           <Ship className="h-10 w-10 text-slate-300 mb-4" />
                                           <p className="font-medium text-slate-900 mb-1">No inspections pending</p>
                                           <p className="text-sm">Click "Sync TANOGA" to pull the latest flagged shipments from Customs.</p>
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
