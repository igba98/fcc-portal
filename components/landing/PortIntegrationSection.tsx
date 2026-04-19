'use client';

import { motion } from 'framer-motion';
import { Truck, Plane, Ship, Package, ArrowRight, Zap } from 'lucide-react';

const ports = [
  { icon: Ship, type: 'Sea Port', name: 'Dar es Salaam Port', desc: 'Primary import and export hub for Tanzania' },
  { icon: Plane, type: 'International Airport', name: 'Julius Nyerere Intl Airport', desc: 'Air cargo screening and passenger goods inspection' },
  { icon: Truck, type: 'One Stop Border Post', name: 'Tunduma OSBP', desc: 'Southern corridor — Zambia border' },
  { icon: Truck, type: 'One Stop Border Post', name: 'Holili OSBP', desc: 'Kilimanjaro region — Kenya border' },
  { icon: Truck, type: 'One Stop Border Post', name: 'Namanga OSBP', desc: 'Northern corridor — Kenya/Arusha gateway' },
  { icon: Package, type: 'Inland Container Depots', name: 'ICD Network', desc: 'Multiple inland depot locations nationwide' },
];

export function PortIntegrationSection() {
  return (
    <section className="bg-[#1B3067] py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white mb-4">FCC Operates at All Tanzania Points of Entry</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Coordinating anti-counterfeit enforcement at every major border crossing, port, and airport in Tanzania.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {ports.map((port, i) => (
            <motion.div
              key={port.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center shrink-0">
                  <port.icon className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-amber-400/70 text-[10px] font-semibold uppercase tracking-wider mb-1">{port.type}</div>
                  <div className="text-white font-bold text-sm leading-tight mb-1">{port.name}</div>
                  <div className="text-white/50 text-xs leading-relaxed">{port.desc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center space-x-2 text-white/60 text-sm">
          <Zap className="h-4 w-4 text-amber-400 shrink-0" />
          <span>Integrated with <span className="text-amber-400 font-semibold">TANOGA & TANESW</span> for real-time cargo monitoring and automated alerts</span>
        </div>
      </div>
    </section>
  );
}
