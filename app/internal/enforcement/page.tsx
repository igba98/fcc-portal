'use client';

import { useState } from "react";
import Link from 'next/link';
import { Search, Gavel, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useEnforcementStore } from "@/store/enforcementStore";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { toast } from "sonner";

export default function EnforcementCases() {
  const cases = useEnforcementStore(state => state.cases);
  const generateFormG = useEnforcementStore(state => state.generateFormG);
  const recordPayment = useEnforcementStore(state => state.recordPayment);
  
  const [search, setSearch] = useState("");

  const filtered = cases.filter(c => 
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.importer_name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleGenerateFormG = (id: string) => {
      generateFormG(id);
      toast.success("Notice of Seizure (Form G) generated and served digitally.");
  };

  const handleSimulatePayment = (id: string) => {
      recordPayment(id, { method: "GePG", amount: 15000000 });
      toast.success("Fine payment recorded. Case updated.");
  };

  return (
    <main className="flex-1 overflow-auto p-6 md:p-10 bg-slate-50/50">
        <MotionWrapper className="max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
               <div>
                   <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Enforcement & Infringements</h1>
                   <p className="text-slate-500">Manage compounding of offenses, Form G generation, and destructions.</p>
               </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-10">
               <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row gap-4">
                   <div className="relative flex-1">
                       <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                       <Input 
                          placeholder="Search cases or violators..." 
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
                               <th className="px-6 py-4">Case Ref</th>
                               <th className="px-6 py-4">Violator Details</th>
                               <th className="px-6 py-4">Infringement</th>
                               <th className="px-6 py-4">Status</th>
                               <th className="px-6 py-4 text-right">Actions</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                           {filtered.map(c => (
                               <tr key={c.id} className="hover:bg-amber-50/50 transition">
                                   <td className="px-6 py-5 font-bold text-slate-900">{c.id}</td>
                                   <td className="px-6 py-5">
                                       <div className="font-semibold text-slate-900">{c.importer_name}</div>
                                       <div className="text-xs text-slate-500 mt-1">{c.importer_contact || 'N/A'}</div>
                                   </td>
                                   <td className="px-6 py-5">
                                       <div className="font-medium text-slate-700">{c.infringement_type}</div>
                                       <div className="text-xs text-primary font-semibold mt-1">Found via {c.source_inspection_id}</div>
                                   </td>
                                   <td className="px-6 py-5">
                                       <Badge variant="outline" className={
                                           c.status === 'COMPOUNDMENT_IN_PROGRESS' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                           c.status === 'RESOLVED' ? 'bg-green-50 text-green-700 border-green-200' :
                                           'bg-red-50 text-red-700 border-red-200'
                                       }>{c.status.replace(/_/g, ' ')}</Badge>
                                       {c.payment_status === 'PAID' && <div className="text-[10px] text-green-600 font-bold mt-1 uppercase">● Fine Paid</div>}
                                   </td>
                                   <td className="px-6 py-5 text-right flex justify-end gap-2">
                                       {!c.form_g_generated && (
                                           <Button onClick={() => handleGenerateFormG(c.id)} size="sm" className="h-8 bg-slate-900 text-white font-medium hover:bg-slate-800">
                                               <FileText className="mr-1.5 h-3.5 w-3.5" /> Issue Form G
                                           </Button>
                                       )}
                                       {c.form_g_generated && c.payment_status !== 'PAID' && (
                                           <Button onClick={() => handleSimulatePayment(c.id)} size="sm" variant="outline" className="h-8 text-green-700 border-green-200 hover:bg-green-50 font-medium">
                                               <Gavel className="mr-1.5 h-3.5 w-3.5" /> Set Fine Paid
                                           </Button>
                                       )}
                                       {c.payment_status === 'PAID' && c.status !== 'RESOLVED' && (
                                           <Button size="sm" variant="outline" className="h-8 font-medium">
                                               <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-green-600" /> Issue Warehouse Rx
                                           </Button>
                                       )}
                                   </td>
                               </tr>
                           ))}
                           {filtered.length === 0 && (
                               <tr>
                                   <td colSpan={5} className="px-6 py-16 text-center text-slate-500 bg-slate-50/30">
                                       <div className="flex flex-col items-center justify-center">
                                           <Gavel className="h-10 w-10 text-slate-300 mb-4" />
                                           <p className="font-medium text-slate-900 mb-1">No active enforcement cases</p>
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
