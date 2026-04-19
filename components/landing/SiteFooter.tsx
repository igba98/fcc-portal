'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

const FacebookIcon = () => <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const InstagramIcon = () => <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const TwitterIcon = () => <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const YoutubeIcon = () => <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>;

const socialIcons = [FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon];

const offices = [
  { city: 'Dodoma', label: 'Headquarters', addr: '6th Floor, PSSSF House, Makole Road, P.O Box 2351' },
  { city: 'Dar es Salaam', label: 'Regional Office', addr: 'NIC Life House, 3rd Floor, Sokoine Drive' },
  { city: 'Arusha', label: 'Regional Office', addr: 'AICC Building, Serengeti Wing' },
  { city: 'Mwanza', label: 'Regional Office', addr: 'Kenyatta Road, Isamilo Area' },
  { city: 'Zanzibar', label: 'Liaison Office', addr: 'Mizingani Road, Stone Town' },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#0D1F4A] text-slate-300">
      {/* Office grid */}
      <div className="border-b border-white/10 py-14">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Visit Our Offices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {offices.map(o => (
              <div key={o.city} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition">
                <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center mb-3">
                  <MapPin className="h-4 w-4 text-amber-400" />
                </div>
                <div className="font-bold text-white text-sm mb-0.5">{o.city}</div>
                <div className="text-[10px] text-amber-400/70 uppercase tracking-wider font-semibold mb-2">{o.label}</div>
                <p className="text-slate-400 text-xs leading-relaxed">{o.addr}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="py-14">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo-fcc.png" alt="FCC Logo" className="h-10 w-auto brightness-0 invert" />
              <div className="leading-tight">
                <div className="font-bold text-white text-sm">Fair Competition Commission</div>
                <div className="text-amber-400 italic text-[10px]">for fair play in the economy</div>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              A statutory body under the Ministry of Industry and Trade, United Republic of Tanzania. Established under the Fair Competition Act, 2003.
            </p>
            <div className="flex space-x-3">
              {socialIcons.map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-white/5 hover:bg-amber-500/20 rounded-lg flex items-center justify-center text-slate-400 hover:text-amber-400 transition">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {['About FCC', 'The DG Message', 'Our Mandate', 'Organizational Structure', 'Strategic Plan', 'Annual Reports'].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-widest">Services</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {['Trademark Recordation', 'Trademark Renewal', 'Agent Registration', 'Certificate Verification', 'Public Register Search', 'Complaint Filing'].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-widest">Contact</h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start space-x-2">
                <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-400" />
                <span>6th Floor, PSSSF House, Makole Road, P.O Box 2351, Dodoma, Tanzania</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                <span>+255 26 2329086/87/88/89</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                <span>Toll Free: 0800110094</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                <a href="mailto:info@fcc.go.tz" className="hover:text-white transition">info@fcc.go.tz</a>
              </li>
              <li className="flex items-center space-x-2">
                <Globe className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                <a href="https://www.fcc.go.tz" target="_blank" rel="noreferrer" className="hover:text-white transition">www.fcc.go.tz</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© 2026 Fair Competition Commission — United Republic of Tanzania. All rights reserved.</span>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition">Terms of Use</Link>
            <Link href="#" className="hover:text-white transition">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
