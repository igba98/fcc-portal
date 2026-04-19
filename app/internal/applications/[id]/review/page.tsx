'use client';

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { ChevronRight, FileText, CheckCircle2, XCircle, FileClock, Link2, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useApplicationsStore } from "@/store/applicationsStore";
import { useTrademarksStore } from "@/store/trademarksStore";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReviewApplication() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const role = session?.user?.role;
  
  const applications = useApplicationsStore(state => state.applications);
  const updateStatus = useApplicationsStore(state => state.updateStatus);
  const addNote = useApplicationsStore(state => state.addNote);
  const addTrademark = useTrademarksStore(state => state.addTrademark);

  const app = applications.find(a => a.id === params.id);
  const [note, setNote] = useState("");

  if (!app) return <div className="p-10">Application not found.</div>;

  const handleAction = (action: 'APPROVE' | 'REJECT' | 'RECTIFY') => {
      let newStatus = app.status;
      
      if (role === 'TRO') {
          addNote(app.id, `TRO Recommendation: ${action}. ${note}`);
          newStatus = action === 'RECTIFY' ? 'REQUIRES_RECTIFICATION' : 'UNDER_REVIEW'; // passes to ACEM
          toast.success("Recommendation recorded and forwarded to ACEM.");
      } else if (role === 'ACEM') {
          addNote(app.id, `ACEM Decision: ${action}. ${note}`);
          toast.success("Decision recorded and forwarded to DAC.");
      } else if (role === 'DAC') {
          addNote(app.id, `DAC Decision: ${action}. ${note}`);
          toast.success("Forwarded to Chief Inspector.");
      } else if (role === 'CHIEF_INSPECTOR') {
          addNote(app.id, `CI Final Decision: ${action}. ${note}`);
          newStatus = action === 'APPROVE' ? 'APPROVED' : action === 'REJECT' ? 'REJECTED' : 'REQUIRES_RECTIFICATION';
          
          if (newStatus === 'APPROVED') {
              // Create Trademark from app
              addTrademark({
                 id: `TM-2026-${Math.floor(Math.random()*9000).toString()}`,
                 trademark_name: app.trademark_name,
                 owner_id: app.applicant_id,
                 owner_name: app.applicant_name,
                 status: "ACTIVE",
                 certificate_no: `FCC-CERT-2026-${Math.floor(Math.random()*900).toString()}`,
                 classes: app.trademark_classes ? app.trademark_classes.split(',').map((c:string)=>({number:c.trim()})) : [],
                 recorded_date: new Date().toISOString().split('T')[0],
                 expiry_date: "2031-01-01" // Simple 5 yr mock
              });
          }
          toast.success(`Application ${newStatus} successfully.`);
      }

      updateStatus(app.id, newStatus);
      setTimeout(() => router.push('/internal/applications'), 1500);
  };

  return (
    <main className="flex-1 overflow-auto p-6 md:p-10 bg-slate-50/50">
        <MotionWrapper className="max-w-7xl mx-auto flex flex-col h-full">
            
            <div className="mb-6 flex items-center space-x-2 text-sm text-slate-500">
               <Link href="/internal/applications" className="hover:text-primary transition">Applications</Link>
               <ChevronRight className="h-4 w-4" />
               <span className="text-slate-900 font-medium">Review {app.id}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Left Panel: App details */}
                <div className="flex-1 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-8">
                        <div className="flex justify-between items-start border-b border-border pb-6 mb-6">
                           <div>
                              <h1 className="text-3xl font-bold tracking-tight text-slate-900">{app.trademark_name}</h1>
                              <div className="text-slate-500 mt-1">Application Ref: {app.id}</div>
                           </div>
                           <Badge variant="outline" className="text-sm bg-blue-50 text-blue-700 border-blue-200 shadow-none px-3 py-1">
                               {app.status.replace(/_/g, ' ')}
                           </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm mt-6">
                           <div>
                               <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Applicant</div>
                               <div className="font-semibold text-slate-900">{app.applicant_name}</div>
                               <div className="text-slate-500">{app.applicant_type}</div>
                           </div>
                           <div>
                               <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Manufacturer Details</div>
                               <div className="font-semibold text-slate-900">{app.manufacturer_name || 'N/A'}</div>
                               <div className="text-slate-500">{app.manufacturer_country || 'N/A'}</div>
                           </div>
                           <div className="col-span-2">
                               <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Goods Description</div>
                               <div className="text-slate-800 leading-relaxed max-w-prose">{app.goods_description || 'Detailed description of goods registered under this trademark.'}</div>
                           </div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                       <Tabs defaultValue="documents" className="w-full">
                          <TabsList className="w-full justify-start rounded-none border-b border-slate-200 bg-slate-50 h-[52px] px-4">
                              <TabsTrigger value="documents" className="h-full data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Attached Documents</TabsTrigger>
                              <TabsTrigger value="audit" className="h-full data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Audit Trail</TabsTrigger>
                          </TabsList>
                          <TabsContent value="documents" className="p-6 m-0 bg-white">
                              <div className="space-y-4">
                                  {app.documents?.map((doc:any, idx:number) => (
                                     <div key={idx} className="flex justify-between items-center p-4 border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 rounded-lg transition">
                                        <div className="flex items-center space-x-3">
                                           <div className={`p-2 rounded bg-opacity-10 ${doc.verified ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                               {doc.verified ? <CheckCircle2 className="h-5 w-5" /> : <FileClock className="h-5 w-5" />}
                                           </div>
                                           <div>
                                               <div className="font-semibold text-sm text-slate-900">{doc.type.replace(/_/g, ' ')}</div>
                                               <div className="text-xs text-slate-500">{doc.filename}</div>
                                           </div>
                                        </div>
                                        <Button variant="outline" size="sm" className="h-8 shadow-none bg-white">View</Button>
                                     </div>
                                  ))}
                              </div>
                              <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-start space-x-3">
                                  <Link2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                  <div>
                                      <div className="font-semibold text-sm text-slate-900">BRELA Validation System API</div>
                                      <div className="text-xs text-slate-500 mt-1">Run an automated check against BRELA registry to verify the exact trademark certificate.</div>
                                      <Button variant="outline" size="sm" className="mt-3 bg-white shadow-none font-medium h-8 text-xs">Execute Verification Query</Button>
                                  </div>
                              </div>
                          </TabsContent>
                          <TabsContent value="audit" className="p-6 m-0 bg-white">
                              <div className="space-y-4">
                                  {app.audit_trail?.map((log:any, idx:number) => (
                                      <div key={idx} className="flex items-start space-x-3 text-sm border-b border-slate-50 pb-4 last:border-0">
                                           <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                                           <div>
                                               <div className="font-medium text-slate-900">{log.action.replace(/_/g, ' ')}</div>
                                               <div className="text-slate-600 mt-0.5">{log.note}</div>
                                               <div className="text-xs text-slate-400 mt-1">{new Date(log.timestamp).toLocaleString()} by {log.user_name || 'System'}</div>
                                           </div>
                                      </div>
                                  ))}
                              </div>
                          </TabsContent>
                       </Tabs>
                    </div>
                </div>

                {/* Right Panel: Actions */}
                <div className="w-full lg:w-96 flex flex-col gap-6">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sticky top-6">
                        <h3 className="font-semibold text-slate-900 text-lg mb-4">Internal Review</h3>
                        
                        <div className="text-sm text-slate-600 mb-6 bg-blue-50 text-blue-800 p-3 rounded-lg border border-blue-100 flex items-start space-x-2">
                           <Info className="h-4 w-4 shrink-0 mt-0.5" />
                           <span>You are reviewing as <strong>{role?.replace(/_/g, ' ')}</strong>. Please leave a note and select an action to advance the workflow.</span>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="space-y-2">
                                <Label>Assessment Note / Recommendation *</Label>
                                <Textarea 
                                    className="resize-none h-32 focus-visible:ring-primary shadow-inner" 
                                    placeholder="Enter your professional assessment and reasons for recommendation..."
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button 
                               className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-semibold"
                               onClick={() => handleAction('APPROVE')}
                               disabled={!note}
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" /> 
                                {role === 'CHIEF_INSPECTOR' ? 'Final Approval' : 'Recommend Approval'}
                            </Button>
                            <Button 
                               className="w-full h-11 bg-amber-600 hover:bg-amber-700 text-white font-semibold"
                               onClick={() => handleAction('RECTIFY')}
                               disabled={!note}
                            >
                                <FileClock className="mr-2 h-4 w-4" /> Request Rectification
                            </Button>
                            <Button 
                               className="w-full h-11" variant="destructive"
                               onClick={() => handleAction('REJECT')}
                               disabled={!note}
                            >
                                <XCircle className="mr-2 h-4 w-4" /> Recommend Rejection
                            </Button>
                        </div>
                    </div>
                </div>
                
            </div>

        </MotionWrapper>
    </main>
  );
}
