"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronRight, PenLine, Calendar, 
  Sparkles, Loader2, X, Plus 
} from "lucide-react";
import { 
  collection, addDoc, onSnapshot, 
  query, orderBy, serverTimestamp 
} from "firebase/firestore";
import { db, handleFirestoreError, OperationType, signInWithGoogle } from "@/lib/firebase";
import { useAuth } from "@/components/FirebaseProvider";
import { motion, AnimatePresence } from "motion/react";

export const dynamic = 'force-dynamic';

export default function JournalPage() {
  const { user, isAuthReady, loading: authLoading } = useAuth();
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newText, setNewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isAuthReady || !user) {
      if (!authLoading && !user) setLoading(false);
      return;
    }

    const q = query(
      collection(db, "users", user.uid, "journal"), 
      orderBy("date", "desc")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEntries(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `users/${user.uid}/journal`);
    });

    return () => unsubscribe();
  }, [isAuthReady, user, authLoading, mounted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newText.trim()) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, "users", user.uid, "journal"), {
        userId: user.uid,
        text: newText.trim(),
        tags: ["Spirituality"], // Default for now
        date: serverTimestamp(),
      });
      setNewText("");
      setIsModalOpen(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `users/${user.uid}/journal`);
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted || authLoading) return (
     <div className="min-h-screen flex items-center justify-center bg-[#fafaf9]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
     </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-white/20 rounded-lg transition-colors text-primary">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </Link>
          <h1 className="text-lg font-bold text-primary">Spiritual Journal</h1>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 space-y-8">
        <div className="glass shadow-primary p-10 rounded-[48px] space-y-4 shadow-2xl shadow-primary/20 relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center">
               <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-primary">Daily Reflection</h2>
            <p className="text-primary leading-relaxed italic font-serif text-lg opacity-80">
              "Indeed, in the remembrance of Allah do hearts find rest."
            </p>
          </div>
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mb-16 blur-3xl opacity-50" />
        </div>

        {!user ? (
          <div className="p-12 glass rounded-[40px] text-center space-y-6">
             <div className="w-16 h-16 glass mx-auto rounded-3xl flex items-center justify-center">
                <PenLine className="w-8 h-8 text-primary/60" />
             </div>
             <div className="space-y-2">
                <h3 className="text-2xl font-bold text-primary">Sign in to Journal</h3>
                <p className="text-primary/60 text-sm italic font-medium">Keep your spiritual reflections private and accessible across all devices.</p>
             </div>
             <button 
                onClick={signInWithGoogle}
                className="px-8 py-3 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-accent/20"
             >
                Sign in with Google
             </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-2xl font-black tracking-tight text-white">My Entries</h3>
               <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 glass px-6 py-2.5 rounded-2xl text-sm font-black shadow-sm hover:bg-white/40 transition-colors group text-primary uppercase tracking-widest"
               >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                  <span>Add Reflection</span>
               </button>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                 <Loader2 className="w-8 h-8 animate-spin text-white/40" />
                 <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Loading journal...</p>
              </div>
            ) : (
              <div className="space-y-4 pb-20">
                {entries.map(entry => (
                  <div key={entry.id} className="p-8 glass rounded-[40px] space-y-4 hover:shadow-xl hover:shadow-black/20 transition-all duration-500 border-white/40">
                    <div className="flex items-center gap-2 text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">
                      <Calendar className="w-3 h-3 text-accent" />
                      <span>{entry.date?.toDate ? entry.date.toDate().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Today'}</span>
                    </div>
                    <p className="text-xl text-primary font-medium leading-relaxed italic font-serif opacity-90">
                      "{entry.text}"
                    </p>
                    <div className="flex gap-2">
                      {entry.tags?.map((tag: string) => (
                        <span key={tag} className="text-[10px] uppercase tracking-tighter font-black glass border-primary/10 px-3 py-1 rounded-full text-primary/60">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {entries.length === 0 && (
                  <div className="text-center py-20 glass rounded-[40px] border-dashed border-primary/20">
                     <p className="text-primary/60 italic font-serif">Your spiritual journey starts with the first reflection.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* New Entry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-primary/20 backdrop-blur-md z-[60]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg glass rounded-[48px] p-8 z-[70] shadow-2xl space-y-8 border-white/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-black tracking-tight text-primary">New Reflection</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 glass hover:bg-white rounded-full">
                  <X className="w-6 h-6 text-primary" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <textarea 
                    autoFocus
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Reflect on your day, your prayers, and your connection with the Divine..."
                    className="w-full p-8 glass rounded-[32px] outline-none focus:ring-2 focus:ring-accent/20 min-h-[200px] resize-none transition-all text-lg font-serif italic text-primary placeholder:text-primary/20"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={submitting || !newText.trim()}
                  className="w-full py-4 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all active:scale-95 shadow-xl shadow-accent/20"
                >
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Reflection"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
