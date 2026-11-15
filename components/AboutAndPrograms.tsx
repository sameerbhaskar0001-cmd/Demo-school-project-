'use client';

import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {motion} from 'motion/react';
import {ArrowRight, Building2, Check, UserCheck, X} from 'lucide-react';
import {CAMPUS_IMAGE, PRINCIPAL_INFO, PROGRAMS, type ProgramItem} from './SchoolData';

interface AboutAndProgramsProps {
  onSelectProgramInquiry: (programTitle: string) => void;
}

export default function AboutAndPrograms({onSelectProgramInquiry}: AboutAndProgramsProps) {
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);
  const [campusImgError, setCampusImgError] = useState(false);
  const [principalImgError, setPrincipalImgError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProgram(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* 4. About Section */}
      <section
        id="about"
        className="py-20 sm:py-24 bg-[#F4F6FA] dark:bg-[#07142A] border-b border-[#0B1F3A]/10 dark:border-white/10 transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            {/* Campus Photo Column */}
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.25}}
              transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
              className="lg:col-span-6 relative min-h-[320px] sm:min-h-[400px] lg:min-h-[460px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B1F3A] to-[#19427A] border border-[#0B1F3A]/10 dark:border-white/10"
            >
              {!campusImgError ? (
                <Image
                  src={CAMPUS_IMAGE.src}
                  alt={CAMPUS_IMAGE.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => setCampusImgError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                  <Building2 className="w-12 h-12 text-[#F5B700] mb-3" />
                  <p className="text-lg font-semibold">Sunrise Public School Campus</p>
                  <p className="text-sm text-slate-300 mt-1">Academic Courtyard & North Wing</p>
                </div>
              )}
            </motion.div>

            {/* Editorial Copy Column */}
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.25}}
              transition={{duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              <p className="text-sm font-semibold text-[#0B1F3A]/70 dark:text-[#F5B700] mb-3">
                About Our School
              </p>

              <h2
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F3A] dark:text-white leading-tight mb-5"
                style={{textWrap: 'balance'}}
              >
                Rooted in Scholarship, Built for Real-World Character
              </h2>

              <p className="text-base text-[#374151] dark:text-[#CBD5E1] leading-relaxed mb-8">
                Founded in 2001, Sunrise Public School combines structured foundational academics with
                exploratory laboratories, studio arts, and team athletics. Our 12:1 student-faculty
                ratio ensures every student is known personally—challenged in areas of strength and
                supported when tackling unfamiliar ground.
              </p>

              <div className="divide-y divide-[#0B1F3A]/10 dark:divide-white/10 border-y border-[#0B1F3A]/10 dark:border-white/10 bg-white dark:bg-[#0F2747] rounded-2xl px-6">
                <div className="py-4 flex items-baseline justify-between gap-4">
                  <span className="text-sm font-semibold text-[#0B1F3A] dark:text-white">
                    Small Seminar Classrooms
                  </span>
                  <span className="text-sm text-[#374151] dark:text-[#CBD5E1] tabular-nums">
                    18–22 students max
                  </span>
                </div>
                <div className="py-4 flex items-baseline justify-between gap-4">
                  <span className="text-sm font-semibold text-[#0B1F3A] dark:text-white">
                    Faculty Mentorship
                  </span>
                  <span className="text-sm text-[#374151] dark:text-[#CBD5E1]">
                    Weekly 1-on-1 academic advising
                  </span>
                </div>
                <div className="py-4 flex items-baseline justify-between gap-4">
                  <span className="text-sm font-semibold text-[#0B1F3A] dark:text-white">
                    Green Campus Facilities
                  </span>
                  <span className="text-sm text-[#374151] dark:text-[#CBD5E1]">
                    14-acre grounds · 6 specialist labs
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Principal's Welcome Note */}
          <motion.div
            initial={{opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.25}}
            transition={{duration: 0.5, delay: 0.1}}
            className="mt-12 rounded-2xl bg-white dark:bg-[#0F2747] border border-[#0B1F3A]/10 dark:border-white/10 p-6 sm:p-8 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-[#0B1F3A] border border-[#0B1F3A]/10 dark:border-white/15">
                {!principalImgError ? (
                  <Image
                    src={PRINCIPAL_INFO.image}
                    alt={PRINCIPAL_INFO.alt}
                    fill
                    sizes="96px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                    onError={() => setPrincipalImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#F5B700]">
                    <UserCheck className="w-8 h-8" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold text-[#0B1F3A]/75 dark:text-[#F5B700] mb-1.5">
                  From the Principal&apos;s Desk
                </p>
                <blockquote className="text-sm sm:text-base text-[#374151] dark:text-[#CBD5E1] leading-relaxed mb-3">
                  &ldquo;{PRINCIPAL_INFO.message}&rdquo;
                </blockquote>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
                  <span className="font-semibold text-[#0B1F3A] dark:text-white">
                    {PRINCIPAL_INFO.name}
                  </span>
                  <span aria-hidden="true" className="text-[#374151]/40 dark:text-[#CBD5E1]/40">
                    ·
                  </span>
                  <span className="text-[#374151] dark:text-[#CBD5E1]">
                    {PRINCIPAL_INFO.credentials}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Programs Section (4 Glass-Style Cards) */}
      <section
        id="programs"
        className="relative py-20 sm:py-24 bg-[#F4F6FA] dark:bg-[#07142A] border-b border-[#0B1F3A]/10 dark:border-white/10 overflow-hidden transition-colors duration-200"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/3 w-96 h-96 rounded-full bg-[#F5B700]/10 dark:bg-[#F5B700]/5 blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.3}}
            transition={{duration: 0.5}}
            className="max-w-2xl mb-12"
          >
            <p className="text-sm font-semibold text-[#0B1F3A]/80 dark:text-[#F5B700] mb-3">
              Academic Pathways
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F3A] dark:text-white leading-tight mb-4"
              style={{textWrap: 'balance'}}
            >
              Structured Programs Across Every Stage
            </h2>
            <p className="text-base text-[#374151] dark:text-[#CBD5E1] leading-relaxed">
              Four cohesive divisions guide students from foundational literacy to university-level
              research and athletic excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {PROGRAMS.map((program, idx) => (
              <motion.article
                key={program.id}
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.2}}
                transition={{duration: 0.45, delay: idx * 0.08}}
                className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/90 dark:bg-[#0F2747]/90 backdrop-blur-md border border-[#0B1F3A]/10 dark:border-white/15 shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:border-[#F5B700] transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4 text-xs font-medium text-[#374151] dark:text-[#CBD5E1]">
                    <span className="font-semibold text-[#0B1F3A] dark:text-[#F5B700] tabular-nums">
                      {program.index}
                    </span>
                    <span>
                      {program.grades}
                      <span aria-hidden="true" className="mx-1.5">
                        ·
                      </span>
                      {program.ages}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-3">
                    {program.title}
                  </h3>

                  <p className="text-sm text-[#374151] dark:text-[#CBD5E1] leading-relaxed mb-6">
                    {program.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#0B1F3A]/10 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setSelectedProgram(program)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] dark:text-[#F5B700] hover:gap-3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B700] rounded-sm"
                  >
                    <span>View Curriculum</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Program Curriculum Details Modal */}
      {selectedProgram && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="program-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061224]/75 backdrop-blur-sm"
          onClick={() => setSelectedProgram(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#0F2747] border border-[#0B1F3A]/15 dark:border-white/15 p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-xs font-medium text-[#374151] dark:text-[#CBD5E1] mb-1">
                  {selectedProgram.index} {selectedProgram.grades} · {selectedProgram.ages}
                </p>
                <h3
                  id="program-modal-title"
                  className="text-2xl font-bold text-[#0B1F3A] dark:text-white"
                >
                  {selectedProgram.title} Program
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProgram(null)}
                aria-label="Close program details"
                className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-[#374151] hover:text-[#0B1F3A] dark:text-[#CBD5E1] dark:hover:text-white hover:bg-[#F4F6FA] dark:hover:bg-[#07142A] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm sm:text-base text-[#374151] dark:text-[#CBD5E1] leading-relaxed mb-6">
              {selectedProgram.summary}
            </p>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-[#0B1F3A] dark:text-white mb-3">
                Core Curriculum Highlights
              </h4>
              <ul className="space-y-2.5">
                {selectedProgram.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-[#374151] dark:text-[#CBD5E1]"
                  >
                    <Check className="w-4 h-4 text-[#0B1F3A] dark:text-[#F5B700] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-[#374151] dark:text-[#CBD5E1] pb-6 border-b border-[#0B1F3A]/10 dark:border-white/10">
              {selectedProgram.schedule}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedProgram(null)}
                className="px-4 py-2.5 text-sm font-medium text-[#374151] dark:text-[#CBD5E1] hover:bg-[#F4F6FA] dark:hover:bg-[#07142A] rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const title = selectedProgram.title;
                  setSelectedProgram(null);
                  onSelectProgramInquiry(title);
                }}
                className="px-5 py-2.5 text-sm font-semibold text-[#0B1F3A] bg-[#F5B700] hover:bg-[#e2a900] rounded-lg transition-colors cursor-pointer"
              >
                Inquire About {selectedProgram.title}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
