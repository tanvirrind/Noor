"use client";

import { useState } from "react";
import { Bell, BellOff, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AlertSettings({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [alerts, setAlerts] = useState({
    Fajr: true,
    Dhuhr: true,
    Asr: false,
    Maghrib: true,
    Isha: true,
  });

  const toggle = (prayer: keyof typeof alerts) => {
    setAlerts(prev => ({ ...prev, [prayer]: !prev[prayer] }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm glass rounded-[40px] p-8 z-[70] shadow-2xl space-y-8 border-white/40"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black tracking-tight text-primary">Prayers Alerts</h3>
              <button onClick={onClose} className="p-2 glass hover:bg-white rounded-full transition-colors">
                <X className="w-5 h-5 text-primary" />
              </button>
            </div>

            <div className="space-y-4">
              {(Object.keys(alerts) as Array<keyof typeof alerts>).map((prayer) => (
                <div 
                  key={prayer}
                  onClick={() => toggle(prayer)}
                  className="flex items-center justify-between p-4 glass rounded-2xl cursor-pointer hover:bg-white/40 transition-colors group"
                >
                  <span className="font-black text-xs tracking-widest uppercase text-primary">{prayer}</span>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${alerts[prayer] ? "bg-accent" : "bg-primary/10"}`}>
                    <motion.div 
                       layout
                       className="w-4 h-4 bg-white rounded-full flex items-center justify-center"
                       animate={{ x: alerts[prayer] ? 24 : 0 }}
                    >
                       {alerts[prayer] ? <Bell className="w-2 h-2 text-accent" /> : <BellOff className="w-2 h-2 text-primary/40" />}
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={onClose}
              className="w-full py-4 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-accent/20"
            >
              <Check className="w-5 h-5" />
              Save Preferences
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
