'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { 
    Scale, LayoutDashboard, FileText, Bookmark, 
    FileBadge, Search, LogOut 
} from 'lucide-react';

export function ExternalSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    { name: 'Dashboard', href: '/external/dashboard', icon: LayoutDashboard },
    { name: 'Applications', href: '/external/applications', icon: FileText },
    { name: 'My Trademarks', href: '/external/trademarks', icon: Bookmark },
    { name: 'Certificates', href: '/external/certificates', icon: FileBadge },
    { name: 'Public Search', href: '/external/public-register', icon: Search },
  ];

  return (
    <aside className="w-64 bg-primary text-slate-100 flex flex-col h-full shrink-0 border-r border-[#2a458a]">
      <div className="h-16 flex items-center px-6 border-b border-[#2a458a] bg-primary/90">
        <Link href="/external/dashboard" className="flex items-center space-x-2 text-white">
            <img src="/logo-fcc.png" alt="FCC Logo" className="h-8 w-auto brightness-0 invert" />
            <div className="flex flex-col"><span className="font-bold tracking-wide text-sm leading-tight">Fair Competition</span><span className="text-[10px] uppercase text-white/50">Commission Portal</span></div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-4">
        <div className="text-xs font-semibold text-primary-foreground/50 uppercase tracking-wider mb-2 px-2">Menu</div>
        {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${isActive ? 'bg-amber-500 text-slate-950 shadow-sm' : 'hover:bg-white/10 hover:text-white'}`}
                >
                    <link.icon className={`h-5 w-5 ${isActive ? 'text-slate-900' : 'text-slate-300'}`} />
                    <span>{link.name}</span>
                </Link>
            )
        })}
      </div>

      <div className="p-4 border-t border-[#2a458a]">
         <div className="bg-[#2a458a] rounded-xl p-4 mb-4">
            <div className="font-semibold text-white text-sm truncate">{session?.user?.name || "User"}</div>
            <div className="text-xs text-amber-400 font-medium mt-1 truncate">{session?.user?.role?.replace(/_/g, ' ') || "Right Holder"}</div>
         </div>
         <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-300 hover:bg-white/5 hover:text-red-200 rounded-lg transition"
         >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
         </button>
      </div>
    </aside>
  );
}
