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
  title: 'Sunrise Public School — Shaping Tomorrow’s Leaders',
  description:
    'Official website for Sunrise Public School featuring K-12 academic programs, campus gallery, community testimonials, and admissions inquiries.',
  openGraph: {
    title: 'Sunrise Public School — Shaping Tomorrow’s Leaders',
    description:
      'Official website for Sunrise Public School featuring K-12 academic programs, campus gallery, community testimonials, and admissions inquiries.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunrise Public School — Shaping Tomorrow’s Leaders',
    description:
      'Official website for Sunrise Public School featuring K-12 academic programs, campus gallery, community testimonials, and admissions inquiries.',
  },
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
        {children}
      </body>
    </html>
  );
}
