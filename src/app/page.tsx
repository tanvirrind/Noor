"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  Search, Globe, MapPin, 
  Compass, Moon, Sparkles, 
  ChevronRight, BookOpen, Clock,
  ArrowUpRight, Users
} from "lucide-react";
import { motion } from "motion/react";
import Onboarding from "@/components/Onboarding";

const countries = [
  { name: "Pakistan", code: "PK", cities: ["Faisalabad", "Lahore", "Karachi", "Islamabad"] },
  { name: "United Kingdom", code: "GB", cities: ["London", "Manchester", "Birmingham"] },
  { name: "United States", code: "US", cities: ["New York", "Chicago", "Houston"] },
  { name: "Saudi Arabia", code: "SA", cities: ["Mecca", "Medina", "Riyadh"] },
  { name: "United Arab Emirates", code: "AE", cities: ["Dubai", "Abu Dhabi"] },
  { name: "Canada", code: "CA", cities: ["Toronto", "Vancouver"] },
  { name: "Australia", code: "AU", cities: ["Sydney", "Melbourne"] },
  { name: "Turkey", code: "TR", cities: ["Istanbul", "Ankara"] },
];

const features = [
  { 
    title: "Qibla Finder", 
    desc: "Precision compass for accurate direction.", 
    href: "/qibla", 
    icon: <Compass className="w-6 h-6" />,
    color: "bg-orange-50/50 text-orange-600"
  },
  { 
    title: "Community", 
    desc: "Connect and share spiritual journeys.", 
    href: "/community", 
    icon: <Users className="w-6 h-6" />,
    color: "bg-purple-50/50 text-purple-600"
  },
  { 
    title: "Tasbih", 
    desc: "Digital counter for daily remembrance.", 
    href: "/tasbih", 
    icon: <Moon className="w-6 h-6" />,
    color: "bg-emerald-50/50 text-emerald-600"
  },
];

import ClientWrapper from "@/components/ClientWrapper";

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasOnboarded = localStorage.getItem("noor_onboarded");
    if (!hasOnboarded) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("noor_onboarded", "true");
    setShowOnboarding(false);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary selection:text-white">
        {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}

      {/* Header */}
      <header className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white transition-transform group-hover:rotate-12">
               <Moon className="w-4 h-4 fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter text-primary">Noor</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
            <Link href="/" className="text-primary underline underline-offset-8">Home</Link>
            <Link href="/tasbih" className="hover:text-primary transition-colors">Tasbih</Link>
            <Link href="/qibla" className="hover:text-primary transition-colors">Qibla</Link>
            <Link href="/journal" className="hover:text-primary transition-colors">Journal</Link>
            <Link href="/community" className="hover:text-primary transition-colors">Community</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-xs font-bold uppercase tracking-widest hover:bg-muted transition-colors">
              <Sparkles className="w-3 h-3" />
              <span>Premium</span>
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors flex md:hidden">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center relative space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Live Prayer Timings for 50,000+ Cities
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.85] py-4 text-white"
          >
            Your Daily <br className="hidden md:block" />
            <span className="text-accent italic font-serif font-light">Spiritual</span> Hub.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 font-medium leading-relaxed"
          >
            A high-precision companion for the modern Muslim. Verified Salah times, spiritual tracking, and community features in one place.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link 
              href="#countries" 
              className="w-full sm:w-auto px-8 py-4 bg-accent text-primary rounded-2xl font-bold flex items-center justify-center gap-2 shadow-2xl shadow-accent/20 hover:opacity-90 transition-opacity"
            >
              Check Local Times
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/journal" 
              className="w-full sm:w-auto px-8 py-4 glass text-primary rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
            >
              Start Journaling
              <ArrowUpRight className="w-5 h-5 opacity-50" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Feature Pills */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group p-8 glass rounded-[40px] hover:border-accent/40 transition-all duration-500 flex flex-col gap-6 hover:shadow-2xl hover:shadow-black/20"
            >
              <div className={`w-14 h-14 rounded-2xl glass flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <div className="text-primary">{feature.icon}</div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight text-primary">{feature.title}</h3>
                <p className="text-text-muted leading-relaxed italic">{feature.desc}</p>
              </div>
              <Link href={feature.href} className="text-xs font-black uppercase tracking-widest flex items-center gap-1 group/link">
                Launch Application
                <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Daily Insight Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="glass-dark rounded-[48px] p-8 md:p-20 text-white relative overflow-hidden group">
          <div className="relative z-10 max-w-2xl space-y-8">
            <div className="flex items-center gap-3">
              <div className="px-4 py-1.5 glass rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-primary">
                <Sparkles className="w-3 h-3 text-accent" />
                Spiritual Insight of the Day
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9]">
              "Indeed, success is only from <span className="text-accent font-serif italic">Allah</span>."
            </h2>
            <p className="text-white/60 text-lg leading-relaxed font-serif italic">
              Focus on the process, remain consistent in your prayers, and trust that your efforts are being recorded by the Most Merciful.
            </p>
            <div className="pt-4">
              <button className="px-8 py-4 glass text-primary rounded-2xl font-bold hover:scale-105 transition-transform">
                Read Full Reflection
              </button>
            </div>
          </div>
          
          {/* Abstract Art */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-emerald-500/20 to-transparent pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-[120px] group-hover:bg-emerald-500/30 transition-all duration-1000" />
        </div>
      </section>

      {/* Country Selector */}
      <section id="countries" className="max-w-7xl mx-auto px-4 lg:px-8 py-24 w-full">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs">
              <Globe className="w-4 h-4" />
              <span>Global Coverage</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] text-white">
              Explore Prayer <span className="text-accent italic font-light">Timings</span> by Region.
            </h2>
          </div>
          <div className="flex-shrink-0">
             <button className="flex items-center gap-2 px-6 py-3 glass rounded-2xl font-bold shadow-sm hover:bg-white transition-all text-primary">
                Search All Countries
                <Search className="w-4 h-4 text-primary opacity-50" />
             </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {countries.map((country) => (
            <Link 
              key={country.name} 
              href={`/${country.name.toLowerCase()}`}
              className="group relative p-8 glass rounded-[32px] hover:border-accent transition-all duration-500 overflow-hidden"
            >
              <div className="relative z-10 flex flex-col justify-between h-full space-y-12 text-primary">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">
                    {country.name}
                  </h3>
                  <p className="text-xs text-primary/60 font-bold uppercase tracking-widest">
                    {country.cities.length}+ Cities available
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {country.cities.slice(0, 3).map(city => (
                    <span key={city} className="text-[10px] uppercase tracking-tighter font-black glass px-3 py-1 rounded-full text-primary transition-colors group-hover:bg-accent group-hover:text-primary">
                      {city}
                    </span>
                  ))}
                  <div className="w-6 h-6 rounded-full glass flex items-center justify-center text-[10px] font-black group-hover:bg-primary group-hover:text-white transition-all">
                    +
                  </div>
                </div>
              </div>
              <ChevronRight className="absolute top-8 right-8 w-6 h-6 text-primary/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 lg:grid grid-cols-4 gap-16 space-y-12 lg:space-y-0">
          <div className="space-y-8 col-span-2">
            <Link href="/" className="flex items-center gap-2 overflow-hidden">
               <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white">
                  <Moon className="w-6 h-6 fill-current" />
               </div>
               <span className="text-3xl font-black tracking-tighter">Noor</span>
            </Link>
            <p className="text-xl text-muted-foreground max-w-sm leading-relaxed font-medium">
              Empowering the modern Muslim through technology and tradition. Built with precision for your daily spiritual journey.
            </p>
            <div className="flex items-center gap-6">
               <div className="space-y-1">
                  <p className="text-2xl font-black tracking-tighter">50k+</p>
                  <p className="text-xs font-bold text-muted-foreground uppercase opacity-60">Daily Users</p>
               </div>
               <div className="w-px h-8 bg-muted" />
               <div className="space-y-1">
                  <p className="text-2xl font-black tracking-tighter">190+</p>
                  <p className="text-xs font-bold text-muted-foreground uppercase opacity-60">Countries</p>
               </div>
            </div>
          </div>
          <div className="space-y-8 col-span-1">
            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Ecosystem</h4>
            <ul className="space-y-4 text-sm font-bold text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Prayer Times</Link></li>
              <li><Link href="/tasbih" className="hover:text-primary transition-colors">Tasbih Counter</Link></li>
              <li><Link href="/qibla" className="hover:text-primary transition-colors">Qibla Finder</Link></li>
              <li><Link href="/journal" className="hover:text-primary transition-colors">Journal & Reflections</Link></li>
            </ul>
          </div>
          <div className="space-y-8 col-span-1">
            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Connect</h4>
            <ul className="space-y-4 text-sm font-bold text-muted-foreground">
              <li className="flex items-center gap-2 group cursor-pointer hover:text-primary transition-colors">
                 <span>Official Twitter</span>
                 <ArrowUpRight className="w-3 h-3 opacity-30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </li>
              <li className="flex items-center gap-2 group cursor-pointer hover:text-primary transition-colors">
                 <span>Community Discord</span>
                 <ArrowUpRight className="w-3 h-3 opacity-30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-24 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
           <p>© 2026 Noor Spiritual Technologies. All rights reserved.</p>
           <div className="flex items-center gap-8">
              <Link href="/privacy" className="hover:text-primary">Privacy</Link>
              <Link href="/terms" className="hover:text-primary">Terms</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}
