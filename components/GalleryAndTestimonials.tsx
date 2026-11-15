'use client';

import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {motion} from 'motion/react';
import {Camera, ChevronLeft, ChevronRight, Quote, X} from 'lucide-react';
import {GALLERY_CATEGORIES, GALLERY_ITEMS, TESTIMONIALS} from './SchoolData';

export default function GalleryAndTestimonials() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [activeSlide, setActiveSlide] = useState(0);

  const filteredGallery =
    activeCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredGallery.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredGallery.length) % filteredGallery.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredGallery.length]);

  const handlePrevTestimonial = () => {
    setActiveSlide((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNextTestimonial = () => {
    setActiveSlide((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  // Compute the 3 visible testimonial cards starting from activeSlide
  const visibleTestimonials = [0, 1, 2].map(
    (offset) => TESTIMONIALS[(activeSlide + offset) % TESTIMONIALS.length]
  );

  return (
    <>
      {/* 6. Campus Gallery Section (6 images with hover zoom & lightbox) */}
      <section
        id="gallery"
        className="py-20 sm:py-24 bg-[#F4F6FA] dark:bg-[#07142A] border-b border-[#0B1F3A]/10 dark:border-white/10 transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <motion.div
              initial={{opacity: 0, y: 16}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.3}}
              transition={{duration: 0.5}}
              className="max-w-xl"
            >
              <p className="text-sm font-semibold text-[#0B1F3A]/80 dark:text-[#F5B700] mb-3">
                Campus Life
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F3A] dark:text-white leading-tight mb-4"
                style={{textWrap: 'balance'}}
              >
                Spaces Built for Discovery & Expression
              </h2>
              <p className="text-base text-[#374151] dark:text-[#CBD5E1] leading-relaxed">
                Explore our specialist laboratories, sunlit reading rooms, fine arts studios, and
                athletic grounds. Select any photograph to inspect full screen.
              </p>
            </motion.div>

            {/* Interactive Category Filter Bar */}
            <div
              role="tablist"
              aria-label="Filter campus gallery"
              className="inline-flex flex-nowrap items-center gap-1 p-1.5 rounded-xl bg-white dark:bg-[#0F2747] border border-[#0B1F3A]/10 dark:border-white/10 shadow-sm overflow-x-auto max-w-full shrink-0 self-start lg:self-end"
            >
              {GALLERY_CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveCategory(category);
                      setLightboxIndex(null);
                    }}
                    className={`px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#0B1F3A] text-white dark:bg-[#F5B700] dark:text-[#0B1F3A] font-semibold'
                        : 'text-[#374151] dark:text-[#CBD5E1] hover:text-[#0B1F3A] dark:hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, idx) => (
              <motion.button
                key={item.id}
                layout
                type="button"
                initial={{opacity: 0, y: 16}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.35, delay: idx * 0.04}}
                onClick={() => setLightboxIndex(idx)}
                className="group relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B1F3A] to-[#19427A] border border-[#0B1F3A]/10 dark:border-white/10 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B700]"
              >
                {!failedImages[item.id] ? (
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({...prev, [item.id]: true}))
                    }
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                    <Camera className="w-8 h-8 text-[#F5B700] mb-2" />
                    <span className="text-sm font-semibold">{item.title}</span>
                  </div>
                )}

                {/* Measured scrim for WCAG AA contrast */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#061224]/90 via-[#061224]/30 to-transparent transition-opacity duration-200"
                />

                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-xs font-medium text-[#F5B700] mb-1">
                    {item.category}
                  </p>
                  <h3 className="text-base sm:text-lg font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Lightbox Modal */}
      {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={filteredGallery[lightboxIndex].title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061224]/90 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-[#0F2747] border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full bg-[#07142A]">
              <Image
                src={filteredGallery[lightboxIndex].image}
                alt={filteredGallery[lightboxIndex].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close photo viewer"
                className="absolute top-4 right-4 w-11 h-11 inline-flex items-center justify-center rounded-lg bg-[#07142A]/85 text-white hover:bg-[#F5B700] hover:text-[#0B1F3A] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 text-white">
              <div>
                <p className="text-xs font-medium text-[#F5B700]">
                  {filteredGallery[lightboxIndex].category} ·{' '}
                  <span className="tabular-nums">
                    {lightboxIndex + 1} / {filteredGallery.length}
                  </span>
                </p>
                <h3 className="text-lg font-bold mt-0.5">
                  {filteredGallery[lightboxIndex].title}
                </h3>
                <p className="text-sm text-[#CBD5E1] mt-1">
                  {filteredGallery[lightboxIndex].caption}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex(
                      (lightboxIndex - 1 + filteredGallery.length) %
                        filteredGallery.length
                    )
                  }
                  aria-label="Previous gallery photo"
                  className="w-11 h-11 inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex + 1) % filteredGallery.length)
                  }
                  aria-label="Next gallery photo"
                  className="w-11 h-11 inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Testimonials Section (3-Card Interactive Carousel) */}
      <section
        id="testimonials"
        className="py-20 sm:py-24 bg-[#F4F6FA] dark:bg-[#07142A] transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <motion.div
              initial={{opacity: 0, y: 16}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.3}}
              transition={{duration: 0.5}}
              className="max-w-2xl"
            >
              <p className="text-sm font-semibold text-[#0B1F3A]/80 dark:text-[#F5B700] mb-3">
                Community Voices
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F3A] dark:text-white leading-tight"
                style={{textWrap: 'balance'}}
              >
                Trusted by Families &amp; Alumni
              </h2>
            </motion.div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handlePrevTestimonial}
                aria-label="Previous testimonial"
                className="w-11 h-11 inline-flex items-center justify-center rounded-lg bg-white dark:bg-[#0F2747] border border-[#0B1F3A]/15 dark:border-white/15 text-[#0B1F3A] dark:text-white hover:border-[#F5B700] hover:bg-[#F5B700] hover:text-[#0B1F3A] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B700]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextTestimonial}
                aria-label="Next testimonial"
                className="w-11 h-11 inline-flex items-center justify-center rounded-lg bg-white dark:bg-[#0F2747] border border-[#0B1F3A]/15 dark:border-white/15 text-[#0B1F3A] dark:text-white hover:border-[#F5B700] hover:bg-[#F5B700] hover:text-[#0B1F3A] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B700]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 3 Cards Carousel Viewport */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleTestimonials.map((item, idx) => (
              <motion.article
                key={`${item.id}-${activeSlide}`}
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3, delay: idx * 0.05}}
                className={`flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-colors ${
                  idx === 0
                    ? 'bg-white dark:bg-[#0F2747] border-[#F5B700] shadow-md'
                    : 'bg-white dark:bg-[#0F2747] border-[#0B1F3A]/10 dark:border-white/10 shadow-sm'
                } ${idx > 0 ? 'hidden md:flex' : 'flex'}`}
              >
                <div>
                  <Quote
                    aria-hidden="true"
                    className="w-7 h-7 text-[#F5B700] mb-4"
                  />
                  <blockquote className="text-sm sm:text-base text-[#374151] dark:text-[#CBD5E1] leading-relaxed mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-[#0B1F3A]/10 dark:border-white/10">
                  <div className="font-semibold text-sm sm:text-base text-[#0B1F3A] dark:text-white">
                    {item.author}
                  </div>
                  <div className="text-xs sm:text-sm text-[#374151] dark:text-[#CBD5E1] mt-0.5">
                    {item.role}
                  </div>
                  <div className="text-xs text-[#374151] dark:text-[#F5B700] mt-2">
                    {item.context}
                    <span aria-hidden="true" className="mx-1.5">
                      ·
                    </span>
                    {item.outcome}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Slider Dot Indicators */}
          <div
            className="mt-8 flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Testimonial slides"
          >
            {TESTIMONIALS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeSlide === idx}
                aria-label={`Show testimonial ${idx + 1} from ${item.author}`}
                onClick={() => setActiveSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                  activeSlide === idx
                    ? 'w-8 bg-[#0B1F3A] dark:bg-[#F5B700]'
                    : 'w-2.5 bg-[#0B1F3A]/25 dark:bg-white/25 hover:bg-[#0B1F3A]/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
