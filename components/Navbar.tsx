'use client';

import React, {useEffect, useState} from 'react';
import {Menu, Moon, Sun, X} from 'lucide-react';
import {NAV_LINKS} from './SchoolData';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onApplyClick: () => void;
}

export default function Navbar({isDark, onToggleTheme, onApplyClick}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#F4F6FA]/90 dark:bg-[#07142A]/90 backdrop-blur-md border-b border-[#0B1F3A]/10 dark:border-white/10 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className={`text-base sm:text-lg font-bold tracking-tight whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B700] rounded-sm ${
            scrolled
              ? 'text-[#0B1F3A] dark:text-white'
              : 'text-white'
          }`}
        >
          Sunrise Public School
        </a>

        {/* Zone 2: 5 Clean Single-Line Nav Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium whitespace-nowrap shrink-0 py-1 transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#F5B700] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B700] rounded-sm ${
                scrolled
                  ? 'text-[#374151] hover:text-[#0B1F3A] dark:text-[#CBD5E1] dark:hover:text-white'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action Button (Desktop) + Mobile Hamburger Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onApplyClick}
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-[#0B1F3A] bg-[#F5B700] hover:bg-[#e2a900] active:scale-[0.98] rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3A]"
          >
            Apply Now
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={`md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B700] ${
              scrolled
                ? 'text-[#0B1F3A] hover:bg-[#F4F6FA] dark:text-white dark:hover:bg-white/10'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-white dark:bg-[#0F2747] border-t border-[#0B1F3A]/10 dark:border-white/10 shadow-xl"
        >
          <nav
            aria-label="Mobile navigation"
            className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-1"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-3 text-base font-medium text-[#0B1F3A] dark:text-white hover:bg-[#F4F6FA] dark:hover:bg-[#07142A] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-3 pt-4 border-t border-[#0B1F3A]/10 dark:border-white/10 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onToggleTheme}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium text-[#0B1F3A] dark:text-[#CBD5E1] bg-[#F4F6FA] dark:bg-[#07142A] rounded-lg cursor-pointer"
              >
                {isDark ? <Sun className="w-4 h-4 text-[#F5B700]" /> : <Moon className="w-4 h-4" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onApplyClick();
                }}
                className="flex-1 inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-[#0B1F3A] bg-[#F5B700] hover:bg-[#e2a900] rounded-lg cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
