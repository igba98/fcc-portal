'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Scale, Bell, Menu, User, Settings, FileText, CheckCircle, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNotificationsStore } from '@/store/notificationsStore';
import { Badge } from '@/components/ui/badge';

export function ExternalNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const allNotifications = useNotificationsStore(state => state.notifications);
  const notifications = allNotifications.filter(n => n.user_id === session?.user?.id && !n.read);

  const navLinks = [
    { name: 'Dashboard', href: '/external/dashboard' },
    { name: 'Applications', href: '/external/applications' },
    { name: 'My Trademarks', href: '/external/trademarks' },
    { name: 'Certificates', href: '/external/certificates' },
    { name: 'Public Search', href: '/external/public-register' },
  ];

  return (
    <header className="h-16 bg-white border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center space-x-8">
            <Link href="/external/dashboard" className="flex items-center space-x-2">
                <Scale className="h-7 w-7 text-primary" />
                <span className="font-bold text-lg text-slate-800">FCC Tanzania</span>
            </Link>

            {/* Center: Links (Desktop) */}
            <nav className="hidden md:flex items-center space-x-1">
                {navLinks.map(link => {
                    const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                    return (
                        <Link 
                            key={link.href} 
                            href={link.href}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${isActive ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                        >
                            {link.name}
                        </Link>
                    )
                })}
            </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative p-2 cursor-pointer text-slate-500 hover:text-slate-700 transition">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
                )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none ring-0">
                <div className="flex items-center space-x-2 cursor-pointer hover:bg-slate-50 p-1 rounded-full pr-3 transition">
                  <Avatar className="h-8 w-8 bg-primary/10">
                    <AvatarFallback className="text-primary text-xs font-semibold">
                       {session?.user?.name?.substring(0,2).toUpperCase() || 'US'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-slate-700 hidden sm:block max-w-[120px] truncate">{session?.user?.name}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground pt-1">{session?.user?.role?.replace(/_/g, ' ')}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer font-medium"><User className="mr-2 h-4 w-4 text-slate-500" /> My Profile</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer font-medium"><Settings className="mr-2 h-4 w-4 text-slate-500" /> Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/login' })} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 font-medium">
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>

      </div>
    </header>
  );
}
