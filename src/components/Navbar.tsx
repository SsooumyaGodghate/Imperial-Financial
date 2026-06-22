'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, User, Award } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'EMI Calculator', href: '/emi-calculator' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll shadow and state effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Page Scroll Progress Indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Check if link is active
  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      {/* Thin Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-gold to-primary origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Top contact utility bar (collapses on scroll) */}
      <motion.div
        initial={{ height: 'auto', opacity: 1 }}
        animate={{ 
          height: scrolled ? 0 : 'auto', 
          opacity: scrolled ? 0 : 1,
          paddingTop: scrolled ? 0 : '4px',
          paddingBottom: scrolled ? 0 : '4px',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="bg-deep text-white text-xs px-4 md:px-8 flex flex-col md:flex-row justify-between items-center border-b border-white/10 gap-1.5 md:gap-0 font-medium overflow-hidden origin-top"
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 opacity-90">
            <User className="w-3.5 h-3.5 text-gold" />
            Contact Person: <strong className="text-white font-semibold">Ravi Godghate</strong>
          </span>
          <span className="hidden md:inline-block opacity-40">|</span>
          <span className="flex items-center gap-1.5 opacity-90">
            <Award className="w-3.5 h-3.5 text-gold" />
            Financial Services & Loan Consultancy
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+918408090022" className="flex items-center gap-1 hover:text-accent transition duration-200">
            <Phone className="w-3 h-3 text-gold" /> +91 8408090022
          </a>
          <span>/</span>
          <a href="tel:+919890212456" className="flex items-center gap-1 hover:text-accent transition duration-200">
            <Phone className="w-3 h-3 text-gold" /> +91 9890212456
          </a>
        </div>
      </motion.div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 px-4 md:px-8 border-b ${
          scrolled
            ? 'bg-white/70 backdrop-blur-lg border-white/20 shadow-premium py-1 lg:py-1.5'
            : 'bg-white/95 border-slate-100/50 py-3 lg:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-0.5 shadow-sm transition group-hover:border-primary/30">
              <Image
                src="/logo.jpeg"
                alt="Imperial Financial Logo"
                width={38}
                height={38}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-md font-bold tracking-tight text-deep leading-none">
                Imperial
              </span>
              <span className="text-[9px] font-semibold text-gold tracking-widest leading-none mt-0.5">
                Financial
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Link Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-[14px] font-semibold tracking-wide transition-colors duration-200 py-1.5 ${
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-slate-600 hover:text-primary'
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+918408090022"
              className="bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-6 py-2.5 rounded-premium shadow-premium transition duration-300 flex items-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <Phone className="w-4 h-4 fill-white" />
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-deep hover:text-primary p-1 rounded-md focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-premium-hover p-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-5 duration-200">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-[15px] font-semibold py-2 px-3 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'bg-primary/5 text-primary'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
              <div className="text-center text-xs text-slate-500 font-medium">
                Direct Contact with Ravi Godghate
              </div>
              <a
                href="tel:+918408090022"
                onClick={() => setIsOpen(false)}
                className="bg-primary text-white font-semibold text-center text-sm py-3 rounded-premium shadow-premium flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call +91 8408090022
              </a>
              <a
                href="tel:+919890212456"
                onClick={() => setIsOpen(false)}
                className="border border-slate-200 text-deep font-semibold text-center text-sm py-3 rounded-premium flex items-center justify-center gap-2 hover:bg-slate-50"
              >
                <Phone className="w-4 h-4" />
                Call +91 9890212456
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
