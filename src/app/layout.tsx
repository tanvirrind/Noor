import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Souq Al Madina - Global Prayer Timings",
  description: "Accurate Islamic prayer times for cities worldwide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans min-h-screen flex flex-col">
        <header className="bg-brandGreen text-white border-b-4 border-brandGold p-4 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <img src="/logo.png" alt="Souq Al Madina" className="h-16 w-16 rounded-full border-2 border-brandGold bg-white object-contain" />
            <div>
              <h1 className="text-2xl font-bold text-brandGold">Souq Al Madina</h1>
              <p className="text-sm">Global Prayer Timings</p>
            </div>
          </div>
        </header>
        <main className="flex-grow max-w-7xl mx-auto w-full p-4">
          {children}
        </main>
        <footer className="bg-brandGreen text-brandGold p-4 text-center mt-auto border-t-4 border-brandGold">
          <p>&copy; {new Date().getFullYear()} Souq Al Madina. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
