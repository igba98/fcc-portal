'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Users, Plus, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MotionWrapper } from '@/components/shared/MotionWrapper';

export default function UsersIndex() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  if (role !== 'CHIEF_INSPECTOR') {
      return <div className="p-10 text-center text-slate-500">Access Denied. Chief Inspector clearance required.</div>;
  }

  return (
    <main className="flex-1 overflow-auto p-6 md:p-10 bg-slate-50/50">
        <MotionWrapper className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-8">
               <div>
                   <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Staff Directory</h1>
                   <p className="text-slate-500">Manage internal FCC system access and role delegations.</p>
               </div>
               <Link href="/internal/users/new">
                   <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-semibold h-11 px-6">
                       <Plus className="mr-2 h-4 w-4" /> Create New Staff Account
                   </Button>
               </Link>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-16 text-center shadow-sm">
                <ShieldCheck className="h-16 w-16 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Secure Module</h3>
                <p className="text-slate-500 max-w-sm mx-auto mb-6">Staff list is currently isolated in the prototype environment. Use the creation wizard to mock new hierarchy structures.</p>
                <Link href="/internal/users/new">
                    <Button variant="outline" className="font-semibold">Launch Creation Wizard</Button>
                </Link>
            </div>
        </MotionWrapper>
    </main>
  );
}
