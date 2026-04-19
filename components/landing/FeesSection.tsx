'use client';

import { Zap } from 'lucide-react';

const fees = [
  { label: 'New Recordation', amount: 'TZS 200,000', note: 'per trademark', highlight: true },
  { label: 'Renewal', amount: 'TZS 50,000', note: 'per renewal', highlight: false },
  { label: 'Change of Ownership', amount: 'TZS 150,000', note: 'per transfer', highlight: false },
  { label: 'Change of Name', amount: 'TZS 100,000', note: 'per change', highlight: false },
];

export function FeesSection() {
  return (
    <section className="bg-[#1B3067] py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white mb-3">Official Fee Schedule</h2>
          <p className="text-white/60 text-lg">As per the Merchandise Marks Recordation Regulations, 2025</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {fees.map(f => (
            <div
              key={f.label}
              className={`rounded-2xl border p-6 text-center ${f.highlight ? 'bg-amber-500/20 border-amber-500/40' : 'bg-white/5 border-white/15'}`}
            >
              <div className="text-sm text-white/60 mb-3 font-medium">{f.label}</div>
              <div className={`text-3xl font-bold mb-1 ${f.highlight ? 'text-amber-400' : 'text-white'}`}>{f.amount}</div>
              <div className="text-xs text-white/40">{f.note}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center space-x-2 text-white/60 text-sm">
          <Zap className="h-4 w-4 text-amber-400 shrink-0" />
          <span>All payments processed securely via <span className="text-amber-400 font-semibold">GePG</span> — Government e-Payment Gateway</span>
        </div>
      </div>
    </section>
  );
}
