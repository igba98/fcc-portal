'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Dot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const news = [
  {
    date: 'Fri Apr 17, 2026',
    title: 'Minister Kapinga Orders Faster E-Commerce, Telecom Studies to Protect Consumers',
    excerpt: 'The minister ordered the commission to quickly complete two strategic market studies; one on e-commerce consumer protection and another on mobile data bundle pricing and competition in Tanzania.',
    author: 'FCC Communications',
    img: '/coverImage-1731574415615-526503582DSC_7216.jpeg',
  },
  {
    date: 'Fri Apr 17, 2026',
    title: 'FCC Prepares to Implement Vision 2050 Through a New Strategic Plan',
    excerpt: 'The Fourth Staff Council of the Fair Competition Commission has concluded its two-day meeting with a resolution to support the draft Five-Year Strategic Plan 2026/27–2030/31.',
    author: 'FCC Communications',
    img: '/coverImage-1731594173077-209972064Na (1).jpg',
  },
  {
    date: 'Apr 15, 2026',
    title: 'FCC Celebrates 10 Years of Queen of Power Legacy Mark',
    excerpt: 'FCC participated in the 10th anniversary celebration of the Queen of Power Legacy Mark 2026, showcasing the role of trademark integrity in brand value protection across East Africa.',
    author: 'FCC Media Team',
    img: '/coverImage-1731574415615-526503582DSC_7216.jpeg',
  },
];

const notices = [
  'Notification Involving the Acquisition by AlphaSeeds SA of Syngenta Tanzania Limited',
  'Notification Involving the Acquisition by Spark Energy Services Limited',
  'Notification Involving the Acquisition by Aakash Phulwani of Jet Coffee Shop',
  'Public Notice on Price Monitoring Exercise — Petroleum Products Retail Outlets',
  'Consumer Sensitization Campaign — Understanding Fair Market Pricing',
  'Notice: FCC Regional Office Dar es Salaam Open Hours Update',
];

export function NewsAndNoticesSection() {
  return (
    <section className="bg-[#F8FAFC] py-24">
      <div className="container mx-auto px-6">

        {/* NEWS */}
        <div className="mb-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center bg-[#1B3067]/5 border border-[#1B3067]/10 rounded-full px-4 py-1 mb-4">
                <span className="text-[#1B3067] text-xs font-bold uppercase tracking-widest">Latest News</span>
              </div>
              <h2 className="text-4xl font-bold text-[#1B3067]">Latest News from<br />Fair Competition Commission</h2>
            </div>
            <a href="https://www.fcc.go.tz" target="_blank" rel="noreferrer"
              className="hidden md:inline-flex items-center text-[#1B3067] font-semibold text-sm hover:text-amber-600 transition group">
              View All News <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer group"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-[10px] font-bold">NEW</Badge>
                    <div className="flex items-center text-slate-400 text-xs">
                      <Calendar className="h-3 w-3 mr-1" />{item.date}
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#1B3067] transition">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">{item.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{item.author}</span>
                    <span className="text-[#1B3067] font-semibold group-hover:text-amber-600 transition">Read More →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PUBLIC NOTICES */}
        <div>
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#1B3067]">Public Notices</h2>
            <a href="https://www.fcc.go.tz" target="_blank" rel="noreferrer"
              className="hidden md:inline-flex items-center text-[#1B3067] font-semibold text-sm hover:text-amber-600 transition group">
              View All Notices <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {notices.map((n, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white border-l-4 border-amber-500 rounded-r-xl px-5 py-4 shadow-sm hover:bg-amber-50/50 transition cursor-pointer flex items-center space-x-3"
              >
                <Dot className="h-5 w-5 text-amber-500 shrink-0" />
                <span className="text-sm text-slate-700 font-medium leading-snug">{n}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
