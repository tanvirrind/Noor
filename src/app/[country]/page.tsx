import Link from "next/link";
import { ChevronRight, MapPin, Search } from "lucide-react";
import { notFound } from "next/navigation";

// In a real app, this would come from a comprehensive database or API
const countryData: Record<string, string[]> = {
  pakistan: ["Faisalabad", "Lahore", "Karachi", "Islamabad", "Multan", "Peshawar", "Quetta", "Sialkot"],
  "united kingdom": ["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Sheffield"],
  "united states": ["New York", "Chicago", "Houston", "Los Angeles", "Phoenix", "Philadelphia"],
  "saudi arabia": ["Mecca", "Medina", "Riyadh", "Jeddah", "Dammam"],
  "united arab emirates": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
  canada: ["Toronto", "Vancouver", "Montreal", "Calgary"],
  australia: ["Sydney", "Melbourne", "Brisbane", "Perth"],
  turkey: ["Istanbul", "Ankara", "Izmir", "Bursa"],
};

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const cities = countryData[country.toLowerCase().replace(/-/g, " ")];

  if (!cities) {
    notFound();
  }

  const countryName = country.charAt(0).toUpperCase() + country.slice(1).replace(/-/g, " ");

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9]">
      {/* Dynamic Header */}
      <header className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </Link>
          <div className="flex-1 flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight">{countryName}</h1>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <span>Cities</span>
              <span className="bg-primary text-white px-2 py-0.5 rounded-full">{cities.length}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full space-y-8">
        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder={`Search cities in ${countryName}...`}
            className="w-full pl-12 pr-4 py-4 bg-white border rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
          />
        </div>

        {/* City Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cities.map((city) => (
            <Link 
              key={city} 
              href={`/${country.toLowerCase()}/${city.toLowerCase()}`}
              className="flex items-center justify-between p-6 bg-white border rounded-2xl hover:border-primary/50 hover:shadow-lg hover:shadow-black/5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{city}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Daily Prayers</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>

        {/* SEO Content Section */}
        <article className="prose prose-stone max-w-none mt-12 p-8 bg-white border rounded-3xl">
          <h2 className="text-2xl font-bold">Islamic Prayer Timings in {countryName}</h2>
          <p className="text-muted-foreground leading-relaxed">
            Finding accurate prayer times in {countryName} is essential for Muslims who wish to perform their daily Salah on time. Our platform provides the most precise and up-to-date timings for all major cities including {cities.slice(0, 3).join(", ")}, and many more. Whether you are a local resident or a traveler, Noor ensures you never miss a prayer.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <div className="space-y-2">
              <h4 className="font-bold text-sm uppercase tracking-tighter">Verified Data</h4>
              <p className="text-xs text-muted-foreground">Source from Aladhan API and local Islamic centers.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-sm uppercase tracking-tighter">Real-time Calculation</h4>
              <p className="text-xs text-muted-foreground">Adjusted based on standard calculation methods.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-sm uppercase tracking-tighter">Mobile Ready</h4>
              <p className="text-xs text-muted-foreground">Access prayer times on the go with our responsive UI.</p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
