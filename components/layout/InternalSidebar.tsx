'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { 
    Scale, LayoutDashboard, FileStack, BookOpen, 
    Search, ShieldAlert, Users, LogOut 
} from 'lucide-react';

export function InternalSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;

  const links = [
    { name: 'Dashboard', href: '/internal/dashboard', icon: LayoutDashboard },
    { name: 'Applications Queue', href: '/internal/applications', icon: FileStack },
    { name: 'Official Register', href: '/internal/register', icon: BookOpen },
    { name: 'Port Inspections', href: '/internal/inspections', icon: Search },
    { name: 'Enforcement Cases', href: '/internal/enforcement', icon: ShieldAlert },
  ];

  if (role === 'CHIEF_INSPECTOR') {
      links.push({ name: 'User Management', href: '/internal/users', icon: Users });
  }

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full shrink-0 border-r border-slate-800">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950/50">
        <Link href="/internal/dashboard" className="flex items-center space-x-2 text-white">
            <img src="/logo-fcc.png" alt="FCC Logo" className="h-8 w-auto brightness-0 invert" />
            <div className="flex flex-col"><span className="font-bold tracking-wide text-sm leading-tight text-white">Fair Competition</span><span className="text-[10px] uppercase text-slate-500">Commission</span></div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-4">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Workflows</div>
        {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${isActive ? 'bg-amber-500 text-slate-950 shadow-sm' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                    <link.icon className={`h-5 w-5 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} />
                    <span>{link.name}</span>
                </Link>
            )
        })}
      </div>

      <div className="p-4 border-t border-slate-800">
         <div className="bg-slate-800 rounded-xl p-4 mb-4">
            <div className="font-semibold text-white text-sm truncate">{session?.user?.name || "Staff"}</div>
            <div className="text-xs text-amber-500 font-medium mt-1 truncate">{role?.replace(/_/g, ' ')}</div>
         </div>
         <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition"
         >
            <LogOut className="h-4 w-4" />
            <span>Secure Logout</span>
         </button>
      </div>
    </aside>
  );
}
