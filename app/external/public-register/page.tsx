'use client';

import { useState } from "react";
import { Search, MapPin, Building2, ShieldCheck, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { mockRegister } from "@/data/mock-register";

export default function PublicRegister() {
  const [search, setSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      setHasSearched(true);
      if (search.trim() === "") {
          setResults([]);
          return;
      }
      const res = mockRegister.results.filter((r:any) => 
         r.trademark_name.toLowerCase().includes(search.toLowerCase()) ||
         r.owner_name.toLowerCase().includes(search.toLowerCase())
      );
      setResults(res);
  };

  return (
    <main className="flex-1 overflow-auto bg-background flex flex-col">
        {/* Search Header */}
        <div className="bg-primary text-white py-12 px-6">
            <MotionWrapper className="container mx-auto max-w-4xl text-center">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">Public Trademark Register</h1>
                <p className="text-slate-300 md:text-lg mb-8 max-w-2xl mx-auto">Verify the authenticity of recorded trademarks to ensure products meet intellectual property standards in Tanzania.</p>
                
                <form onSubmit={handleSearch} className="flex relative items-center max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-1.5 focus-within:ring-2 focus-within:ring-amber-400">
                    <Search className="h-6 w-6 text-slate-400 ml-3 shrink-0" />
                    <Input 
                        className="flex-1 border-0 shadow-none focus-visible:ring-0 text-slate-900 bg-transparent h-12 text-base md:text-lg px-4" 
                        placeholder="Search by trademark name, owner, or registration number..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button type="submit" className="h-12 px-8 bg-primary hover:bg-primary-light font-bold text-white shrink-0">Search Register</Button>
                </form>
            </MotionWrapper>
        </div>

        <div className="flex-1 container mx-auto max-w-5xl p-6 py-12">
            {!hasSearched ? (
                <div className="text-center text-slate-500 py-20 px-6 max-w-md mx-auto">
                    <ShieldCheck className="h-16 w-16 text-slate-200 mx-auto mb-6" />
                    <h3 className="text-xl font-medium text-slate-900 mb-2">Verified Protection</h3>
                    <p className="text-sm">Enter a search query above to query the live Fair Competition Commission database of recorded trademarks.</p>
                </div>
            ) : results.length > 0 ? (
                <div className="space-y-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-slate-900">Search Results <span className="text-slate-500 font-normal text-base ml-2">Found {results.length} records</span></h2>
                        <Button variant="outline" size="sm" className="h-9"><Download className="mr-2 h-4 w-4" /> Export List</Button>
                    </div>

                    {results.map((r) => (
                        <MotionWrapper key={r.trademark_id}>
                            <div className="bg-white border border-border rounded-xl shadow-sm p-6 md:p-8 flex flex-col md:flex-row gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-2xl font-bold text-slate-900">{r.trademark_name}</h3>
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">VERIFIED ACTIVE</Badge>
                                    </div>
                                    <div className="text-sm text-slate-500 mb-6 font-medium tracking-wide">{r.certificate_no}</div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <div className="flex items-center text-slate-500 mb-1 text-xs uppercase font-bold tracking-wider">
                                               <Building2 className="mr-1.5 h-3 w-3" /> Owner
                                            </div>
                                            <div className="font-semibold text-slate-900">{r.owner_name}</div>
                                        </div>
                                        <div>
                                            <div className="flex items-center text-slate-500 mb-1 text-xs uppercase font-bold tracking-wider">
                                               <MapPin className="mr-1.5 h-3 w-3" /> Origin Location
                                            </div>
                                            <div className="font-semibold text-slate-900">{r.manufacturer?.country || 'Unknown'}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-64 bg-slate-50 rounded-lg p-5 border border-slate-100 flex flex-col justify-center">
                                    <div className="text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">Classes Covered</div>
                                    <div className="font-medium text-slate-900 mb-4">{r.classes?.join(', ') || 'N/A'}</div>
                                    
                                    <div className="text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">Protection Valid Until</div>
                                    <div className="font-medium text-slate-900">{r.expiry_date}</div>
                                </div>
                            </div>
                        </MotionWrapper>
                    ))}
                </div>
            ) : (
                <MotionWrapper className="text-center text-slate-500 py-20 px-6">
                    <Search className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No matching trademarks</h3>
                    <p className="text-sm">We couldn't find any recorded trademarks matching "{search}".</p>
                </MotionWrapper>
            )}
        </div>
    </main>
  );
}
