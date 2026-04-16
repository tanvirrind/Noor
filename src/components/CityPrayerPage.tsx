"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Clock, Bell, MapPin, Share2, Info } from "lucide-react";
import AlertSettings from "./AlertSettings";

interface CityPrayerPageProps {
  country: string;
  city: string;
  cityName: string;
  countryName: string;
  timings: any;
  date: any;
  meta: any;
  prayers: any[];
  jsonLd: any;
}

export default function CityPrayerPage({ 
  country, 
  city, 
  cityName, 
  countryName, 
  timings, 
  date, 
  meta, 
  prayers, 
  jsonLd 
}: CityPrayerPageProps) {
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <AlertSettings isOpen={isAlertsOpen} onClose={() => setIsAlertsOpen(false)} />

      {/* Header */}
      <header className="glass sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href={`/${country}`} className="p-2 -ml-2 hover:bg-white/20 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 rotate-180 text-primary" />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold tracking-tight text-primary">{cityName}</h1>
            <p className="text-[10px] text-primary/60 uppercase font-bold tracking-widest">{countryName}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <Share2 className="w-5 h-5 text-primary" />
            </button>
            <button 
              onClick={() => setIsAlertsOpen(true)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <Bell className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full space-y-6">
        {/* Hero Card */}
        <section className="relative overflow-hidden glass-dark text-white rounded-[32px] p-8 md:p-12 shadow-2xl shadow-primary/20">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-widest">
                <MapPin className="w-4 h-4" />
                <span>{cityName}, {countryName}</span>
              </div>
              <div className="space-y-1">
                <p className="text-4xl md:text-6xl font-black tracking-tighter">
                  {date.readable}
                </p>
                <div className="flex items-center gap-2 text-white/80 font-serif italic text-lg md:text-xl">
                  <span>{date.hijri.day} {date.hijri.month.en} {date.hijri.year} AH</span>
                </div>
              </div>
            </div>
            <div className="glass border-white/10 rounded-2xl p-4 md:p-6 text-center">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-white/60 mb-1">Timezone</p>
              <p className="text-xl font-bold">{meta.timezone}</p>
            </div>
          </div>
          {/* Abstract decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24 blur-3xl" />
        </section>

        {/* Timings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {prayers.map((prayer) => (
            <div 
              key={prayer.name}
              className={`p-6 rounded-3xl border transition-all duration-300 ${
                prayer.secondary 
                  ? "glass border-transparent opacity-60" 
                  : "glass hover:border-accent hover:shadow-xl hover:shadow-black/20"
              }`}
            >
              <div className="flex items-start justify-between mb-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center glass`}>
                  <Clock className={`w-6 h-6 text-primary`} />
                </div>
                {!prayer.secondary && (
                   <button 
                    onClick={() => setIsAlertsOpen(true)}
                    className="text-primary/60 hover:text-accent transition-colors"
                   >
                     <Bell className="w-4 h-4" />
                   </button>
                )}
              </div>
              <div className="space-y-1">
                <h3 className={`text-sm uppercase tracking-widest font-bold text-primary/60`}>
                  {prayer.name}
                </h3>
                <p className={`text-4xl font-black tracking-tighter text-primary`}>
                  {prayer.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Info & Method */}
        <div className="p-6 glass rounded-[32px] flex flex-col md:flex-row items-center gap-6">
          <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center flex-shrink-0">
            <Info className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 space-y-1 text-center md:text-left text-primary">
            <h4 className="font-bold">Calculation Method</h4>
            <p className="text-sm text-primary/60">{meta.method.name}</p>
          </div>
          <div className="px-6 py-3 glass rounded-2xl text-xs font-bold uppercase tracking-widest text-primary">
            Verified Data
          </div>
        </div>

        {/* SEO Article */}
        <article className="prose prose-stone max-w-none p-8 md:p-12 glass rounded-[40px] text-primary">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6 text-primary">About Prayer Times in {cityName}</h2>
          <div className="space-y-4 text-primary opacity-80 leading-relaxed">
            <p>
              Accurate prayer timings are a fundamental part of a Muslim's daily routine. In {cityName}, {countryName}, the timings for {prayers.filter(p => !p.secondary).map(p => p.name).join(", ")} shift slightly every day based on the solar calendar.
            </p>
            <p>
              Our platform uses high-precision astronomical calculations to provide you with the most reliable timings. Today, in {cityName}, Fajr starts at {timings.Fajr} and Maghrib is at {timings.Maghrib}.
            </p>
            <p>
              Whether you are looking for today's timings or planning for the week ahead, Noor provides a comprehensive and easy-to-use interface to stay connected with your spiritual obligations.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
