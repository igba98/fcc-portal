'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, RefreshCw, Users, Ship, ArrowRight, CheckCircle2 } from 'lucide-react';

const processes = [
  {
    num: '01',
    icon: FileText,
    title: 'Trademark Recordation Management',
    items: ['New applications & documentation', 'Multi-level TRO → ACEM → DAC → CI review', 'Certificate issuance & delivery'],
    cta: 'Apply Now',
    href: '/register',
  },
  {
    num: '02',
    icon: RefreshCw,
    title: 'Recordation Maintenance & Update',
    items: ['Renewals with 30-day expiry alerts', 'Alterations to mark details', 'Change of ownership or business name'],
    cta: 'Manage Trademarks',
    href: '/login',
  },
  {
    num: '03',
    icon: Users,
    title: 'Authorization & Representation',
    items: ['Agent appointment via Power of Attorney', 'Multi-agent management capabilities', 'Revocation and authority transfer'],
    cta: 'Appoint Agent',
    href: '/login',
  },
  {
    num: '04',
    icon: Ship,
    title: 'Inspections at Points of Entry',
    items: ['Real-time TANOGA customs integration', 'Shipment verification & spot checks', 'Enforcement reporting & seizure orders'],
    cta: 'View Inspections',
    href: '/login',
  },
];

export function ProcessesSection() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-[#1B3067]/5 border border-[#1B3067]/10 rounded-full px-4 py-1 mb-4">
            <span className="text-[#1B3067] text-xs font-bold uppercase tracking-widest">What We Do</span>
          </div>
          <h2 className="text-4xl font-bold text-[#1B3067] leading-tight">
            Four Core Sub-Processes<br />of the Trademark System
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {processes.map(({ num, icon: Icon, title, items, cta, href }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm relative overflow-hidden cursor-default"
            >
              {/* Number badge */}
              <div className="absolute top-4 right-4 text-3xl font-black text-slate-100 select-none">{num}</div>

              <div className="w-14 h-14 bg-[#1B3067]/10 rounded-xl flex items-center justify-center mb-5">
                <Icon className="h-7 w-7 text-[#1B3067]" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>

              <ul className="space-y-2 mb-6">
                {items.map(item => (
                  <li key={item} className="flex items-start space-x-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link href={href} className="inline-flex items-center text-[#1B3067] font-semibold text-sm hover:text-amber-600 transition group">
                {cta} <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
