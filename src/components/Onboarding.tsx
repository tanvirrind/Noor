"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Moon, Bell, ChevronRight, Check } from "lucide-react";

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Noor",
      description: "Your modern companion for spiritual growth and accurate prayer timings worldwide.",
      icon: <Moon className="w-12 h-12 text-primary" />,
      color: "bg-primary/10"
    },
    {
      title: "Set Your Location",
      description: "We use high-precision data to provide accurate Salah times for your specific city.",
      icon: <Compass className="w-12 h-12 text-primary" />,
      color: "bg-secondary"
    },
    {
      title: "Never Miss a Prayer",
      description: "Enable customizable alerts for all five daily prayers and stay notified on time.",
      icon: <Bell className="w-12 h-12 text-primary" />,
      color: "bg-primary/5"
    }
  ];

  const next = () => {
    if (step < steps.length - 1) setStep(prev => prev + 1);
    else onComplete();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        <motion.div 
          key={step}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, y: -20 }}
          className="max-w-md w-full text-center space-y-8"
        >
          <div className={`w-24 h-24 mx-auto rounded-3xl ${steps[step].color} flex items-center justify-center`}>
            {steps[step].icon}
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight">{steps[step].title}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {steps[step].description}
            </p>
          </div>

          <div className="flex justify-center gap-2">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-300 ${i === step ? "w-8 bg-primary" : "w-2 bg-muted"}`} 
              />
            ))}
          </div>

          <button 
            onClick={next}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            {step === steps.length - 1 ? "Get Started" : "Continue"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
