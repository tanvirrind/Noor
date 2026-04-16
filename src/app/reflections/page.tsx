"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Play, BookOpen, Quote, Sparkles, Clock } from "lucide-react";

export default function ReflectionsPage() {
  const reflections = [
    { title: "The Power of Patience", duration: "5 min", category: "Mindfulness", icon: <Quote /> },
    { title: "Morning Gratitude", duration: "3 min", category: "Daily Dua", icon: <Sparkles /> },
    { title: "Understanding Surah Al-Fatiha", duration: "10 min", category: "Knowledge", icon: <BookOpen /> },
  ];

  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col">
      <header className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </Link>
          <h1 className="text-lg font-bold">Reflections & Meditations</h1>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-8">
        <section className="bg-primary text-white p-12 rounded-[56px] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-primary/20">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest">
                 <Sparkles className="w-3 h-3 text-emerald-400" />
                 Featured Meditation
              </div>
              <h2 className="text-4xl font-black tracking-tighter leading-none">Mindful <br/>Presence.</h2>
              <p className="text-white/60 max-w-xs leading-relaxed italic">
                 Connect with the Divine through silent contemplation and structured breathing.
              </p>
           </div>
           <button className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-primary hover:scale-110 transition-transform shadow-xl">
              <Play className="w-8 h-8 fill-current" />
           </button>
        </section>

        <div className="space-y-6">
           <h3 className="text-2xl font-black tracking-tight">Today's Content</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reflections.map((item, i) => (
                <div key={i} className="group p-6 bg-white border rounded-[40px] hover:border-primary/20 transition-all duration-500 flex items-center justify-between hover:shadow-xl hover:shadow-black/5">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground transition-all group-hover:bg-primary group-hover:text-white">
                         {item.icon}
                      </div>
                      <div>
                         <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">{item.category}</p>
                         <h4 className="font-bold text-lg">{item.title}</h4>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{item.duration}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
}
