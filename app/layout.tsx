import type {Metadata} from 'next';
import {Libre_Baskerville, Poppins} from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-serif-display',
});

export const metadata: Metadata = {
  title: 'Sunrise Public School | Demo Website Project',
  description:
    'Explore Sunrise Public School — a modern responsive school demo website showcasing K-12 programs, campus gallery, testimonials, and admissions.',
  openGraph: {
    title: 'Sunrise Public School | Demo Website Project',
    description:
      'Explore Sunrise Public School — a modern responsive school demo website showcasing K-12 programs, campus gallery, testimonials, and admissions.',
    siteName: 'Sunrise Public School (Demo)',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1562774053-701939374585?fit=crop&w=1200&h=630&q=80&fm=jpg',
        width: 1200,
        height: 630,
        alt: 'Sunrise Public School Campus Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunrise Public School | Demo Website Project',
    description:
      'Explore Sunrise Public School — a modern responsive school demo website showcasing K-12 programs, campus gallery, testimonials, and admissions.',
    images: [
      'https://images.unsplash.com/photo-1562774053-701939374585?fit=crop&w=1200&h=630&q=80&fm=jpg',
    ],
  },
};

const schoolJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Sunrise Public School (Demo Project)',
  description:
    'A modern responsive school demo website showcasing K-12 programs, campus gallery, testimonials, and admissions.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${libreBaskerville.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-[family-name:var(--font-poppins)] bg-[#F4F6FA] text-[#374151] dark:bg-[#07142A] dark:text-[#CBD5E1] antialiased selection:bg-[#F5B700] selection:text-[#0B1F3A] transition-colors duration-200"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(schoolJsonLd)}}
        />
        {children}
      </body>
    </html>
  );
}
