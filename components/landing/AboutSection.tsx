'use client';

import { Eye, Target, Scale } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="bg-[#F8FAFC] py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text content */}
          <div>
            <div className="inline-flex items-center bg-amber-50 border border-amber-200 rounded-full px-4 py-1 mb-6">
              <span className="text-amber-600 text-xs font-bold uppercase tracking-widest">About FCC</span>
            </div>
            <h2 className="text-4xl font-bold text-[#1B3067] leading-tight mb-6">
              Promoting Fair Competition and Consumer Welfare in Tanzania
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              The FCC, as a regulatory body, plays a pivotal role in shaping the competitive
              market landscape in Tanzania. Our mandate is to enforce competition laws, prevent
              anti-competitive practices, and protect consumers from deceptive business conduct.
            </p>

            {/* DG Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center space-x-4 mb-8 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#1B3067]/10 flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src="/WhatsApp-Image-2026-04-02-at-17.31.53.jpeg"
                  alt="Acting DG"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div>
                <div className="font-bold text-[#1B3067]">MS. KHADIJA NGASONGWA</div>
                <div className="text-sm text-slate-500">Acting Director General — Fair Competition Commission</div>
                <a href="#" className="text-amber-600 text-sm font-medium hover:underline mt-0.5 inline-block">Read DG Message →</a>
              </div>
            </div>

            {/* Mission/Vision/Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Vision', text: 'Efficient market and consumer welfare for shared prosperity' },
                { icon: Target, color: 'text-green-600', bg: 'bg-green-50', label: 'Mission', text: 'Promote competition and protect consumers across Tanzania' },
                { icon: Scale, color: 'text-amber-600', bg: 'bg-amber-50', label: 'Values', text: 'Independence, Professionalism, Transparency, Integrity' },
              ].map(({ icon: Icon, color, bg, label, text }) => (
                <div key={label} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                  <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <div className="font-bold text-slate-900 text-sm mb-1">{label}</div>
                  <p className="text-slate-500 text-xs leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Photo */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
              <img
                src='/coverImage-1731594173077-209972064Na (1).jpg'
                alt="FCC Operations"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-6 right-6 bg-[#1B3067] text-white px-4 py-2 rounded-xl shadow-xl">
              <div className="text-xs font-bold tracking-wider">ISO 9001:2015</div>
              <div className="text-[10px] text-white/70">CERTIFIED ORGANIZATION</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
