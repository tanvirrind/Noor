import React from 'react';

export default function CityPrayerPage({ 
  cityName, 
  countryName, 
  date, 
  prayers, 
  jsonLd 
}: any) {
  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Invisible SEO Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-4xl font-bold text-brandGreen text-center capitalize mb-2">
        Prayer Times in {cityName}
      </h1>
      <p className="text-center text-gray-600 mb-8">{countryName} - {date.readable}</p>

      <div className="bg-white rounded-lg shadow-lg border-t-4 border-brandGold overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {prayers.map((prayer: any) => (
            <li key={prayer.name} className={`flex justify-between items-center p-6 hover:bg-gray-50 ${prayer.secondary ? 'opacity-70 bg-gray-50' : ''}`}>
              <span className="text-xl font-medium text-gray-900">{prayer.name}</span>
              <span className="text-xl font-bold text-brandGreen">{prayer.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
