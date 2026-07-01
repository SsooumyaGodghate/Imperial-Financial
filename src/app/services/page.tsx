'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  FileText,
  UserCheck,
  TrendingUp,
  PhoneCall,
  Coins,
  ArrowRight,
} from 'lucide-react';
import LeadForm from '@/components/LeadForm';

const SERVICES = [
  {
    id: 'personal-loan',
    title: 'Personal Loan',
    subtitle: 'Salaried, Small Ticket & Large Ticket Loans',
    overview: 'Get instant, collateral-free funds tailored for salaried professionals. Whether it is an unexpected medical expense, family wedding, vacation, or credit card consolidation, our personal loan consultancy secures options with minimum hassle and maximum speed.',
    benefits: [
      'Collateral-free/no security required',
      'Tenures ranging from 12 to 60 months',
      'Flexible ticket sizes (small to large ticket)',
      'Highly competitive interest rates starting under standard margins',
      'Completely transparent digital documentation validation',
    ],
    eligibility: [
      'Must be a salaried employee or government servant',
      'Age bracket: 21 to 60 years',
      'Minimum monthly net salary: ₹25,000',
      'Stable employment of at least 1 year (with current employer 6+ months)',
      'Healthy CIBIL rating (750+ preferred)',
    ],
    documents: [
      'PAN Card & Aadhaar Card (KYC)',
      'Last 3 months salary slips',
      'Last 6 months bank statement showing salary credits',
      'Form 16 or Income Tax Returns (ITR) for the past 2 years',
      'Office ID card copy or official email verification',
    ],
  },
  {
    id: 'home-loan',
    title: 'Home Loan',
    subtitle: 'Purchase, Construction & Extension Funding',
    overview: 'Step into your dream home with low-interest home loans. We match your application across top banks in India to identify optimal interest rates, high Loan-to-Value (LTV) limits, and long-repayment schedules.',
    benefits: [
      'Super-low interest rates with floating or fixed choices',
      'High repayment tenures up to 30 years',
      'Seamless balance transfer opportunities if rates drop',
      'Zero pre-payment penalties on floating rate options',
      'Support for flat purchase, plot buy, and self-construction',
    ],
    eligibility: [
      'Salaried individuals, government workers, or self-employed businessmen',
      'Age bracket: 21 to 65 years',
      'Healthy debt-to-income ratio',
      'Property papers must have clean legal title records',
    ],
    documents: [
      'Identity & Address Proof (KYC docs)',
      'Income proof: 3 Salary slips / ITR for self-employed',
      '6 months detailed bank statements',
      'Property documents: Sale agreement, builder NOC, land receipts, and property blueprints',
    ],
  },
  {
    id: 'affordable-housing',
    title: 'Affordable Housing Loan',
    subtitle: 'Low-Budget & Government Scheme Assistance',
    overview: 'Designed specifically for low and middle-income groups seeking affordable housing. We assist you in navigating government housing schemes, obtaining subsidy benefits, and matching you with lenders who specialize in low-ticket home construction financing.',
    benefits: [
      'Lower interest margins and subsidy matching advice',
      'Easier documentation checks and flexible income metrics',
      'Extended repayment structures up to 25 years',
      'Support for rural and semi-urban real estate buyers',
    ],
    eligibility: [
      'Household income matching scheme brackets',
      'First-time home buyers or families seeking low-budget property additions',
      'Clear property records within municipal or local body boundaries',
    ],
    documents: [
      'Basic KYC (Aadhaar, PAN, Voter ID)',
      'Income Declaration / Income Certificate from local authorities',
      'Last 6 months bank statements (if available)',
      'Land title documents / Gram Panchayat NOC certificates',
    ],
  },
  {
    id: 'lap',
    title: 'Loan Against Property (LAP)',
    subtitle: 'Unlock High Asset Valuations',
    overview: 'Get large-ticket funding by unlocking the equity in your residential, commercial, or industrial property. Use the capital for major business expansions, kids education, or consolidating existing high-interest credits at lower rates.',
    benefits: [
      'Much lower interest rates than unsecured personal loans',
      'High sanction amounts (up to 70% of market valuation)',
      'Longer repayment terms up to 15 years',
      'Retain complete ownership and usage of the property',
      'Easy loan structuring options matching cashflow cycles',
    ],
    eligibility: [
      'Property owners (individuals, firms, or business entities)',
      'Clean property titles, sanction plans, and tax receipts',
      'Documented proof of income to cover monthly EMIs',
      'Age bracket: 25 to 70 years',
    ],
    documents: [
      'KYC documents of all co-applicants & property owners',
      'Complete chain of property documents (Sale deed, index II, approved plans)',
      'Latest property tax receipts',
      'Income Proof: Last 3 years ITR with financial sheets / Salary slips',
      'Last 12 months bank statements (all active bank accounts)',
    ],
  },
  {
    id: 'business-loan',
    title: 'Business Loan',
    subtitle: 'Unsecured Working Capital & Expansion Loans',
    overview: 'Fuel your business growth with our tailored business loans. Secure unsecured working capital, machinery financing, or trade expansion credits to scale operations without giving up business equity.',
    benefits: [
      'Collateral-free business loans up to ₹75 Lakhs',
      'Tenures ranging from 12 to 48 months',
      'Quick evaluation of cashflow performance instead of hard asset checks',
      'Minimal paperwork and fast disbursal direct to current account',
      'Interest margins mapped to business performance metrics',
    ],
    eligibility: [
      'Proprietorships, partnerships, or private limited firms',
      'Minimum business vintage: 3 active years',
      'Minimum annual turnover: ₹20 Lakhs',
      'Consistent profit margins and clean bank credit histories',
    ],
    documents: [
      'Business KYC: GST registration certificate, MSME certificate, Partnership deed',
      'PAN & Aadhaar card of owners',
      'Latest 2 years Income Tax Returns with balance sheets',
      'Last 12 months GST returns & current account bank statement',
    ],
  },
  {
    id: 'balance-transfer',
    title: 'Balance Transfer Assistance',
    subtitle: 'Reduce Your High EMIs Instantly',
    overview: 'Are you paying high interest rates on your active home loans or LAP? Let us help you shift your outstanding balance to premium lenders offering lower rates. This helps you save lakhs on total interest and reduces your monthly EMI burden.',
    benefits: [
      'Instant reduction in monthly EMI obligations',
      'Option to top-up loan amounts at the same low rate',
      'Consolidate multiple small loans into a single lower payment',
      'Hassle-free process with end-to-end documents coordination',
    ],
    eligibility: [
      'Must have an active running loan with consistent track records',
      'No outstanding EMI defaults in the last 12 months',
      'Property title or salary must meet current bank criteria',
    ],
    documents: [
      'Outstanding loan statement & foreclosure letter copy from existing lender',
      'Original sanction letter copy',
      'List of property documents held by the existing bank',
      'Fresh income documentation (Salary slips / ITR)',
      '6 months bank statements showing active EMI cuts',
    ],
  },
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(SERVICES[0]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const match = SERVICES.find((s) => s.id === id);
        if (match) {
          setSelectedService(match);
        }
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="bg-slatebg min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">Imperial Services Directory</span>
          <h1 className="text-4xl md:text-5xl font-bold text-deep tracking-tight font-heading">
            Tailored Financing Solutions
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Select a service category below to view detailed overviews, document requirements, eligibility guidelines, and apply for a callback.
          </p>
        </div>

        {/* Dynamic Service Grid / Tabbed Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation index sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-2 bg-white border border-slate-200 p-4 rounded-premium shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 block">
              Loan Categories
            </span>
            {SERVICES.map((service) => {
              const isActive = selectedService.id === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`w-full text-left px-4 py-3.5 rounded-premium-sm text-sm font-semibold tracking-wide transition flex items-center justify-between ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-primary'
                  }`}
                >
                  <div className="flex flex-col">
                    <span>{service.title}</span>
                    <span className={`text-[10px] ${isActive ? 'text-white/85' : 'text-slate-400'} font-medium mt-0.5`}>
                      {service.subtitle.split(' & ')[0]}
                    </span>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}
            
            <div className="border-t border-slate-100 pt-4 mt-2 flex flex-col gap-3 px-2">
              <div className="text-xs text-slate-500 text-center">
                Need customized consultation?
              </div>
              <a
                href="tel:+918408090022"
                className="bg-deep hover:bg-deep-dark text-white text-xs font-bold text-center py-2.5 rounded-premium transition flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Call +91 8408090022
              </a>
            </div>
          </div>

          {/* Service detail view panel */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="bg-white border border-slate-200 rounded-premium p-6 md:p-10 shadow-sm flex flex-col gap-8 text-left animate-in fade-in duration-300">
              
              {/* Header Title */}
              <div className="border-b border-slate-100 pb-5">
                <span className="text-primary text-xs font-bold uppercase tracking-wider block mb-1">
                  {selectedService.subtitle}
                </span>
                <h2 className="text-3xl font-extrabold text-deep tracking-tight">
                  {selectedService.title}
                </h2>
              </div>

              {/* Overview */}
              <div className="flex flex-col gap-3">
                <h3 className="text-deep font-bold text-md flex items-center gap-2">
                  <TrendingUp className="w-4.5 h-4.5 text-primary" /> Overview
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {selectedService.overview}
                </p>
              </div>

              {/* Benefits */}
              <div className="flex flex-col gap-3">
                <h3 className="text-deep font-bold text-md flex items-center gap-2">
                  <Coins className="w-4.5 h-4.5 text-primary" /> Key Benefits & Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                  {selectedService.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility & Documents */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-8">
                {/* Eligibility */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-deep font-bold text-md flex items-center gap-2">
                    <UserCheck className="w-4.5 h-4.5 text-primary" /> Eligibility Criteria
                  </h3>
                  <div className="flex flex-col gap-3">
                    {selectedService.eligibility.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-500 font-semibold leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documents */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-deep font-bold text-md flex items-center gap-2">
                    <FileText className="w-4.5 h-4.5 text-primary" /> Required Documents
                  </h3>
                  <div className="flex flex-col gap-3">
                    {selectedService.documents.map((doc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-500 font-semibold leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-slatebg border border-slate-200/60 rounded-premium p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-sm shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs text-slate-400 font-bold uppercase">Consultation Call</span>
                    <a href="tel:+918408090022" className="text-sm font-bold text-deep hover:underline">
                      +91 8408090022
                    </a>
                  </div>
                </div>
                <a
                  href="#inquiry"
                  className="bg-primary hover:bg-primary-dark text-white font-semibold text-xs px-6 py-2.5 rounded-premium shadow-sm transition"
                >
                  Request Callback
                </a>
              </div>
            </div>

            {/* In-page Inquiry Form for the specific loan type */}
            <div id="inquiry">
              <LeadForm
                key={selectedService.id}
                defaultLoanType={selectedService.title}
                formTitle={`Inquire About ${selectedService.title}`}
                formSubtitle={`Submit your credentials to check eligibility for ${selectedService.title}. Lead consultant Ravi Godghate will review the request.`}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
