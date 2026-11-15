'use client';

import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {motion} from 'motion/react';
import {ArrowRight, Calendar, Moon, Sun} from 'lucide-react';
import {CAMPUS_IMAGE, STAT_COUNTERS} from './SchoolData';

interface HeroAndStatsProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onBookVisitClick: () => void;
}

function AnimatedCounter({
  target,
  suffix,
  startCounting,
}: {
  target: number;
  suffix: string;
  startCounting: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let animationFrameId: number;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(() => setCount(target));
      return () => cancelAnimationFrame(animationFrameId);
    }

    const duration = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [startCounting, target]);

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function HeroAndStats({
  isDark,
  onToggleTheme,
  onBookVisitClick,
}: HeroAndStatsProps) {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [hasEnteredStats, setHasEnteredStats] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredStats(true);
          observer.disconnect();
        }
      },
      {threshold: 0.25}
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 2. Hero Section */}
      <section
        id="top"
        className="relative min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#07142A] via-[#0B1F3A] to-[#14396B] text-white pt-24 pb-16"
      >
        {/* Architectural Campus Photography Backdrop */}
        {!heroImgError && (
          <Image
            src={CAMPUS_IMAGE.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
            referrerPolicy="no-referrer"
            onError={() => setHeroImgError(true)}
          />
        )}

        {/* Calibrated directional navy scrim for >= 7:1 text legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#07142A]/95 via-[#0B1F3A]/85 to-[#0B1F3A]/60"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07142A] via-transparent to-[#07142A]/50"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.65, ease: [0.16, 1, 0.3, 1]}}
            className="max-w-3xl"
          >
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#F5B700] mb-5">
              <span>Sunrise Public School</span>
              <span aria-hidden="true" className="mx-2 text-white/40">
                ·
              </span>
              <span className="text-white/85">Est. 2001</span>
              <span aria-hidden="true" className="mx-2 text-white/40">
                ·
              </span>
              <span className="text-white/85">Grades K–12</span>
            </p>

            <h1
              className="font-display font-bold tracking-tight text-white leading-[1.08] mb-6"
              style={{
                fontSize: 'clamp(2.45rem, 5vw, 4.35rem)',
                textWrap: 'balance',
              }}
            >
              Shaping Tomorrow&apos;s Leaders
            </h1>

            <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed max-w-2xl mb-10">
              A balanced K–12 academic community where rigorous inquiry, dedicated faculty mentorship,
              and championship athletics prepare students to think clearly and lead with integrity.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#programs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#0B1F3A] bg-[#F5B700] hover:bg-[#e2a900] active:scale-[0.98] rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3A]"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onBookVisitClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B700]"
              >
                <Calendar className="w-4 h-4 text-[#F5B700]" />
                <span>Book a Visit</span>
              </button>
            </div>
          </motion.div>

          {/* Quiet Hero Footer Strip with Theme Switcher */}
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.65, delay: 0.2}}
            className="mt-16 pt-8 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-300"
          >
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span>Accredited K–12 Curriculum</span>
              <span aria-hidden="true" className="text-white/30">
                /
              </span>
              <span>Admissions Open 2027–28</span>
              <span aria-hidden="true" className="text-white/30">
                /
              </span>
              <span>Springfield Campus</span>
            </div>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B700]"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-[#F5B700]" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#F5B700]" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </motion.div>
        </div>
      </section>

      {/* 3. Animated Counters Strip */}
      <section
        ref={statsRef}
        aria-label="School key achievements"
        className="bg-[#F4F6FA] dark:bg-[#07142A] border-b border-[#0B1F3A]/10 dark:border-white/10 transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STAT_COUNTERS.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{opacity: 0, y: 16}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.3}}
                transition={{duration: 0.45, delay: idx * 0.08}}
                className="flex flex-col p-6 rounded-2xl bg-white dark:bg-[#0F2747] border border-[#0B1F3A]/10 dark:border-white/10 shadow-sm"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1F3A] dark:text-white">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    startCounting={hasEnteredStats}
                  />
                </div>
                <div className="mt-2 text-sm sm:text-base font-semibold text-[#0B1F3A] dark:text-[#F5B700]">
                  {stat.label}
                </div>
                <div className="mt-1 text-xs sm:text-sm text-[#374151] dark:text-[#CBD5E1]">
                  {stat.context}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
