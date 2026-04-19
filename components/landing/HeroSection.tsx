'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1B3067 0%, #0D1F4A 60%, #060D1E 100%)' }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: 'url("/coverImage-1731574415615-526503582DSC_7216.jpeg")' }}
      />

      {/* Diagonal SVG beams */}
      <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1440 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="beam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="0,0 600,0 200,800 0,800" fill="url(#beam)" />
        <polygon points="800,0 1440,0 1440,800 1100,800" fill="url(#beam)" />
      </svg>

      {/* Decorative amber circle */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-8"
            >
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span className="text-amber-400 text-xs font-semibold tracking-wide uppercase">ISO 9001:2015 Certified System</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
            >
              Tanzania&apos;s Digital{' '}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                Trademark
              </span>
              <br />Recordation System
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/70 max-w-2xl mb-10 leading-relaxed"
            >
              The official electronic platform of the Fair Competition Commission
              for trademark recordation, maintenance, and counterfeit prevention
              at Tanzania&apos;s points of entry.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/register">
                <Button className="bg-white text-[#1B3067] hover:bg-slate-100 font-bold rounded-full px-8 h-12 shadow-xl">
                  Apply for Trademark Recordation
                </Button>
              </Link>
              <Link href="/external/public-register">
                <Button variant="outline" className="border-white/50 text-white hover:bg-white/10 font-semibold rounded-full px-8 h-12">
                  Search the Register
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-5"
            >
              <Link href="/login" className="text-amber-400 text-sm hover:underline inline-flex items-center">
                FCC Staff Login <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Floating mockup cards */}
          <div className="relative hidden lg:flex justify-center items-center h-[460px]">
            {/* Main certificate card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-10 right-0 w-80 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <img src="/logo-fcc.png" alt="FCC" className="h-8 w-auto brightness-0 invert opacity-80" />
                <div>
                  <div className="text-white font-bold text-sm">Trademark Recordation Certificate</div>
                  <div className="text-white/50 text-xs">Fair Competition Commission</div>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">Mark</span>
                  <span className="text-white font-bold">ZANZIBAR GOLD™</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">Reference</span>
                  <span className="text-amber-400 font-mono font-semibold">TM-2026-001</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">Certificate No</span>
                  <span className="text-white font-mono">FCC-CERT-2024-001</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">Status</span>
                  <span className="text-green-400 font-semibold flex items-center"><CheckCircle2 className="h-3 w-3 mr-1" /> ACTIVE</span>
                </div>
              </div>
            </motion.div>

            {/* GePG payment card */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-8 left-0 w-64 backdrop-blur-md bg-green-500/10 border border-green-500/30 rounded-xl p-4 shadow-xl"
            >
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-7 h-7 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                </div>
                <span className="text-green-400 font-semibold text-sm">Payment Verified</span>
              </div>
              <div className="text-white text-xl font-bold mb-1">TZS 200,000</div>
              <div className="text-white/50 text-xs font-mono">GePG Ref: GEPG-2026-88421</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
