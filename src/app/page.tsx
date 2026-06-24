"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useSpring, Variants } from 'framer-motion';

import {
  ChevronDown,
  CheckCircle2,
  TrendingUp,
  Award,
  Users,
  Building,
  ShieldCheck,
  ArrowRight,
  Clock,
  ThumbsUp,
  ChevronRight,
  Phone,
  BookmarkCheck,
  FileCheck2,
  BadgePercent,
  CheckCircle,
} from 'lucide-react';
import LeadForm from '@/components/LeadForm';

// Viewport-triggered count-up animation component
interface CountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}

function CountUp({ end, duration = 2000, decimals = 0, suffix = '' }: CountUpProps) {
  const [count, setCount] = useState(0);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!element) return;

    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !started) {
          started = true;
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(progress * end);
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [element, end, duration]);

  const formatted = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString('en-IN');

  return (
    <span ref={setElement} className="font-extrabold tracking-tight">
      {formatted}{suffix}
    </span>
  );
}

// Bank SVGs from public/lending-partners folder
const PARTNER_LOGOS = [
  { name: 'Axis Bank', path: '/lending-partners/Axis Bank.svg' },
  { name: 'Bank of Baroda', path: '/lending-partners/Bank of Baroda.svg' },
  { name: 'Bank of Maharashtra', path: '/lending-partners/Bank of maharashtra.svg' },
  { name: 'Canara Bank', path: '/lending-partners/Canara Bank.svg' },
  { name: 'IDBI', path: '/lending-partners/IDBI.svg' },
  { name: 'Indian Bank', path: '/lending-partners/Indian Bank.svg' },
  { name: 'IndusInd Bank', path: '/lending-partners/Induslnd Bank.svg' },
  { name: 'PNB', path: '/lending-partners/PNB.svg' },
  { name: 'RBL Bank', path: '/lending-partners/RBL Bank.svg' },
  { name: 'SBI Bank', path: '/lending-partners/SBI Bank.svg' },
  { name: 'Bank of India', path: '/lending-partners/bkid.svg' },
  { name: 'Central Bank of India', path: '/lending-partners/cbin.svg' },
  { name: 'Federal Bank', path: '/lending-partners/federalBank.svg' },
  { name: 'HDFC', path: '/lending-partners/hdfc.svg' },
  { name: 'ICICI Bank', path: '/lending-partners/icici.svg' },
  { name: 'IDFC First Bank', path: '/lending-partners/idfc.svg' },
  { name: 'Kotak Bank', path: '/lending-partners/kotak bank .svg' },
  { name: 'Union Bank of India', path: '/lending-partners/union bank.svg' },
  { name: 'Yes Bank', path: '/lending-partners/yes bank.svg' },
];

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.45, 0.32, 0.9] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    }
  }
};

const HERO_IMAGES = [
  '/hero/home-loan.jpg',
  '/hero/consultation.jpg',
  '/hero/family-home.jpg',
  '/hero/personal-loan.jpg',
  '/hero/business-growth.jpg',
];

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);



  // Timeline section tracking
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });
  const timelineProgressSpring = useSpring(timelineProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const storyMetrics = [
    { end: 22, decimals: 0, suffix: '+ Years', label: 'Financial Advisory Experience', icon: Award },
    { end: 1200, decimals: 0, suffix: '+ Loans', label: 'Successfully Facilitated', icon: TrendingUp },
    { end: 98.6, decimals: 1, suffix: '%', label: 'Direct Case Approval Rate', icon: ShieldCheck },
    { end: 15, decimals: 0, suffix: '+ Banks', label: 'Lending Partners Network', icon: Building },
  ];

  const loanCategories = [
    {
      title: 'Personal Loan',
      description: 'Salaried, Small & Large Ticket personal loans with rapid processing.',
      link: '/services#personal-loan',
    },
    {
      title: 'Home Loan',
      description: 'Specialized low-interest rates for home purchase & construction.',
      link: '/services#home-loan',
    },
    {
      title: 'Affordable Housing Loan',
      description: 'Government subsidies & affordable schemes to buy your dream home.',
      link: '/services#affordable-housing',
    },
    {
      title: 'Loan Against Property (LAP)',
      description: 'Unlock the value of your residential or commercial property.',
      link: '/services#lap',
    },
    {
      title: 'Business Loan',
      description: 'Flexible funding options for working capital, expansion, and equipment.',
      link: '/services#business-loan',
    },
    {
      title: 'Balance Transfer Assistance',
      description: 'Reduce monthly EMIs by moving high-interest loans to low-rate lenders.',
      link: '/services#balance-transfer',
    },
  ];

  const whyChooseUs = [
    {
      title: 'Advisor Grade Guidance',
      desc: 'Supervised directly by Ravi Godghate, who ensures you submit optimal profiles.',
      icon: Award,
    },
    {
      title: 'Rapid & Clear Processing',
      desc: 'Transparent tracking at every stage without hidden loops or conditions.',
      icon: Clock,
    },
    {
      title: 'Unbiased Multi-Bank Quotes',
      desc: 'We match your application against 15+ top banks for the absolute lowest interest rate.',
      icon: ThumbsUp,
    },
    {
      title: 'Complete Document Handling',
      desc: 'End-to-end assistance from initial paperwork collection to final disbursal.',
      icon: BookmarkCheck,
    },
  ];

  const processTimeline = [
    {
      step: '01',
      title: 'Discuss Requirement',
      desc: 'Consult directly with Ravi Godghate to establish your loan parameters, eligibility bounds, and cash flow constraints.',
      icon: Users,
    },
    {
      step: '02',
      title: 'Compare Loan Options',
      desc: 'We match your profile against 15+ top-tier lenders to structure competitive terms, minimizing interest outlays.',
      icon: BadgePercent,
    },
    {
      step: '03',
      title: 'Documentation',
      desc: 'Complete, secure compilation of required files, pre-vetted for credit underwriting criteria to eliminate errors.',
      icon: FileCheck2,
    },
    {
      step: '04',
      title: 'Approval',
      desc: 'Direct file presentation to credit decision-makers, leading to rapid sanction cycles with minimal backend queries.',
      icon: CheckCircle,
    },
    {
      step: '05',
      title: 'Disbursement',
      desc: 'Sanction letter signing, agreement finalization, and direct fund disbursal to your account with zero hidden fees.',
      icon: TrendingUp,
    },
  ];

  const testimonials = [
    {
      quote: 'Imperial Financial helped me secure my home loan in less than 10 days. Ravi Godghate personally guided me through the complex banking documentation. Exceptional service!',
      name: 'Aniket Deshmukh',
      role: 'IT Professional (Pune)',
    },
    {
      quote: 'Securing capital for my retail business was a constant struggle until I approached Imperial. They restructured our application and got a business loan approved at a premium rate.',
      name: 'Rajesh Shah',
      role: 'Business Owner (Mumbai)',
    },
    {
      quote: 'Outstanding assistance with loan balance transfer. They helped me shift my LAP to another bank, saving me over 1.5% in interest and drastically reducing my monthly EMIs.',
      name: 'Sunita Sharma',
      role: 'Government Employee',
    },
  ];

  const faqs = [
    {
      q: 'What is the eligibility criteria for a Salaried Personal Loan?',
      a: 'Typically, you must be between 21-60 years of age, employed with a registered company, and earn a minimum monthly income of ₹25,000. A CIBIL score of 750+ is highly recommended for premium rates.',
    },
    {
      q: 'How does Balance Transfer Assistance save me money?',
      a: 'We evaluate your current high-interest loan and match it with banks offering lower interest rates. By transferring the outstanding balance, you reduce your EMI load and save significantly on total interest payable.',
    },
    {
      q: 'Do you charge upfront service fees for loan evaluation?',
      a: 'We charge zero upfront charges for checking your eligibility or advising you. Our advisory consultancy is focused on matching you with the right banking partner.',
    },
    {
      q: 'What assets can be used as security for a Loan Against Property (LAP)?',
      a: 'You can pledge residential, commercial, or pre-approved industrial real estate assets. The property must have clean legal titles and approved building layouts.',
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-deep-light/45 via-white to-white py-16 md:py-24 px-4 md:px-8 border-b border-slate-100 overflow-hidden">
        {/* Background Slideshow Container */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 select-none pointer-events-none">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{ duration: 7.5, ease: "linear" }}
                className="relative w-full h-full"
              >
                <Image
                  src={HERO_IMAGES[heroIndex]}
                  alt="Imperial Financial Background"
                  fill
                  priority={heroIndex === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Premium Dark Navy Overlay (45% - 60% opacity) */}
          <div className="absolute inset-0 bg-[#06265B]/45" />

          {/* Radial Light Wash Overlay specifically on the left side to guarantee readability of the dark text */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.6)_50%,rgba(255,255,255,0)_100%)]" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero text content */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
            className="lg:col-span-7 flex flex-col gap-6 text-left"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider w-fit">
              <Award className="w-4 h-4 text-gold" />
              Ravi Godghate Consultancy
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-deep leading-tight font-heading">
              Nobody&apos;s Alone <br />
              <span className="text-primary">with A Loan.</span>
            </h1>
            
            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl">
              Helping individuals and businesses secure the right financing with expert guidance, fast processing, and trusted financial solutions.
            </p>

            {/* Advisor Info Badge */}
            <div className="flex flex-wrap items-center gap-4 bg-white border border-slate-200/80 p-3 md:p-4 rounded-premium max-w-lg shadow-sm">
              <div className="w-10 h-10 rounded-full relative overflow-hidden shrink-0 border border-gold shadow-sm">
                <Image
                  src="/ravi-godghate.jpg"
                  alt="Ravi Godghate"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Lead Advisor</span>
                <span className="text-sm font-bold text-deep">Ravi Godghate</span>
              </div>
              <div className="ml-auto flex flex-col items-end border-l border-slate-200 pl-4">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Direct Support</span>
                <a href="tel:+919890212456" className="text-sm font-bold text-primary hover:underline">
                  +91 9890212456
                </a>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <Link
                href="#apply"
                className="bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-8 py-3.5 rounded-premium shadow-premium hover:shadow-premium-hover transition duration-300 flex items-center gap-2"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="bg-white hover:bg-slate-50 text-deep border border-slate-200 hover:border-slate-300 font-semibold text-sm px-8 py-3.5 rounded-premium transition duration-300 flex items-center gap-2 shadow-sm"
              >
                Talk To An Expert
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 mt-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                Trusted Bank Partners
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                No Upfront Hidden Fees
              </span>
            </div>
          </motion.div>

          {/* Hero Form section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.45, 0.32, 0.9] }}
            className="lg:col-span-5" 
            id="apply"
          >
            <LeadForm defaultLoanType="Financial Consultation" />
          </motion.div>
        </div>
      </section>

      {/* 2. STORY IN NUMBERS SECTION */}
      <section className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-slatebg to-white border-y border-slate-100 overflow-hidden">
        {/* Decorative background grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col gap-12">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUpVariants}
            className="max-w-2xl mx-auto flex flex-col gap-3"
          >
            <span className="text-primary font-bold text-xs uppercase tracking-widest">Imperial by the Numbers</span>
            <h2 className="text-3xl md:text-4xl font-bold text-deep tracking-tight font-heading">
              Our Story in Numbers
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              Scale and credibility built over years of trusted client relationships and strategic banking integration.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {storyMetrics.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUpVariants}
                  className="glass-card hover-gold-glow rounded-premium p-8 flex flex-col items-center justify-center text-center gap-4 transition duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl md:text-4xl font-extrabold text-deep tracking-tight leading-none">
                      <CountUp end={metric.end} decimals={metric.decimals} suffix={metric.suffix} />
                    </span>
                    <span className="text-xs md:text-sm font-semibold text-slate-505 tracking-wide mt-2 block">
                      {metric.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. LOAN CATEGORIES */}
      <section className="py-20 px-4 md:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Header */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUpVariants}
            className="text-center max-w-2xl mx-auto flex flex-col gap-3"
          >
            <span className="text-primary font-bold text-xs uppercase tracking-widest">Financing Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-deep tracking-tight font-heading">
              Our Professional Loan Offerings
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              We guide you through the ideal banking options tailored for your profile to secure rapid sanction and disbursal.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {loanCategories.map((loan, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUpVariants}
                className="glass-card hover-gold-glow rounded-premium p-6 md:p-8 flex flex-col justify-between hover:shadow-premium-hover transition-all duration-300 group hover:-translate-y-1 transform"
              >
                <div className="flex flex-col gap-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-slatebg border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition duration-300 shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-deep font-bold text-lg md:text-xl group-hover:text-primary transition duration-300">
                    {loan.title}
                  </h3>
                  <p className="text-slate-655 text-sm leading-relaxed font-medium">
                    {loan.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-primary group-hover:text-deep transition duration-300">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-bold text-sm hover:underline"
            >
              Explore Complete Services Directory
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE IMPERIAL FINANCIAL */}
      <section className="py-20 px-4 md:px-8 bg-slatebg border-y border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUpVariants}
            className="lg:col-span-5 flex flex-col gap-6 text-left"
          >
            <span className="text-primary font-bold text-xs uppercase tracking-widest">Why Imperial Financial</span>
            <h2 className="text-3xl md:text-4xl font-bold text-deep tracking-tight font-heading leading-tight">
              A Premium Advisory Firm For Your Loans
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Unlike ordinary web platforms, we don’t just forward your application. We optimize your financial portfolio, identify underwriting loopholes, and present your file directly to decision-makers.
            </p>
            <div className="glass-card p-5 rounded-premium flex flex-col gap-2.5 shadow-sm">
              <div className="text-xs font-bold text-gold uppercase tracking-wider">Direct Trust Factor</div>
              <p className="text-slate-600 text-xs italic font-medium">
                &ldquo;Every loan application is structured and reviewed for quality metrics prior to bank submission. We maintain a near-perfect success rate.&rdquo;
              </p>
              <span className="text-xs font-bold text-deep mt-1">— Ravi Godghate, Lead Consultant</span>
            </div>
          </motion.div>

          {/* Cards grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={idx} 
                  variants={fadeInUpVariants}
                  className="glass-card hover-gold-glow rounded-premium p-6 flex flex-col gap-4 shadow-sm hover:shadow-premium transition text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-deep-light/30 text-deep flex items-center justify-center">
                    <Icon className="w-5 h-5 text-deep" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-deep font-bold text-md">{item.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-semibold">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* 5. LOAN PROCESS TIMELINE */}
      <section ref={timelineRef} className="py-24 px-4 md:px-8 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          {/* Header */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUpVariants}
            className="text-center max-w-2xl mx-auto flex flex-col gap-3"
          >
            <span className="text-primary font-bold text-xs uppercase tracking-widest">Your Financing Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold text-deep tracking-tight font-heading">
              The Path to Fast Loan Approval
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              We eliminate banking friction and query loops through a structured, 5-step advisory roadmap.
            </p>
          </motion.div>

          {/* Timeline Process Flow */}
          <div className="relative px-4">
            {/* Center connector line background for desktop */}
            <div className="hidden lg:block absolute left-10 right-10 top-[24px] h-[3px] bg-slate-100 z-0" />
            {/* Center connector line background for mobile */}
            <div className="lg:hidden absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-[3px] bg-slate-100 z-0" />

            {/* Active filled connector line for desktop */}
            <motion.div
              style={{ scaleX: timelineProgressSpring, originX: 0 }}
              className="hidden lg:block absolute left-10 right-10 top-[24px] h-[3px] bg-gradient-to-r from-primary via-gold to-primary z-0 pointer-events-none"
            />
            {/* Active filled connector line for mobile */}
            <motion.div
              style={{ scaleY: timelineProgressSpring, originY: 0 }}
              className="lg:hidden absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-[3px] bg-gradient-to-b from-primary via-gold to-primary z-0 pointer-events-none"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
              {processTimeline.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center lg:items-start text-center lg:text-left group relative"
                  >
                    {/* Glowing step bubble with scroll entering highlighting */}
                    <motion.div
                      variants={{
                        inactive: { scale: 1, backgroundColor: "#0b3e91", borderColor: "rgba(212, 175, 55, 0.4)", color: "#ffffff" },
                        active: { 
                          scale: 1.15, 
                          backgroundColor: "#0056D6", 
                          borderColor: "rgba(212, 175, 55, 1)", 
                          color: "#ffffff",
                          boxShadow: "0 0 15px rgba(212, 175, 55, 0.6)" 
                        }
                      }}
                      initial="inactive"
                      whileInView="active"
                      viewport={{ once: false, amount: 0.6 }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm shadow-premium z-10 mb-6 font-mono shrink-0 cursor-pointer"
                    >
                      {item.step}
                    </motion.div>

                    {/* Content Card with scroll entering highlighting */}
                    <motion.div
                      variants={{
                        inactive: { y: 0, opacity: 0.9, borderColor: "rgba(226, 232, 240, 0.75)" },
                        active: { 
                          y: -6, 
                          opacity: 1, 
                          borderColor: "rgba(212, 175, 55, 0.45)",
                          boxShadow: "0 12px 30px 0 rgba(11, 62, 145, 0.06), 0 8px 12px 0 rgba(212, 175, 55, 0.03)" 
                        }
                      }}
                      initial="inactive"
                      whileInView="active"
                      viewport={{ once: false, amount: 0.4 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="glass-card rounded-premium p-6 flex flex-col gap-3 shadow-sm transition-all duration-300 w-full h-full text-left"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <h3 className="text-deep font-bold text-[14px] tracking-tight">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                        {item.desc}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED SERVICES */}
      <section className="py-20 px-4 md:px-8 bg-slatebg border-y border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUpVariants}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div className="flex flex-col gap-3 text-left">
              <span className="text-primary font-bold text-xs uppercase tracking-widest">Featured Offerings</span>
              <h2 className="text-3xl md:text-4xl font-bold text-deep tracking-tight font-heading">
                Specialized Loan Packages
              </h2>
            </div>
            <Link
              href="/services"
              className="bg-primary hover:bg-primary-dark text-white font-semibold text-xs px-6 py-3 rounded-premium shadow-premium transition flex items-center gap-1.5 w-fit"
            >
              Compare All Loan Options
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Featured 1 */}
            <motion.div 
              variants={fadeInUpVariants}
              className="bg-white border border-slate-200 rounded-premium p-8 flex flex-col justify-between hover:shadow-premium transition"
            >
              <div className="flex flex-col gap-5 text-left">
                <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider bg-gold-light/40 px-3 py-1 rounded-full w-fit">
                  ★ Popular Advisory Choice
                </div>
                <h3 className="text-2xl font-bold text-deep">Salaried Personal Loan</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Tailored for corporate employees, public sector workers, and software professionals. Benefit from fast validation, zero physical visit loops, and interest rates starting under standard market margins.
                </p>
                <ul className="flex flex-col gap-2.5 text-xs text-slate-500 font-semibold mt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Tenure ranging from 12 to 60 months
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Digital documentation matching standard policies
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Quick approval within 24-48 business hours
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Advisor Support: <strong>Active</strong></span>
                <Link
                  href="/services#personal-loan"
                  className="text-primary font-bold text-xs flex items-center gap-1"
                >
                  Learn Eligibility criteria
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Featured 2 */}
            <motion.div 
              variants={fadeInUpVariants}
              className="glass-card hover-gold-glow rounded-premium p-8 flex flex-col justify-between hover:shadow-premium transition"
            >
              <div className="flex flex-col gap-5 text-left">
                <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider bg-primary-light/50 px-3 py-1 rounded-full w-fit">
                  🏢 Commercial / Residential Funding
                </div>
                <h3 className="text-2xl font-bold text-deep">Loan Against Property (LAP)</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Unlock cash liquidity using your industrial, commercial, or residential properties. Secure large sanction limits for business expansion, sibling education, or debt consolidation at low interest rates.
                </p>
                <ul className="flex flex-col gap-2.5 text-xs text-slate-500 font-semibold mt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> High LTV (Loan-To-Value) ratios up to 70%
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Support for self-employed & professional profiles
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> High-tenure options (up to 15 years)
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Advisor Support: <strong>Active</strong></span>
                <Link
                  href="/services#lap"
                  className="text-primary font-bold text-xs flex items-center gap-1"
                >
                  Learn Eligibility criteria
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 7. PARTNER BANKS & FINANCIAL INSTITUTIONS (SCROLLING MARQUEE) */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-slatebg border-y border-slate-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUpVariants}
            className="text-center flex flex-col gap-2"
          >
            <span className="text-primary font-bold text-xs uppercase tracking-widest">Extensive Banking Network</span>
            <h2 className="text-2xl md:text-3xl font-bold text-deep tracking-tight font-heading">
              Our Lending Partners
            </h2>
            <p className="text-slate-550 text-xs md:text-sm font-semibold">
              We compare rates and present files matching specific underwriting policies for fast sanctions.
            </p>
          </motion.div>

          <div className="relative w-full overflow-hidden py-4">
            {/* Fade overlays at borders for a slick transition */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slatebg to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slatebg to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee gap-8 items-center">
              {/* Original logos */}
              {PARTNER_LOGOS.map((logo, idx) => (
                <div
                  key={`bank-1-${idx}`}
                  className="bg-white border border-slate-200/60 px-6 py-3.5 rounded-premium flex items-center justify-center min-w-[170px] h-[58px] shadow-sm hover:scale-[1.03] transition duration-300 cursor-pointer"
                >
                  <Image
                    src={logo.path}
                    alt={`${logo.name} Logo`}
                    width={120}
                    height={32}
                    className="h-6 w-auto object-contain max-w-[120px] pointer-events-none"
                  />
                </div>
              ))}
              {/* Duplicate logos to allow seamless loop */}
              {PARTNER_LOGOS.map((logo, idx) => (
                <div
                  key={`bank-2-${idx}`}
                  className="bg-white border border-slate-200/60 px-6 py-3.5 rounded-premium flex items-center justify-center min-w-[170px] h-[58px] shadow-sm hover:scale-[1.03] transition duration-300 cursor-pointer"
                >
                  <Image
                    src={logo.path}
                    alt={`${logo.name} Logo`}
                    width={120}
                    height={32}
                    className="h-6 w-auto object-contain max-w-[120px] pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-slate-450 text-xs font-semibold">
            We submit files matching specific partner criteria to secure rapid underwriting and minimal queries.
          </p>
        </div>
      </section>

      {/* 8. CUSTOMER TESTIMONIALS */}
      <section className="py-20 px-4 md:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUpVariants}
            className="text-center max-w-2xl mx-auto flex flex-col gap-3"
          >
            <span className="text-primary font-bold text-xs uppercase tracking-widest">Client Reviews</span>
            <h2 className="text-3xl md:text-4xl font-bold text-deep tracking-tight font-heading">
              What Our Customers Say
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUpVariants}
                className="glass-card hover-gold-glow p-8 rounded-premium flex flex-col justify-between shadow-sm relative group hover:shadow-premium transition duration-300"
              >
                <p className="text-slate-600 text-sm leading-relaxed italic mb-6 font-medium">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                    {item.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-deep">{item.name}</span>
                    <span className="text-[11px] text-slate-500 font-semibold">{item.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 px-4 md:px-8 bg-slatebg border-y border-slate-100">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUpVariants}
            className="text-center flex flex-col gap-3"
          >
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-sans">Common Queries</span>
            <h2 className="text-3xl md:text-4xl font-bold text-deep tracking-tight font-heading">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-col gap-4"
          >
            {faqs.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUpVariants}
                  className="glass-card rounded-premium overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full text-left bg-transparent hover:bg-slate-50/50 px-6 py-5 flex justify-between items-center gap-4 transition"
                  >
                    <span className="font-bold text-deep text-sm md:text-base leading-tight">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="bg-slatebg/80 border-t border-slate-100 px-6 py-4.5 text-slate-655 text-sm leading-relaxed text-left animate-in fade-in slide-in-from-top-1 font-medium">
                      {faq.a}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* 10. LEAD GENERATION FORM & CONTACT SECTION */}
      <section className="py-20 px-4 md:px-8 bg-slatebg relative" id="contact-adviser">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Detail card */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUpVariants}
            className="lg:col-span-6 flex flex-col gap-8 text-left"
          >
            <div className="flex flex-col gap-3">
              <span className="text-primary font-bold text-xs uppercase tracking-widest">Connect With Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-deep tracking-tight font-heading leading-tight">
                Secure Premium Loan Rates Today
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                Contact Ravi Godghate directly to evaluate eligibility and begin matching your files against the best lending options in India.
              </p>
            </div>

            <div className="flex flex-col gap-4 glass-card p-6 md:p-8 rounded-premium shadow-sm">
              <h3 className="text-deep font-bold text-md uppercase tracking-wider border-b border-slate-150 pb-2">Direct Contact Channels</h3>
              
              <div className="flex items-center gap-4 py-2 border-b border-slate-150 last:border-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-bold uppercase">Primary Hotline</span>
                  <a href="tel:+918408090022" className="text-md font-bold text-deep hover:text-primary transition">
                    +91 8408090022
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 py-2 border-b border-slate-150 last:border-0">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                  <Image src="/logo.jpeg" alt="Advisor Icon" width={24} height={24} className="rounded-full" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-bold uppercase">Alternate Contact / WhatsApp</span>
                  <a href="tel:+919890212456" className="text-md font-bold text-deep hover:text-primary transition">
                    +91 9890212456
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-500 font-semibold bg-white/50 border border-slate-200/60 p-3 rounded-lg w-fit shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>We never sell leads to third-party marketing networks. Direct consultancy only.</span>
            </div>
          </motion.div>

          {/* Form wrapper */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUpVariants}
            className="lg:col-span-6"
          >
            <LeadForm defaultLoanType="Salaried Personal Loan" formTitle="Initiate Quick Inquiry" />
          </motion.div>

        </div>
      </section>

    </div>
  );
}
