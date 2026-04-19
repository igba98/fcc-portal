'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { ChevronRight, UploadCloud, CheckCircle2, FileText, ArrowRight, ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApplicationsStore } from "@/store/applicationsStore";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { toast } from "sonner";
import { mockGepg } from "@/data/mock-gepg";

export default function NewApplication() {
  const router = useRouter();
  const { data: session } = useSession();
  const addApplication = useApplicationsStore(state => state.addApplication);
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gepgNo, setGepgNo] = useState("");
  const [formData, setFormData] = useState({
     trademark_name: '',
     manufacturer_name: '',
     manufacturer_country: '',
     trademark_classes: '',
     goods_description: ''
  });

  const generateGepg = () => {
     setIsSubmitting(true);
     setTimeout(() => {
         setGepgNo(`GEPG-2026-${Math.floor(Math.random() * 90000) + 10000}`);
         setIsSubmitting(false);
         setStep(4);
         toast.success("GePG Control Number Generated successfully.");
     }, 1500);
  };

  const simulatePaymentAndSubmit = () => {
     setIsSubmitting(true);
     setTimeout(() => {
         addApplication({
             id: `APP-2026-${Math.floor(Math.random() * 9000).toString().padStart(4, '0')}`,
             application_type: "NEW_RECORDATION",
             form_type: "FCC_FORM_1",
             trademark_name: formData.trademark_name || "New Trademark",
             applicant_id: session?.user?.id || 'u007',
             applicant_name: session?.user?.name || '',
             applicant_type: session?.user?.role === 'AUTHORIZED_AGENT' ? 'AGENT' : 'TRADEMARK_OWNER',
             status: "UNDER_REVIEW",
             submitted_date: new Date().toISOString().split('T')[0],
             payment_status: "PAID",
             gepg_control_no: gepgNo,
             payment_amount_tzs: 200000,
             documents: [
                { type: "TRADEMARK_REGISTRATION_CERTIFICATE", filename: "cert.pdf", verified: false }
             ]
         });
         setIsSubmitting(false);
         toast.success("Payment Received. Application Submitted!");
         router.push('/external/applications');
     }, 2000);
  };

  return (
    <main className="flex-1 overflow-auto p-4 md:p-8 bg-background">
        <MotionWrapper className="container mx-auto max-w-4xl">
            
            <div className="mb-8 flex items-center space-x-2 text-sm text-slate-500">
               <Link href="/external/dashboard" className="hover:text-primary transition">Dashboard</Link>
               <ChevronRight className="h-4 w-4" />
               <Link href="/external/applications" className="hover:text-primary transition">Applications</Link>
               <ChevronRight className="h-4 w-4" />
               <span className="text-slate-900 font-medium">New Recordation</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">Record New Trademark</h1>

            <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
               {/* Stepper */}
               <div className="bg-slate-50 border-b border-border p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  {[
                    { s: 1, title: 'Details', icon: FileText },
                    { s: 2, title: 'Documents', icon: UploadCloud },
                    { s: 3, title: 'GePG Generation', icon: CreditCard },
                    { s: 4, title: 'Payment & Submit', icon: CheckCircle2 }
                  ].map((st, i) => (
                      <div key={st.s} className={`flex items-center space-x-3 ${step === st.s ? 'opacity-100' : 'opacity-40'}`}>
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= st.s ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
                            <st.icon className="h-5 w-5" />
                         </div>
                         <div className="hidden sm:block">
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Step {st.s}</div>
                            <div className="font-semibold text-slate-900">{st.title}</div>
                         </div>
                      </div>
                  ))}
               </div>

               <div className="p-8">
                  {step === 1 && (
                      <div className="space-y-6">
                         <h2 className="text-xl font-semibold mb-6">Trademark Information</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Trademark Name *</Label>
                                <Input placeholder="e.g. COCA-COLA" value={formData.trademark_name} onChange={e => setFormData({...formData, trademark_name: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <Label>Classes (Comma separated) *</Label>
                                <Input placeholder="e.g. 9, 32, 35" value={formData.trademark_classes} onChange={e => setFormData({...formData, trademark_classes: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <Label>Manufacturer Name *</Label>
                                <Input placeholder="Legal name of manufacturer" value={formData.manufacturer_name} onChange={e => setFormData({...formData, manufacturer_name: e.target.value})}/>
                            </div>
                            <div className="space-y-2">
                                <Label>Manufacturer Country *</Label>
                                <Input placeholder="e.g. United States" value={formData.manufacturer_country} onChange={e => setFormData({...formData, manufacturer_country: e.target.value})}/>
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label>Description of Goods *</Label>
                                <Textarea className="resize-none" rows={3} placeholder="Provide a detailed description of the goods..." value={formData.goods_description} onChange={e => setFormData({...formData, goods_description: e.target.value})}/>
                            </div>
                         </div>
                         <div className="pt-6 flex justify-end">
                            <Button className="h-12 px-8 bg-primary text-white font-semibold" onClick={() => setStep(2)}>Next: Upload Documents <ArrowRight className="ml-2 h-4 w-4" /></Button>
                         </div>
                      </div>
                  )}

                  {step === 2 && (
                      <div className="space-y-6">
                         <h2 className="text-xl font-semibold mb-6">Required Documents</h2>
                         
                         <div className="grid grid-cols-1 gap-4">
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 hover:border-primary/50 transition cursor-pointer bg-slate-50 flex items-center space-x-6">
                                <div className="p-4 bg-white rounded-full shadow-sm">
                                    <UploadCloud className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">BRELA Registration Certificate *</h3>
                                    <p className="text-sm text-slate-500 mt-1">Upload certified copy of your trademark registration (PDF)</p>
                                </div>
                            </div>
                            
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 hover:border-primary/50 transition cursor-pointer bg-slate-50 flex items-center space-x-6">
                                <div className="p-4 bg-white rounded-full shadow-sm">
                                    <UploadCloud className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Trademark Images *</h3>
                                    <p className="text-sm text-slate-500 mt-1">High resolution logos or product images (ZIP or PNG/JPG)</p>
                                </div>
                            </div>

                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 hover:border-primary/50 transition cursor-pointer bg-slate-50 flex items-center space-x-6">
                                <div className="p-4 bg-white rounded-full shadow-sm">
                                    <UploadCloud className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Evidence of Title *</h3>
                                    <p className="text-sm text-slate-500 mt-1">License agreement, assignment deed, etc (PDF)</p>
                                </div>
                            </div>
                         </div>

                         <div className="pt-6 flex justify-between">
                            <Button variant="outline" className="h-12 px-8" onClick={() => setStep(1)}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                            <Button className="h-12 px-8 bg-primary text-white font-semibold" onClick={generateGepg} disabled={isSubmitting}>
                               {isSubmitting ? "Generating..." : "Generate GePG Bill"} <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                         </div>
                      </div>
                  )}

                  {step === 4 && (
                      <div className="space-y-6 text-center py-6">
                         <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                             <CreditCard className="h-10 w-10 text-green-600" />
                         </div>
                         <h2 className="text-2xl font-bold mb-2">Pending Payment</h2>
                         <p className="text-slate-500 mb-8 max-w-md mx-auto">Your application is ready. Please complete the statutory fee payment using the GePG control number below.</p>
                         
                         <div className="bg-slate-50 rounded-xl border border-border p-6 max-w-md mx-auto mb-8 text-left space-y-4">
                             <div className="flex justify-between border-b pb-4">
                                <span className="text-slate-500 font-medium">Control Number:</span>
                                <span className="font-bold text-slate-900 text-lg tracking-wider bg-white px-3 py-1 rounded shadow-sm border border-slate-200">{gepgNo}</span>
                             </div>
                             <div className="flex justify-between border-b pb-4">
                                <span className="text-slate-500 font-medium">Amount Due:</span>
                                <span className="font-bold text-slate-900 text-lg">TZS 200,000</span>
                             </div>
                             <div className="flex justify-between">
                                <span className="text-slate-500 font-medium">Biller:</span>
                                <span className="font-semibold text-slate-900 text-sm mt-0.5">Fair Competition Commission</span>
                             </div>
                         </div>

                         <div className="flex justify-center flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <p className="text-xs text-slate-500 mb-4 sm:hidden">Pay via mobile money or bank transfer using the generated control number.</p>
                            <Button variant="outline" className="h-12 font-semibold">Print Bill</Button>
                            <Button className="h-12 bg-green-600 hover:bg-green-700 text-white font-semibold" onClick={simulatePaymentAndSubmit} disabled={isSubmitting}>
                                {isSubmitting ? "Verifying..." : "Simulate Payment & Submit Application"}
                            </Button>
                         </div>
                      </div>
                  )}
               </div>
            </div>

        </MotionWrapper>
    </main>
  );
}
