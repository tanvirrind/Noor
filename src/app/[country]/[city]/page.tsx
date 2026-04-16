import { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPrayerPage from "@/components/CityPrayerPage";

interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

interface AladhanResponse {
  code: number;
  status: string;
  data: {
    timings: PrayerTimings;
    date: {
      readable: string;
      timestamp: string;
      hijri: {
        date: string;
        day: string;
        month: { en: string; ar: string };
        year: string;
      };
    };
    meta: {
      method: { name: string };
      timezone: string;
    };
  };
}

async function getPrayerTimings(country: string, city: string): Promise<AladhanResponse | null> {
  try {
    const res = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; city: string }> }): Promise<Metadata> {
  const { country, city } = await params;
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  const countryName = country.charAt(0).toUpperCase() + country.slice(1);

  return {
    title: `Prayer Times ${cityName}, ${countryName} - Fajr, Dhuhr, Asr, Maghrib, Isha`,
    description: `Get accurate Islamic prayer timings for ${cityName}, ${countryName} today. Includes Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha times with Hijri date.`,
    openGraph: {
      title: `Prayer Times in ${cityName}`,
      description: `Daily Salah times and Hijri calendar for ${cityName}, ${countryName}.`,
    }
  };
}

export const dynamic = 'force-dynamic';

export default async function CityPage({ params }: { params: Promise<{ country: string; city: string }> }) {
  const { country, city } = await params;
  const data = await getPrayerTimings(country, city);

  if (!data) {
    notFound();
  }

  const { timings, date, meta } = data.data;
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  const countryName = country.charAt(0).toUpperCase() + country.slice(1);

  const prayers = [
    { name: "Fajr", time: timings.Fajr, icon: "dawn" },
    { name: "Sunrise", time: timings.Sunrise, icon: "sun", secondary: true },
    { name: "Dhuhr", time: timings.Dhuhr, icon: "sun" },
    { name: "Asr", time: timings.Asr, icon: "sun-medium" },
    { name: "Maghrib", time: timings.Maghrib, icon: "sunset" },
    { name: "Isha", time: timings.Isha, icon: "moon" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Prayer Timings in ${cityName}, ${countryName}`,
    "description": `Islamic prayer timings for ${cityName}. Fajr: ${timings.Fajr}, Maghrib: ${timings.Maghrib}.`,
    "mainEntity": {
      "@type": "Place",
      "name": cityName,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityName,
        "addressCountry": countryName
      }
    }
  };

  return (
    <CityPrayerPage 
      country={country}
      city={city}
      cityName={cityName}
      countryName={countryName}
      timings={timings}
      date={date}
      meta={meta}
      prayers={prayers}
      jsonLd={jsonLd}
    />
  );
}
