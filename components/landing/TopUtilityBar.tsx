'use client';

import { Mail, Phone } from 'lucide-react';

const FacebookIcon = () => <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const InstagramIcon = () => <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const TwitterIcon = () => <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const YoutubeIcon = () => <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>;

export function TopUtilityBar() {
  return (
    <div className="bg-[#1B3067] h-9 flex items-center px-6 z-50 hidden md:flex">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4 text-white/80 text-xs">
          <a href="mailto:info@fcc.go.tz" className="flex items-center space-x-1 hover:text-white transition">
            <Mail className="h-3 w-3" />
            <span>info@fcc.go.tz</span>
          </a>
          <span className="text-white/30">|</span>
          <a href="tel:0800110094" className="flex items-center space-x-1 hover:text-white transition">
            <Phone className="h-3 w-3" />
            <span>0800110094 (Toll Free)</span>
          </a>
        </div>
        <div className="flex items-center space-x-4 text-white/70 text-xs">
          <a href="https://facebook.com/tanzaniacompetition" target="_blank" rel="noreferrer" className="hover:text-white transition"><FacebookIcon /></a>
          <a href="https://instagram.com/fcc_tanzania" target="_blank" rel="noreferrer" className="hover:text-white transition"><InstagramIcon /></a>
          <a href="https://x.com/FCC_Tanzania" target="_blank" rel="noreferrer" className="hover:text-white transition"><TwitterIcon /></a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition"><YoutubeIcon /></a>
          <span className="text-white/30">|</span>
          <a href="#" className="hover:text-white transition">FAQs</a>
          <a href="#" className="hover:text-white transition">E-Mrejesho</a>
          <span className="text-white/30">|</span>
          <div className="flex items-center space-x-1">
            <button className="bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-white text-[10px] font-medium transition">EN</button>
            <button className="hover:bg-white/10 px-2 py-0.5 rounded text-[10px] transition">SW</button>
          </div>
        </div>
      </div>
    </div>
  );
}
