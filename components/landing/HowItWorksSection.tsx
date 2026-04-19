'use client';

import { motion } from 'framer-motion';
import { UserPlus, CreditCard, Award } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    color: 'bg-amber-500',
    step: '01',
    title: 'Create Account & Prepare Documents',
    desc: 'Register on the external portal as an Individual, Partnership, or Company. Prepare your BRELA trademark certificate, goods images, and supporting documents.',
  },
  {
    icon: CreditCard,
    color: 'bg-[#1B3067]',
    step: '02',
    title: 'Submit Form FCC 1 & Pay via GePG',
    desc: 'Complete Form FCC 1 online with all trademark details. Pay TZS 200,000 per trademark via the Government e-Payment Gateway (GePG). Application number generated automatically.',
  },
  {
    icon: Award,
    color: 'bg-green-600',
    step: '03',
    title: 'CI Reviews & Certificate Issued',
    desc: 'Your application is reviewed by FCC officers within 21 working days. Upon approval by the Chief Inspector, your Trademark Recordation Certificate is auto-generated and emailed to you.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-[#F8FAFC] py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-amber-50 border border-amber-200 rounded-full px-4 py-1 mb-4">
            <span className="text-amber-600 text-xs font-bold uppercase tracking-widest">The Process</span>
          </div>
          <h2 className="text-4xl font-bold text-[#1B3067]">How the Recordation Process Works</h2>
        </div>

        <div className="relative flex flex-col md:flex-row gap-8 items-start justify-center max-w-5xl mx-auto">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-0.5 border-t-2 border-dashed border-slate-300 z-0" />

          {steps.map(({ icon: Icon, color, step, title, desc }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex-1 flex flex-col items-center text-center relative z-10"
            >
              <div className={`w-20 h-20 ${color} rounded-full flex items-center justify-center mb-6 shadow-lg shadow-black/10`}>
                <Icon className="h-9 w-9 text-white" />
              </div>
              <div className="text-xs font-black text-slate-400 tracking-widest mb-2">STEP {step}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
