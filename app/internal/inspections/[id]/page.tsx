'use client';

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { ChevronRight, ArrowRight, ShieldCheck, AlertOctagon, Info, FileSpreadsheet } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useInspectionsStore } from "@/store/inspectionsStore";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { toast } from "sonner";

export default function InspectionDetails() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const role = session?.user?.role;
  
  const inspections = useInspectionsStore(state => state.inspections);
  const recordOutcome = useInspectionsStore(state => state.recordOutcome);

  const insp = inspections.find(i => i.id === params.id);
  const [report, setReport] = useState("");

  if (!insp) return <div className="p-10">Inspection not found.</div>;

  const handleOutcome = (outcome: 'DETAIN' | 'CLEAR') => {
      if (outcome === 'DETAIN') {
           toast.success("Shipment Detained. Escalating to Enforcement workflow.");
      } else {
           toast.success("Shipment Cleared. Notification sent to CFA.");
      }
      recordOutcome(insp.id, outcome);
      setTimeout(() => router.push('/internal/inspections'), 1500);
  };

  return (
    <main className="flex-1 overflow-auto p-6 md:p-10 bg-slate-50/50">
        <MotionWrapper className="max-w-7xl mx-auto flex flex-col h-full">
            
            <div className="mb-6 flex items-center space-x-2 text-sm text-slate-500">
               <Link href="/internal/inspections" className="hover:text-primary transition">Port Inspections</Link>
               <ChevronRight className="h-4 w-4" />
               <span className="text-slate-900 font-medium">Verify {insp.id}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Left Panel: Details */}
                <div className="flex-1 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6 md:p-8 border-b border-border">
                            <div className="flex justify-between items-start mb-6">
                               <div>
                                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">{insp.importer_name}</h1>
                                  <div className="text-slate-500 font-mono text-sm inline-flex items-center">
                                      <FileSpreadsheet className="h-4 w-4 mr-1.5" /> TANOGA Ref: <span className="font-semibold text-slate-700 ml-1">{insp.tanoga_ref}</span>
                                  </div>
                               </div>
                               <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 shadow-none px-3 py-1">
                                   {insp.status.replace(/_/g, ' ')}
                               </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm bg-slate-50 p-6 rounded-xl border border-slate-100">
                               <div>
                                   <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Vessel & Voyage</div>
                                   <div className="font-semibold text-slate-900">{insp.vessel_name}</div>
                                   <div className="text-slate-600">{insp.voyage_no}</div>
                               </div>
                               <div>
                                   <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Port & Arrival</div>
                                   <div className="font-semibold text-slate-900">{insp.port}</div>
                                   <div className="text-slate-600">{insp.arrival_date}</div>
                               </div>
                               <div className="col-span-2 pt-2 border-t border-slate-200 mt-2">
                                   <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Declared Goods</div>
                                   <div className="font-semibold text-slate-900 text-base">{insp.goods_description}</div>
                               </div>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 bg-amber-50">
                            <div className="flex items-start space-x-3 mb-4">
                                <AlertOctagon className="h-6 w-6 text-amber-600 shrink-0" />
                                <div>
                                    <h3 className="font-bold text-amber-900 mb-1">System Alert: Intellectual Property Match</h3>
                                    <p className="text-sm text-amber-800 leading-relaxed">The customs declaration matches HS codes and keywords associated with actively recorded trademarks. Field inspection is mandated before clearance.</p>
                                </div>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm mt-4">
                                <h4 className="font-semibold text-slate-900 text-sm mb-3 uppercase tracking-wide">Potential Trademark Matches</h4>
                                <div className="space-y-3">
                                   <div className="flex justify-between items-center bg-slate-50 p-3 rounded-md border border-slate-100">
                                      <div>
                                          <div className="font-bold text-slate-900">COCA-COLA</div>
                                          <div className="text-xs text-slate-500 mt-0.5">Recorded by: Coca-Cola Kwanza East Africa Ltd</div>
                                      </div>
                                      <Button variant="outline" size="sm" className="bg-white font-medium text-xs">View Registry Entry</Button>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Actions */}
                <div className="w-full lg:w-96 flex flex-col gap-6">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sticky top-6">
                        <h3 className="font-semibold text-slate-900 text-lg mb-4">Digital Inspection Report</h3>
                        
                        <div className="text-sm text-slate-600 mb-6 bg-slate-50 text-slate-800 p-3 rounded-lg border border-slate-100 flex items-start space-x-2">
                           <Info className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                           <span>Please complete physical verification and record findings. Detaining the shipment will automatically notify the Trademark Owner and CFA.</span>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="space-y-2">
                                <Label>Inspection Findings *</Label>
                                <Textarea 
                                    className="resize-none h-32 focus-visible:ring-indigo-500 shadow-inner" 
                                    placeholder="Enter physical inspection findings, discrepancies, batch numbers, and counterfeit indicators observed..."
                                    value={report}
                                    onChange={(e) => setReport(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button 
                               className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-bold"
                               onClick={() => handleOutcome('DETAIN')}
                               disabled={!report || insp.status === 'DETAINED'}
                            >
                                <AlertOctagon className="mr-2 h-4 w-4" /> Detain Shipment & Flag Counterfeit
                            </Button>
                            <Button 
                               className="w-full h-11" variant="outline"
                               onClick={() => handleOutcome('CLEAR')}
                               disabled={!report || insp.status === 'CLEARED'}
                            >
                                <ShieldCheck className="mr-2 h-4 w-4" /> Clear Shipment (Genuine)
                            </Button>
                        </div>
                    </div>
                </div>
                
            </div>

        </MotionWrapper>
    </main>
  );
}
