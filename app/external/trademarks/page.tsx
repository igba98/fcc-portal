'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { Search, Filter, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTrademarksStore } from "@/store/trademarksStore";
import { MotionWrapper } from "@/components/shared/MotionWrapper";

export default function TrademarksList() {
  const { data: session } = useSession();
  const allTrademarks = useTrademarksStore(state => state.trademarks);
  const trademarks = allTrademarks;
  const [search, setSearch] = useState("");

  const filteredTms = trademarks.filter(t => 
      t.trademark_name.toLowerCase().includes(search.toLowerCase()) || 
      t.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-auto p-4 md:p-8 bg-background">
        <MotionWrapper className="container mx-auto max-w-6xl">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
               <div>
                   <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">My Trademarks</h1>
                   <p className="text-slate-500">Portfolio of your recorded trademarks and active protections.</p>
               </div>
            </div>

            <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden mb-10">
               <div className="p-4 border-b border-border bg-slate-50/50 flex flex-col sm:flex-row gap-4">
                   <div className="relative flex-1">
                       <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                       <Input 
                          placeholder="Search portfolio..." 
                          className="pl-9 h-10 w-full md:w-96"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)} 
                       />
                   </div>
                   <Button variant="outline" className="h-10 text-slate-600 bg-white"><Filter className="mr-2 h-4 w-4" /> Status</Button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                   {filteredTms.map(tm => (
                       <div key={tm.id} className="border border-border rounded-xl p-6 hover:shadow-md transition bg-white relative">
                          <div className="absolute top-4 right-4">
                              <Badge variant="outline" className={tm.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}>
                                  {tm.status.replace(/_/g, ' ')}
                              </Badge>
                          </div>
                          
                          <div className="mb-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 shrink-0">
                                  {tm.status === 'ACTIVE' ? <ShieldCheck className="h-6 w-6 text-primary" /> : <AlertCircle className="h-6 w-6 text-amber-600" />}
                              </div>
                              <div className="text-sm text-slate-500 font-medium mb-1 truncate" title={tm.id}>{tm.id}</div>
                              <h3 className="text-xl font-bold text-slate-900 truncate" title={tm.trademark_name}>{tm.trademark_name}</h3>
                          </div>
                          
                          <div className="space-y-2 mb-6">
                              <div className="flex justify-between items-center text-sm gap-2">
                                 <span className="text-slate-500 shrink-0">Expiry Date:</span>
                                 <span className="font-medium text-slate-900 truncate" title={tm.expiry_date}>{tm.expiry_date}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm gap-2">
                                 <span className="text-slate-500 shrink-0">Classes:</span>
                                 <span className="font-medium text-slate-900 truncate" title={tm.classes?.map((c:any)=>c.number).join(', ')}>{tm.classes?.map((c:any)=>c.number).join(', ') || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm gap-2">
                                 <span className="text-slate-500 shrink-0">Certificate No:</span>
                                 <span className="font-medium text-slate-900 truncate" title={tm.certificate_no || 'Pending'}>{tm.certificate_no || 'Pending'}</span>
                              </div>
                          </div>
                          
                          <div className="flex gap-2 pt-4 border-t border-slate-100">
                             <Button variant="outline" className="w-full">Details</Button>
                             {tm.status === 'EXPIRING_SOON' && (
                                 <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">Renew</Button>
                             )}
                          </div>
                       </div>
                   ))}
               </div>

               {filteredTms.length === 0 && (
                   <div className="px-6 py-16 text-center text-slate-500">
                       <p className="font-medium text-slate-900">No trademarks found.</p>
                       <p className="text-sm mt-1">If you have pending applications, they will appear here once approved.</p>
                   </div>
               )}
            </div>

        </MotionWrapper>
    </main>
  );
}
