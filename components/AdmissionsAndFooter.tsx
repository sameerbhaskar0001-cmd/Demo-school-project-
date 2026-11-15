'use client';

import React, {useEffect, useRef, useState} from 'react';
import {motion} from 'motion/react';
import {
  CheckCircle2,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react';
import {NAV_LINKS, VISIT_SLOTS} from './SchoolData';

interface AdmissionsAndFooterProps {
  inquiryType: string;
  onInquiryTypeChange: (val: string) => void;
  focusTrigger: number;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function AdmissionsAndFooter({
  inquiryType,
  onInquiryTypeChange,
  focusTrigger,
}: AdmissionsAndFooterProps) {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [visitSlot, setVisitSlot] = useState(VISIT_SLOTS[0]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    inquiryType: string;
    visitSlot: string;
    trigger: number;
  } | null>(null);

  useEffect(() => {
    if (focusTrigger > 0) {
      const timer = setTimeout(() => {
        nameInputRef.current?.focus();
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [focusTrigger]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = 'Please enter a full name (at least 2 characters).';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      nextErrors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message = 'Please include a short note (at least 10 characters).';
    }
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmittedData({
      name: name.trim(),
      email: email.trim(),
      inquiryType,
      visitSlot,
      trigger: focusTrigger,
    });
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <>
      {/* 8. Admissions CTA Banner (Gold Background + Contact Form) */}
      <section
        id="admissions"
        className="py-20 sm:py-24 bg-[#F5B700] text-[#0B1F3A]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* CTA Copy */}
            <motion.div
              initial={{opacity: 0, y: 18}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.25}}
              transition={{duration: 0.5}}
              className="lg:col-span-6"
            >
              <p className="text-sm font-semibold text-[#0B1F3A]/80 mb-3">
                Admissions 2027–28
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1F3A] leading-tight mb-5"
                style={{textWrap: 'balance'}}
              >
                Begin Your Family&apos;s Journey at Sunrise
              </h2>
              <p className="text-base sm:text-lg text-[#0B1F3A]/85 leading-relaxed mb-8">
                Applications for Primary, Middle, and Senior Secondary cohorts are now open.
                Request an admissions prospectus or schedule a guided weekday campus walk with our
                academic counselors.
              </p>

              <div className="space-y-3 text-sm font-medium text-[#0B1F3A]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Guided campus tours every Tuesday &amp; Thursday morning</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Merit &amp; need-based scholarships across Grades 6–12</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Admissions responses within 1–2 business days</span>
                </div>
              </div>
            </motion.div>

            {/* Contact / Admissions Form Card */}
            <motion.div
              initial={{opacity: 0, y: 18}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.25}}
              transition={{duration: 0.5, delay: 0.08}}
              className="lg:col-span-6"
            >
              <div className="rounded-2xl bg-white dark:bg-[#0F2747] text-[#0B1F3A] dark:text-white p-6 sm:p-8 shadow-xl border border-[#0B1F3A]/10 dark:border-white/10">
                {submittedData && submittedData.trigger === focusTrigger ? (
                  <div className="py-8 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-2">
                      Inquiry Received
                    </h3>
                    <p className="text-sm text-[#374151] dark:text-[#CBD5E1] max-w-md mx-auto mb-6 leading-relaxed">
                      Thank you, <span className="font-semibold text-[#0B1F3A] dark:text-white">{submittedData.name}</span>.
                      Our Admissions Office has logged your{' '}
                      <span className="font-semibold text-[#0B1F3A] dark:text-[#F5B700]">
                        {submittedData.inquiryType}
                      </span>{' '}
                      request (Preferred slot:{' '}
                      <span className="font-semibold text-[#0B1F3A] dark:text-white">
                        {submittedData.visitSlot}
                      </span>
                      ) and will reach out to{' '}
                      <span className="underline">{submittedData.email}</span> within 2 business days.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmittedData(null)}
                      className="px-5 py-2.5 text-sm font-semibold text-[#0B1F3A] bg-[#F5B700] hover:bg-[#e2a900] rounded-lg transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-1">
                      Admissions &amp; Visit Inquiry
                    </h3>
                    <p className="text-xs sm:text-sm text-[#374151] dark:text-[#CBD5E1] mb-4">
                      Complete the form below and our admissions coordinator will follow up directly.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="admissions-name"
                          className="block text-xs font-semibold text-[#0B1F3A] dark:text-white mb-1.5"
                        >
                          Parent / Student Name
                        </label>
                        <input
                          ref={nameInputRef}
                          id="admissions-name"
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors((p) => ({...p, name: undefined}));
                          }}
                          placeholder="Elena Vance"
                          aria-invalid={Boolean(errors.name)}
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F4F6FA] dark:bg-[#07142A] border border-[#0B1F3A]/15 dark:border-white/15 text-[#0B1F3A] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F5B700]"
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-rose-700 dark:text-rose-400 font-medium">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="admissions-phone"
                          className="block text-xs font-semibold text-[#0B1F3A] dark:text-white mb-1.5"
                        >
                          Phone Number
                        </label>
                        <input
                          id="admissions-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors((p) => ({...p, phone: undefined}));
                          }}
                          placeholder="(555) 234-8910"
                          aria-invalid={Boolean(errors.phone)}
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F4F6FA] dark:bg-[#07142A] border border-[#0B1F3A]/15 dark:border-white/15 text-[#0B1F3A] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F5B700]"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs text-rose-700 dark:text-rose-400 font-medium">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="admissions-email"
                          className="block text-xs font-semibold text-[#0B1F3A] dark:text-white mb-1.5"
                        >
                          Email Address
                        </label>
                        <input
                          id="admissions-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors((p) => ({...p, email: undefined}));
                          }}
                          placeholder="family@example.com"
                          aria-invalid={Boolean(errors.email)}
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F4F6FA] dark:bg-[#07142A] border border-[#0B1F3A]/15 dark:border-white/15 text-[#0B1F3A] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F5B700]"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-rose-700 dark:text-rose-400 font-medium">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="admissions-type"
                          className="block text-xs font-semibold text-[#0B1F3A] dark:text-white mb-1.5"
                        >
                          Inquiry Type
                        </label>
                        <select
                          id="admissions-type"
                          value={inquiryType}
                          onChange={(e) => onInquiryTypeChange(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F4F6FA] dark:bg-[#07142A] border border-[#0B1F3A]/15 dark:border-white/15 text-[#0B1F3A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F5B700]"
                        >
                          <option value="Admissions Application">Admissions Application</option>
                          <option value="Book a Campus Visit">Book a Campus Visit</option>
                          <option value="Primary">Primary Program (Grades 1–5)</option>
                          <option value="Middle">Middle Program (Grades 6–8)</option>
                          <option value="Senior Secondary">Senior Secondary (Grades 9–12)</option>
                          <option value="Sports & Arts">Sports &amp; Arts</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <span className="block text-xs font-semibold text-[#0B1F3A] dark:text-white mb-2">
                        Preferred Campus Tour Slot
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {VISIT_SLOTS.map((slot) => {
                          const selected = visitSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setVisitSlot(slot)}
                              className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors cursor-pointer ${
                                selected
                                  ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] dark:bg-[#F5B700] dark:text-[#0B1F3A] dark:border-[#F5B700] font-semibold'
                                  : 'bg-[#F4F6FA] dark:bg-[#07142A] text-[#374151] dark:text-[#CBD5E1] border-[#0B1F3A]/15 dark:border-white/15 hover:border-[#F5B700]'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="admissions-message"
                        className="block text-xs font-semibold text-[#0B1F3A] dark:text-white mb-1.5"
                      >
                        Message &amp; Grade Level
                      </label>
                      <textarea
                        id="admissions-message"
                        rows={3}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (errors.message) setErrors((p) => ({...p, message: undefined}));
                        }}
                        placeholder="Share prospective student grade level, preferred tour date, or questions..."
                        aria-invalid={Boolean(errors.message)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F4F6FA] dark:bg-[#07142A] border border-[#0B1F3A]/15 dark:border-white/15 text-[#0B1F3A] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F5B700] resize-none"
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-rose-700 dark:text-rose-400 font-medium">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-6 text-sm sm:text-base font-semibold text-[#0B1F3A] bg-[#F5B700] hover:bg-[#e2a900] rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A]"
                    >
                      Submit Inquiry
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer
        id="contact"
        className="bg-[#0B1F3A] dark:bg-[#07142A] text-[#CBD5E1] border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* School Brand & Summary */}
            <div className="md:col-span-5">
              <a
                href="#top"
                className="text-xl font-bold tracking-tight text-white inline-block mb-3"
              >
                Sunrise Public School
              </a>
              <p className="text-sm text-[#CBD5E1] leading-relaxed max-w-sm mb-6">
                An accredited K–12 co-educational institution dedicated to intellectual curiosity,
                community service, and balanced student growth since 2001.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sunrise Public School on Facebook"
                  className="w-10 h-10 inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-[#F5B700] hover:text-[#0B1F3A] text-white transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sunrise Public School on Instagram"
                  className="w-10 h-10 inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-[#F5B700] hover:text-[#0B1F3A] text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sunrise Public School on LinkedIn"
                  className="w-10 h-10 inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-[#F5B700] hover:text-[#0B1F3A] text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sunrise Public School on YouTube"
                  className="w-10 h-10 inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-[#F5B700] hover:text-[#0B1F3A] text-white transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="md:col-span-3">
              <h3 className="text-sm font-semibold text-white mb-4">
                Explore
              </h3>
              <ul className="space-y-2.5 text-sm">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-slate-300 hover:text-[#F5B700] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details */}
            <div className="md:col-span-4">
              <h3 className="text-sm font-semibold text-white mb-4">
                Campus Contact
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#F5B700] shrink-0 mt-1" />
                  <span>
                    420 Horizon Boulevard, Academic District, Springfield 62704
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#F5B700] shrink-0" />
                  <a
                    href="tel:+15552348910"
                    className="hover:text-[#F5B700] transition-colors tabular-nums"
                  >
                    +1 (555) 234-8910
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#F5B700] shrink-0" />
                  <a
                    href="mailto:admissions@sunrisepublic.edu"
                    className="hover:text-[#F5B700] transition-colors"
                  >
                    admissions@sunrisepublic.edu
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              &copy; {new Date().getFullYear()} Sunrise Public School (Demo Portal). All rights reserved.
            </p>
            <p>Monday – Friday · 7:45 AM – 4:30 PM</p>
          </div>
        </div>
      </footer>
    </>
  );
}
