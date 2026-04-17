import Link from 'next/link';

export default function Home() {
  const exampleLinks = [
    { country: "Pakistan", city: "Faisalabad" },
    { country: "UAE", city: "Dubai" },
    { country: "UK", city: "London" },
    { country: "USA", city: "New-York" }
  ];

  return (
    <div className="py-10 text-center">
      <h2 className="text-3xl font-bold text-brandGreen mb-6">Find Prayer Times</h2>
      <p className="mb-8 max-w-2xl mx-auto">Access accurate prayer times for over 50,000 cities across 190 countries. Select a popular city below or enter your location directly in the URL structure (e.g., yourdomain.com/Pakistan/Karachi).</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {exampleLinks.map((link) => (
          <Link 
            key={link.city} 
            href={`/${link.country}/${link.city}`}
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:border-brandGold transition duration-200"
          >
            <h5 className="mb-2 text-xl font-bold tracking-tight text-brandGreen">{link.city}</h5>
            <p className="font-normal text-gray-500">{link.country}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
