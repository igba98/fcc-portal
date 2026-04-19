'use client';

import { useSession } from "next-auth/react";
import { Download, Receipt } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockPayments } from "@/data/mock-payments";
import { MotionWrapper } from "@/components/shared/MotionWrapper";

export default function PaymentsList() {
  const { data: session } = useSession();
  
  // Note: we're using raw mock data since prompt didn't mandate a zustand store just for viewing payments
  const payments = mockPayments.filter(p => p.payer_id === session?.user?.id);

  return (
    <main className="flex-1 overflow-auto p-4 md:p-8 bg-background">
        <MotionWrapper className="container mx-auto max-w-5xl">
            
            <div className="mb-8">
               <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Payment History</h1>
               <p className="text-slate-500">View your transaction history and download official GePG receipts.</p>
            </div>

            <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden mb-10">
               <div className="overflow-x-auto min-h-[300px]">
                   <table className="w-full text-sm text-left">
                       <thead className="bg-slate-50 border-b border-border text-xs uppercase text-slate-500 font-semibold">
                           <tr>
                               <th className="px-6 py-4">Receipt No</th>
                               <th className="px-6 py-4">Amount (TZS)</th>
                               <th className="px-6 py-4">Control No</th>
                               <th className="px-6 py-4">Date</th>
                               <th className="px-6 py-4">Purpose</th>
                               <th className="px-6 py-4 text-right">Receipt</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-border">
                           {payments.map(payment => (
                               <tr key={payment.id} className="hover:bg-slate-50 transition">
                                   <td className="px-6 py-4 font-semibold text-slate-900">{payment.receipt_no || '-'}</td>
                                   <td className="px-6 py-4 font-bold text-slate-900">{payment.amount_tzs.toLocaleString()}</td>
                                   <td className="px-6 py-4 font-mono text-slate-600 tracking-wide text-xs">{payment.gepg_control_no}</td>
                                   <td className="px-6 py-4 text-slate-600">{payment.payment_date}</td>
                                   <td className="px-6 py-4 text-slate-600">{payment.payment_type}</td>
                                   <td className="px-6 py-4 text-right">
                                       <Button variant="outline" size="sm" className="h-8 shadow-none bg-white font-medium" disabled={payment.status !== 'PAID'}>
                                           <Download className="mr-2 h-4 w-4" /> Download
                                       </Button>
                                   </td>
                               </tr>
                           ))}
                           {payments.length === 0 && (
                               <tr>
                                   <td colSpan={6} className="px-6 py-16 text-center text-slate-500 bg-slate-50/30">
                                       <div className="flex flex-col items-center">
                                           <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4"><Receipt className="h-6 w-6 text-slate-400" /></div>
                                           <p className="font-medium text-slate-900 mb-1">No Payments Found</p>
                                           <p className="text-sm">Your payment history will appear here once transactions are processed.</p>
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
