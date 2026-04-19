'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Download, FileBadge, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTrademarksStore } from "@/store/trademarksStore";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { downloadCertificate } from "@/lib/pdf";

export default function CertificatesList() {
  const { data: session } = useSession();
  const allTrademarks = useTrademarksStore(state => state.trademarks);
  const trademarks = allTrademarks.filter(t => t.certificate_no);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (tm: any) => {
      setDownloadingId(tm.id);
      try {
          await downloadCertificate(tm);
      } finally {
          setDownloadingId(null);
      }
  };

  return (
    <main className="flex-1 overflow-auto p-4 md:p-8 bg-background">
        <MotionWrapper className="container mx-auto max-w-5xl">
            
            <div className="mb-8">
               <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Digital Certificates</h1>
               <p className="text-slate-500">View and download your official FCC Recordation Certificates.</p>
            </div>

            <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden mb-10">
               <div className="overflow-x-auto min-h-[300px]">
                   <table className="w-full text-sm text-left">
                       <thead className="bg-slate-50 border-b border-border text-xs uppercase text-slate-500 font-semibold">
                           <tr>
                               <th className="px-6 py-4">Certificate No</th>
                               <th className="px-6 py-4">Trademark</th>
                               <th className="px-6 py-4">Issue Date</th>
                               <th className="px-6 py-4">Valid Until</th>
                               <th className="px-6 py-4">Status</th>
                               <th className="px-6 py-4 text-right">Download</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-border">
                           {trademarks.map(tm => (
                               <tr key={tm.id} className="hover:bg-slate-50 transition">
                                   <td className="px-6 py-4 font-semibold text-primary">{tm.certificate_no}</td>
                                   <td className="px-6 py-4 font-bold text-slate-900">{tm.trademark_name}</td>
                                   <td className="px-6 py-4 text-slate-600">{tm.recorded_date}</td>
                                   <td className="px-6 py-4 text-slate-600">{tm.expiry_date}</td>
                                   <td className="px-6 py-4">
                                       <Badge variant="outline" className={tm.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}>
                                           {tm.status === 'ACTIVE' ? 'VALID' : 'EXPIRING SOON'}
                                       </Badge>
                                   </td>
                                   <td className="px-6 py-4 text-right">
                                       <Button onClick={() => handleDownload(tm)} variant="outline" size="sm" className="h-8 shadow-none bg-white min-w-[100px]" disabled={downloadingId === tm.id}>
                                           {downloadingId === tm.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />} PDF
                                       </Button>
                                   </td>
                               </tr>
                           ))}
                           {trademarks.length === 0 && (
                               <tr>
                                   <td colSpan={6} className="px-6 py-16 text-center text-slate-500 bg-slate-50/30">
                                       <div className="flex flex-col items-center">
                                           <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4"><FileBadge className="h-6 w-6 text-slate-400" /></div>
                                           <p className="font-medium text-slate-900 mb-1">No Certificates Yet</p>
                                           <p className="text-sm">Certificates will appear here once your applications are approved.</p>
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
