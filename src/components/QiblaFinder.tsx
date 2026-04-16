"use client";

import { useState, useEffect } from "react";
import { Compass, Navigation } from "lucide-react";
import { motion } from "motion/react";

export default function QiblaFinder() {
  const [heading, setHeading] = useState<number | null>(null);
  const [qiblaDir, setQiblaDir] = useState<number>(291); // Default for sample
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOrientation = (e: any) => {
      if (e.webkitCompassHeading) {
        setHeading(e.webkitCompassHeading);
      } else if (e.alpha !== null) {
        setHeading(360 - e.alpha);
      }
    };

    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation);
      // iOS request permission
      if ((DeviceOrientationEvent as any).requestPermission) {
        setError("Device orientation requires permission on iOS. Please click 'Calibrate' to enable.");
      }
    } else {
      setError("Device orientation is not supported on your browser.");
    }

    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  const requestPermission = async () => {
    if ((DeviceOrientationEvent as any).requestPermission) {
      try {
        const res = await (DeviceOrientationEvent as any).requestPermission();
        if (res === "granted") {
          setError(null);
        }
      } catch (err) {
        setError("Permission denied.");
      }
    }
  };

  const isAligned = heading !== null && Math.abs(heading - qiblaDir) < 5;

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-12">
      <div className="relative w-80 h-80">
        {/* Background Dial */}
        <div className="absolute inset-0 border-4 border-muted rounded-full flex items-center justify-center">
          <div className="w-full h-full p-2">
             <div className="w-full h-full border border-dashed border-primary/20 rounded-full" />
          </div>
        </div>

        {/* Compass Needle */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: -(heading || 0) }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <div className="relative w-1 h-3/4 bg-muted rounded-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-destructive rounded-full" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-6 font-bold text-xs">N</div>
          </div>
        </motion.div>

        {/* Qibla Indicator */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: qiblaDir - (heading || 0) }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <div className="relative w-2 h-1/2">
             <div className={`absolute -top-12 left-1/2 -translate-x-1/2 transition-colors duration-500 ${isAligned ? "text-primary scale-125" : "text-primary/40"}`}>
                <Navigation className="w-10 h-10 fill-current" />
             </div>
          </div>
        </motion.div>

        {/* Center alignment ring */}
        <div className={`absolute inset-0 rounded-full border-8 transition-all duration-500 ${isAligned ? "border-primary scale-105 opacity-100" : "border-transparent opacity-0"}`} />
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          Qibla Finder
          {isAligned && <span className="bg-primary text-white text-[10px] px-2 py-1 rounded-full animate-pulse">ALIGNED</span>}
        </h2>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Rotate your device until the Kaaba icon turns solid gold. 
          {heading === null && " Stand in an open area for better accuracy."}
        </p>
        
        {error && (
          <button 
            onClick={requestPermission}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-full text-sm font-bold shadow-lg"
          >
            Calibrate Compass
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        <div className="p-4 bg-white border rounded-2xl text-center">
          <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Heading</p>
          <p className="text-2xl font-black">{Math.round(heading || 0)}°</p>
        </div>
        <div className="p-4 bg-white border rounded-2xl text-center">
          <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Qibla</p>
          <p className="text-2xl font-black">{qiblaDir}°</p>
        </div>
      </div>
    </div>
  );
}
