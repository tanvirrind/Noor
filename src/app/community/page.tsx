"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronRight, Heart, MessageSquare, 
  Send, Users, Shield, Loader2 
} from "lucide-react";
import { 
  collection, addDoc, onSnapshot, 
  query, orderBy, limit, serverTimestamp, 
  updateDoc, doc, increment
} from "firebase/firestore";
import { db, handleFirestoreError, OperationType, signInWithGoogle } from "@/lib/firebase";
import { useAuth } from "@/components/FirebaseProvider";

export const dynamic = 'force-dynamic';

export default function CommunityPage() {
  const { user, isAuthReady } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [newRequest, setNewRequest] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isAuthReady) return;

    const q = query(collection(db, "prayerRequests"), orderBy("createdAt", "desc"), limit(50));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, "prayerRequests");
    });

    return () => unsubscribe();
  }, [isAuthReady, mounted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      if (confirm("You need to be signed in to submit a request. Sign in with Google?")) {
        await signInWithGoogle();
      }
      return;
    }
    if (!newRequest.trim()) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, "prayerRequests"), {
        authorUid: user.uid,
        authorName: isAnonymous ? "Anonymous User" : user.displayName || "Unknown",
        text: newRequest.trim(),
        prayersCount: 0,
        isAnonymous,
        createdAt: serverTimestamp(),
      });
      setNewRequest("");
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, "prayerRequests");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePray = async (requestId: string) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, "prayerRequests", requestId), {
        prayersCount: increment(1)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `prayerRequests/${requestId}`);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-white/20 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 rotate-180 text-primary" />
          </Link>
          <h1 className="text-lg font-bold text-primary">Community Support</h1>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-12">
        {/* Community Banner */}
        <section className="glass rounded-[56px] p-12 relative overflow-hidden group">
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">
              <Users className="w-3 h-3 text-accent" />
              {requests.length}+ Prayers Shared
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-primary">
              Prayers in <span className="text-accent italic font-serif font-light">Unity.</span>
            </h2>
            <p className="text-primary/60 max-w-md leading-relaxed font-medium italic">
              Submit a prayer request or join others in their Duas. A community built on empathy and spiritual support.
            </p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-accent/10 blur-3xl transition-transform group-hover:scale-150 duration-700" />
        </section>

        {/* Submit Request */}
        <section className="p-8 glass rounded-[40px] space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                <Send className="w-5 h-5 text-primary" />
             </div>
             <h3 className="text-xl font-bold text-primary">Ask for Duas</h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <textarea 
                value={newRequest}
                onChange={(e) => setNewRequest(e.target.value)}
                placeholder="What would you like the community to pray for?"
                className="w-full p-6 glass rounded-3xl outline-none focus:ring-2 focus:ring-accent/20 min-h-[120px] resize-none transition-all placeholder:text-primary/30 text-primary font-medium"
              />
            </div>
            <div className="flex items-center justify-between">
              <button 
                type="button"
                onClick={() => setIsAnonymous(!isAnonymous)}
                className="flex items-center gap-2 text-xs text-primary/60 font-bold hover:text-primary transition-colors"
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isAnonymous ? "bg-accent border-accent" : "glass border-primary/20"}`}>
                  {isAnonymous && <Shield className="w-3 h-3 text-primary" />}
                </div>
                <span>Anonymous Support</span>
              </button>
              <button 
                type="submit"
                disabled={submitting || !newRequest.trim()}
                className="px-8 py-3 bg-accent text-primary rounded-2xl font-bold hover:opacity-90 disabled:opacity-50 transition-all active:scale-95 shadow-xl shadow-accent/20"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Request"}
              </button>
            </div>
          </form>
        </section>

        {/* Request Feed */}
        <section className="space-y-6 pb-24">
          <h3 className="text-2xl font-black tracking-tight flex items-center gap-2 text-white">
            Active Requests
            <span className="w-2 h-2 rounded-full bg-accent" />
          </h3>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-white/40 gap-4">
               <Loader2 className="w-8 h-8 animate-spin" />
               <p className="text-sm font-bold uppercase tracking-widest">Loading community feed...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map(req => (
                <div key={req.id} className="p-8 glass rounded-[40px] shadow-sm hover:shadow-xl hover:shadow-black/20 transition-all duration-500 overflow-hidden relative group border-white/40">
                    <div className="space-y-6 relative z-10 text-primary">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full glass border-primary/20 flex items-center justify-center font-black text-sm uppercase text-primary">
                            {req.authorName[0]}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-primary">{req.authorName}</p>
                            <p className="text-[10px] uppercase font-black text-primary/40 tracking-widest">
                              {req.createdAt?.toDate ? req.createdAt.toDate().toLocaleDateString() : 'Just now'}
                            </p>
                          </div>
                        </div>
                        <button className="p-2 glass hover:bg-white rounded-full transition-colors">
                          <MessageSquare className="w-4 h-4 text-primary" />
                        </button>
                      </div>
                      <p className="text-xl font-serif italic text-primary/80 leading-relaxed">
                        &quot;{req.text}&quot;
                      </p>
                      <div className="pt-4 flex items-center justify-between border-t border-accent/20 border-dashed">
                        <div className="flex items-center gap-1.5">
                            <div className="flex -space-x-2">
                              {[1,2,3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full border-2 border-white glass" />
                              ))}
                            </div>
                            <p className="text-[10px] font-black text-primary/40 uppercase ml-2 tracking-widest">
                              {req.prayersCount || 0} People Prayed
                            </p>
                        </div>
                        <button 
                          onClick={() => handlePray(req.id)}
                          className="flex items-center gap-2 px-6 py-2 bg-accent text-primary rounded-full text-xs font-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent/20 uppercase tracking-widest"
                        >
                          <Heart className="w-3 h-3 fill-current" />
                          <span>I Prayed</span>
                        </button>
                      </div>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-accent transform translate-x-1 group-hover:translate-x-0 transition-transform" />
                </div>
              ))}
              {requests.length === 0 && (
                <div className="text-center py-20 glass rounded-[40px] border-dashed border-primary/20">
                   <p className="text-primary/60 italic font-serif">Be the first to share a prayer request.</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
