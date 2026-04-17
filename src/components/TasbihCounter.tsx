"use client";

import { useState, useEffect } from "react";
import { Plus, RotateCcw, Target } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { db, handleFirestoreError, OperationType } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/components/FirebaseProvider";

export default function TasbihCounter() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [vibrateOn, setVibrateOn] = useState(true);

  const increment = async () => {
    const nextCount = count + 1;
    setCount(nextCount);
    
    if (vibrateOn && "vibrate" in navigator) {
      navigator.vibrate(50);
    }

    // Save history periodically or on target reach
    if (user && nextCount % target === 0) {
      try {
        await addDoc(collection(db, "users", user.uid, "tasbih"), {
          userId: user.uid,
          count: nextCount,
          target,
          date: serverTimestamp()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, `users/${user.uid}/tasbih`);
      }
    }
  };

  const reset = () => {
    if (confirm("Are you sure you want to reset your count?")) {
      setCount(0);
    }
  };

  useEffect(() => {
    if (count > 0 && count % target === 0) {
      if ("vibrate" in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  }, [count, target]);

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-12 min-h-[600px]">
      <div className="relative w-80 h-80">
        {/* Background Dial */}
        <div className="absolute inset-0 border-4 border-accent/20 rounded-full glass flex items-center justify-center shadow-2xl shadow-accent/10">
          <div className="w-full h-full p-4">
             <div className="w-full h-full border-2 border-dashed border-accent/30 rounded-full animate-[spin_20s_linear_infinite]" />
          </div>
        </div>

        {/* Counter Ring (Progress) */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 scale-95 transition-transform">
          <circle
            cx="160"
            cy="160"
            r="140"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="12"
            className="text-primary/5"
          />
          <motion.circle
            cx="160"
            cy="160"
            r="140"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="12"
            strokeDasharray={2 * Math.PI * 140}
            animate={{ strokeDashoffset: 2 * Math.PI * 140 * (1 - (count % target) / target) }}
            transition={{ type: "spring", stiffness: 50 }}
            className="text-accent"
          />
        </svg>

        {/* Dynamic Tap Area */}
        <motion.div 
          className="absolute inset-8 rounded-full flex flex-col items-center justify-center text-center select-none cursor-pointer z-10"
          whileTap={{ scale: 0.9 }}
          onClick={increment}
        >
          <motion.span 
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-8xl font-black tracking-tighter text-primary"
          >
            {count}
          </motion.span>
          <div className="px-4 py-1.5 glass rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 border-accent/20 mt-4">
            {target} Goal
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-10 w-full">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 glass rounded-3xl p-2 shadow-xl border-white/40">
            {[33, 99, 100].map((t) => (
              <button
                key={t}
                onClick={() => setTarget(t)}
                className={`px-6 py-3 rounded-2xl text-sm font-black transition-all ${
                  target === t 
                    ? "bg-accent text-primary shadow-xl shadow-accent/20 scale-105" 
                    : "hover:bg-white/40 text-primary opacity-60"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          
          <button 
            onClick={reset}
            className="p-4 glass rounded-3xl text-primary hover:bg-white/80 hover:text-destructive transition-all shadow-xl group"
          >
            <RotateCcw className="w-6 h-6 group-hover:-rotate-90 transition-transform" />
          </button>
        </div>

        <div className="max-w-md text-center space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-white">Spiritual Counter</h2>
          <p className="text-white/60 text-sm font-medium leading-relaxed italic">
            &quot;Keep your tongue moist with the remembrance of Allah.&quot; 
            <br />
            Tap the center to begin.
          </p>
        </div>
      </div>
    </div>
  );
}
