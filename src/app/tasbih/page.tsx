import TasbihCounter from "@/components/TasbihCounter";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function TasbihPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col">
      <header className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </Link>
          <h1 className="text-lg font-bold">Tasbih Counter</h1>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center">
        <TasbihCounter />
      </main>
    </div>
  );
}
