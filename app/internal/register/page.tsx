'use client';

import { useState } from "react";
import { Search, Filter, ShieldCheck, Download, Edit } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTrademarksStore } from "@/store/trademarksStore";
import { MotionWrapper } from "@/components/shared/MotionWrapper";

export default function InternalRegister() {
  const trademarks = useTrademarksStore(state => state.trademarks);
  const [search, setSearch] = useState("");

  const filteredTms = trademarks.filter(t => 
      t.trademark_name.toLowerCase().includes(search.toLowerCase()) || 
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.owner_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-auto p-6 md:p-10 bg-slate-50/50">
        <MotionWrapper className="max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
               <div>
                   <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Internal Official Register</h1>
                   <p className="text-slate-500">Master database of all legally recorded trademarks in the FCC system.</p>
               </div>
               <Button variant="outline" className="bg-white"><Download className="mr-2 h-4 w-4" /> Export CSV / PDF</Button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-10">
               <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row gap-4">
                   <div className="relative flex-1">
                       <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                       <Input 
                          placeholder="Search Registry by Name, ID, or Owner..." 
                          className="pl-9 h-10 w-full md:w-96 text-sm"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)} 
                       />
                   </div>
                   <div className="flex gap-2">
                       <Button variant="outline" className="h-10 text-slate-600 bg-white text-sm"><Filter className="mr-2 h-4 w-4" /> Filter Advanced</Button>
                   </div>
               </div>
               
               <div className="overflow-x-auto min-h-[500px]">
                   <table className="w-full text-sm text-left">
                       <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                           <tr>
                               <th className="px-6 py-4">Register ID</th>
                               <th className="px-6 py-4">Trademark (Word Mark)</th>
                               <th className="px-6 py-4">Owner / Rights Holder</th>
                               <th className="px-6 py-4">Coverage Classes</th>
                               <th className="px-6 py-4">Registration Expiry</th>
                               <th className="px-6 py-4">Status</th>
                               <th className="px-6 py-4 text-right">Actions</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                           {filteredTms.map(tm => (
                               <tr key={tm.id} className="hover:bg-slate-50/80 transition">
                                   <td className="px-6 py-5 font-semibold text-primary">{tm.id}</td>
                                   <td className="px-6 py-5">
                                       <div className="font-bold text-slate-900">{tm.trademark_name}</div>
                                       {tm.brela_verified && <div className="text-xs text-green-600 mt-1 flex items-center"><ShieldCheck className="h-3 w-3 mr-1"/> BRELA Confirmed</div>}
                                   </td>
                                   <td className="px-6 py-5">
                                      <div className="font-medium text-slate-700">{tm.owner_name}</div>
                                      <div className="text-xs text-slate-500 mt-0.5">{tm.manufacturer?.country || 'Unknown'}</div>
                                   </td>
                                   <td className="px-6 py-5 text-slate-600 font-medium">
                                       {tm.classes?.map((c:any)=>c.number).join(', ') || 'N/A'}
                                   </td>
                                   <td className="px-6 py-5 text-slate-600">{tm.expiry_date || 'N/A'}</td>
                                   <td className="px-6 py-5">
                                       <Badge variant="outline" className={
                                           tm.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border-green-200 shadow-none' :
                                           tm.status === 'EXPIRING_SOON' ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-none' :
                                           'bg-red-50 text-red-700 border-red-200 shadow-none'
                                       }>{tm.status.replace(/_/g, ' ')}</Badge>
                                   </td>
                                   <td className="px-6 py-5 text-right flex justify-end gap-2">
                                       <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
                                           <Edit className="h-4 w-4" />
                                       </Button>
                                   </td>
                               </tr>
                           ))}
                           {filteredTms.length === 0 && (
                               <tr>
                                   <td colSpan={7} className="px-6 py-16 text-center text-slate-500 bg-slate-50/30">
                                       No records found in Official Register.
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
