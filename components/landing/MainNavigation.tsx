'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MainNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '#about' },
    { label: 'Legal Frameworks', href: '#' },
    { label: 'Publications', href: '#' },
    { label: 'Events', href: '#' },
    { label: 'Media Center', href: '#' },
    { label: 'Contact Us', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo block */}
          <Link href="/" className="flex items-center space-x-3">
            <img src="/logo-fcc.png" alt="FCC Logo" className="h-10 w-auto" />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-bold text-[#1B3067] text-base leading-none">Fair Competition Commission</span>
              <span className="text-amber-500 italic text-[10px] leading-snug">for fair play in the economy</span>
              <span className="text-green-600 text-[9px] font-semibold tracking-wide">ISO 9001:2015 CERTIFIED</span>
            </div>
          </Link>

          {/* Center nav — desktop */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map(l => (
              <Link key={l.label} href={l.href} className="text-sm text-slate-700 hover:text-[#1B3067] font-medium transition whitespace-nowrap">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center space-x-3">
            <button className="text-slate-500 hover:text-[#1B3067] transition hidden md:block">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/login">
              <Button size="sm" className="bg-[#1B3067] hover:bg-[#0D1F4A] text-white font-semibold text-xs px-4 hidden sm:flex">
                Trademark System
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" variant="outline" className="border-[#1B3067] text-[#1B3067] font-semibold text-xs px-4 hidden sm:flex">
                FCC Staff Portal
              </Button>
            </Link>
            <button className="lg:hidden text-slate-700" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-100 py-4 space-y-1">
            {navLinks.map(l => (
              <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">
                {l.label}
              </Link>
            ))}
            <div className="flex gap-3 px-4 pt-4 border-t border-slate-100 mt-2">
              <Link href="/login" className="flex-1"><Button size="sm" className="w-full bg-[#1B3067]">Trademark System</Button></Link>
              <Link href="/login" className="flex-1"><Button size="sm" variant="outline" className="w-full">FCC Staff Portal</Button></Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
