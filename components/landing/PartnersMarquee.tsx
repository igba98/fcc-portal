'use client';

export function PartnersMarquee() {
  const partners = [
    'TradeMark Africa (TMA)',
    'Tanganyika Law Society (TLS)',
    'UNCTAD / ACF',
    'East Africa Community (EAC)',
    'International Competition Network (ICN)',
    'TCRA',
    'TCAA',
    'LATRA',
    'EWURA',
    'World Intellectual Property Org. (WIPO)',
  ];

  return (
    <section className="bg-white py-16 border-t border-slate-100">
      <div className="container mx-auto px-6 text-center mb-10">
        <h2 className="text-3xl font-bold text-[#1B3067] mb-2">Our Partners</h2>
        <p className="text-slate-500 text-sm">Working with leading national and international organizations</p>
      </div>
      <div className="overflow-hidden relative">
        <div className="flex items-center animate-marquee whitespace-nowrap gap-6 px-6">
          {[...partners, ...partners].map((p, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center bg-slate-50 hover:bg-[#1B3067]/5 border border-slate-100 hover:border-[#1B3067]/20 rounded-xl px-8 py-4 text-slate-500 hover:text-[#1B3067] font-medium text-sm transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
