'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shield,
  Target,
  Compass,
  Award,
  Users,
  Briefcase,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';

export default function AboutPage() {
  const coreValues = [
    {
      title: 'Integrity First',
      description: 'We prioritize honest matching. If a loan option is unfavorable or holds hidden traps, we call it out explicitly.',
      icon: Shield,
    },
    {
      title: 'Customer Success',
      description: 'Every client profile is evaluated for eligibility checks to secure high sanction success rates.',
      icon: Target,
    },
    {
      title: 'Full Transparency',
      description: 'Zero hidden agent cuts, zero front fees. Everything is clearly mapped from initial discussion to final disbursal.',
      icon: Compass,
    },
  ];

  const trustFactors = [
    'Supervised directly by Ravi Godghate, ensuring financial-institution grade files formatting.',
    'Access to a wide lending network of 15+ top private, public, and NBFC banks.',
    'End-to-end documentation handling, saving you multiple runs to bank branches.',
    'Experience spanning personal loans, home loans, LAP, and business funding.',
    'Customized interest rate negotiations matching stable income profiles.',
  ];

  return (
    <div className="bg-white min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        
        {/* Company Introduction Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">About Imperial Financial</span>
            <h1 className="text-4xl md:text-5xl font-bold text-deep tracking-tight font-heading leading-tight">
              Your Trusted Partner In Secure Financing
            </h1>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Imperial Financial is a premier Loan Consultancy & Financial Services firm dedicated to helping individuals and business owners secure the right financing. Under the veteran leadership of <strong>Ravi Godghate</strong>, we offer highly professional advisory services across Maharashtra.
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              We bridge the gap between borrowers and major Indian banks. Our expertise lies in analyzing underwriting frameworks, restructuring credit profiles, and presenting loan files so they secure rapid approvals and minimal queries.
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-gold" />
                <span className="text-sm font-bold text-deep">Established Advisory</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gold" />
                <span className="text-sm font-bold text-deep">500+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-gold" />
                <span className="text-sm font-bold text-deep">15+ Integrated Banks</span>
              </div>
            </div>
          </div>

          {/* Graphical Presentation card */}
          <div className="lg:col-span-5 bg-slatebg border border-slate-200 p-8 rounded-premium shadow-sm flex flex-col gap-6 relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
            
            <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-2 shadow-sm w-16 h-16">
              <Image
                src="/logo.jpeg"
                alt="Imperial Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-bold text-deep">Imperial Financial Presentation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Registered financial consultancy firm handling client portfolios from small unsecured tickets to large-ticket industrial property loans.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-5 flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                <span>Principal Advisor:</span>
                <span className="text-deep font-bold">Ravi Godghate</span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                <span>Coverage Area:</span>
                <span className="text-deep font-bold">Maharashtra, India</span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                <span>Core Focus:</span>
                <span className="text-deep font-bold">High Approval Matching</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="bg-slatebg border border-slate-200/60 p-8 md:p-12 rounded-premium grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          {/* Mission */}
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-sm">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-deep">Our Mission</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              To empower individuals and companies by securing transparent, optimized, and low-cost financing options. We eliminate banking delays through structured profile matching, ensuring every client walks away with positive financial outcomes.
            </p>
          </div>

          {/* Vision */}
          <div className="flex flex-col gap-4 border-t md:border-t-0 md:border-l border-slate-200/80 pt-8 md:pt-0 md:pl-10">
            <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold-dark flex items-center justify-center shadow-sm">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-deep">Our Vision</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              To become Maharashtra’s leading independent loan consultancy, recognized for absolute integrity, banker-grade profile validation, and high client success rates. We aim to redefine the loan advisory experience to feel premium and straightforward.
            </p>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="flex flex-col gap-12">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">Our Foundation</span>
            <h2 className="text-3xl font-bold text-deep tracking-tight font-heading">
              Core Principles We Live By
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <div key={i} className="bg-white border border-slate-200 p-6 md:p-8 rounded-premium flex flex-col gap-4 hover:shadow-premium transition">
                  <div className="w-10 h-10 rounded-lg bg-deep-light/40 text-deep flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5 text-deep" />
                  </div>
                  <h3 className="text-deep font-bold text-lg">{value.title}</h3>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Leadership Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left py-4">
          <div className="lg:col-span-4 relative overflow-hidden rounded-premium border border-slate-200 bg-white p-3 shadow-sm max-w-sm mx-auto lg:mx-0 w-full">
            <div className="aspect-[3/4] relative w-full overflow-hidden rounded-xl bg-slate-100">
              <Image
                src="/ravi-godghate-full.jpg"
                alt="Ravi Godghate - Founder & Director"
                fill
                className="object-cover object-top"
                sizes="(max-w-720px) 100vw, 33vw"
              />
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-5 text-left">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">Leadership</span>
            <h2 className="text-3xl font-bold text-deep tracking-tight font-heading">
              Meet Our Founder & Director
            </h2>
            <div className="h-1 w-20 bg-gold rounded-full" />
            <p className="text-slate-650 text-sm md:text-base leading-relaxed">
              With over <strong>22 years of financial advisory experience</strong>, Ravi Godghate has helped hundreds of individuals, professionals, and corporate entities secure optimal financing. His deep understanding of bank credit policies and personal commitment to client success form the cornerstone of Imperial Financial.
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-slate-500 text-xs md:text-sm my-2 font-medium">
              &ldquo;At Imperial Financial, we believe that nobody is alone with a loan. We treat every client file as a personal project, ensuring it is structured correctly for credit success before it ever reaches a bank underwriting desk.&rdquo;
            </blockquote>
            <div>
              <h4 className="text-deep font-bold text-base">Ravi Godghate</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Founder & Lead consultant, Imperial Financial</p>
            </div>
          </div>
        </section>

        {/* Why Customers Trust Us Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 flex flex-col gap-5 text-left bg-deep text-white p-8 md:p-10 rounded-premium shadow-md relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <h3 className="text-2xl font-bold font-heading text-white">The Consultancy Distinction</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Applying for loans directly or via algorithmic aggregation sites often ends in rejection due to simple underwriting flags.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              At Imperial Financial, we examine bank internal guidelines beforehand. We fix critical files metrics so your application satisfies credit managers on its very first run.
            </p>
            <div className="border-t border-white/10 pt-4 mt-2">
              <span className="text-gold font-bold text-xs uppercase tracking-wider block">Lead Advisor Assurance</span>
              <span className="text-xs text-white/95 mt-1 font-semibold block">Ravi Godghate — +91 9890212456</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">Why Trust Imperial</span>
            <h2 className="text-3xl font-bold text-deep tracking-tight">
              Established Advisory & High Sanction Success
            </h2>
            <div className="flex flex-col gap-4 mt-2">
              {trustFactors.map((factor, i) => (
                <div key={i} className="flex items-start gap-3 text-slate-650 text-sm font-semibold leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{factor}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-sm px-6 py-3 rounded-premium shadow-premium transition"
              >
                <PhoneCall className="w-4 h-4 fill-white" /> Apply for Consultancy
              </Link>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}
