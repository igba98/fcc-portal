'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

function CountUp({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

const stats = [
  { value: 1247, label: 'Trademarks Recorded', suffix: '' },
  { value: 43, label: 'Applications This Month', suffix: '' },
  { value: 12, label: 'Points of Entry Covered', suffix: '' },
  { value: 245, label: 'Fines Collected 2026 (M TZS)', suffix: '.6M' },
];

export function StatsSection() {
  return (
    <section className="bg-white py-16 border-t-4 border-amber-500">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-slate-100">
          {stats.map((s, i) => (
            <div key={i} className="text-center px-8 py-4">
              <div className="text-4xl md:text-5xl font-bold text-[#1B3067] flex justify-center">
                <CountUp target={s.value} />
                {s.suffix && <span>{s.suffix}</span>}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-widest mt-2 font-medium leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
