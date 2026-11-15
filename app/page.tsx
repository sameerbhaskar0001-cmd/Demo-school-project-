'use client';

import React, {useEffect, useState} from 'react';
import {motion, useScroll, useSpring} from 'motion/react';
import {Moon, Sun} from 'lucide-react';
import Navbar from '@/components/Navbar';
import HeroAndStats from '@/components/HeroAndStats';
import AboutAndPrograms from '@/components/AboutAndPrograms';
import GalleryAndTestimonials from '@/components/GalleryAndTestimonials';
import AdmissionsAndFooter from '@/components/AdmissionsAndFooter';

export default function HomePage() {
  const [isDark, setIsDark] = useState(false);
  const [inquiryType, setInquiryType] = useState('Admissions Application');
  const [focusTrigger, setFocusTrigger] = useState(0);

  const {scrollYProgress} = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      let saved: string | null = null;
      try {
        saved = window.localStorage.getItem('sunrise-theme');
      } catch {
        saved = null;
      }
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialDark = saved ? saved === 'dark' : prefersDark;
      setIsDark(initialDark);
      document.documentElement.classList.toggle('dark', initialDark);
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleToggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      try {
        window.localStorage.setItem('sunrise-theme', next ? 'dark' : 'light');
      } catch {
        // Ignore storage errors in restricted iframes
      }
      return next;
    });
  };

  const scrollToAdmissions = (type: string) => {
    setInquiryType(type);
    setFocusTrigger((prev) => prev + 1);
    const el = document.getElementById('admissions');
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <motion.div
        aria-hidden="true"
        style={{scaleX}}
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#F5B700] origin-left z-[60] pointer-events-none"
      />

      <Navbar
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onApplyClick={() => scrollToAdmissions('Admissions Application')}
      />

      <main className="flex-1">
        <HeroAndStats
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
          onBookVisitClick={() => scrollToAdmissions('Book a Campus Visit')}
        />

        <AboutAndPrograms
          onSelectProgramInquiry={(programTitle) =>
            scrollToAdmissions(programTitle)
          }
        />

        <GalleryAndTestimonials />

        <AdmissionsAndFooter
          inquiryType={inquiryType}
          onInquiryTypeChange={setInquiryType}
          focusTrigger={focusTrigger}
        />
      </main>

      {/* Desktop quick theme toggle button */}
      <button
        type="button"
        onClick={handleToggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="hidden md:inline-flex fixed bottom-6 right-6 z-40 w-11 h-11 items-center justify-center rounded-full bg-[#0B1F3A] dark:bg-[#F5B700] text-white dark:text-[#0B1F3A] shadow-lg border border-white/15 dark:border-[#0B1F3A]/15 hover:scale-105 transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B700]"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>
  );
}
