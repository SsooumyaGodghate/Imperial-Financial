'use client';

import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import LeadForm from '@/components/LeadForm';

export default function ContactPage() {
  return (
    <div className="bg-slatebg min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">Connect with Us</span>
          <h1 className="text-4xl md:text-5xl font-bold text-deep tracking-tight font-heading">
            Contact Imperial Financial
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Have questions about loan eligibility or documentation? Submit an inquiry, or call our consultant Ravi Godghate directly to start processing your files.
          </p>
        </div>

        {/* Contact details grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Details side */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Lead Advisor Card */}
            <div className="bg-deep text-white p-6 md:p-8 rounded-premium shadow-md relative overflow-hidden text-left">
              <div className="absolute inset-0 bg-grid-pattern opacity-5" />
              <div className="relative z-10 flex flex-col gap-4">
                <span className="text-xs font-bold text-gold uppercase tracking-wider">Lead Loan Consultant</span>
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-white text-deep font-bold flex items-center justify-center border border-gold shrink-0">
                    RG
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-white leading-tight">Ravi Godghate</h3>
                    <span className="text-xs text-slate-300 font-semibold mt-0.5">Loan Consultancy & Financial Advisor</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-4 mt-1">
                  Connect directly to secure premium quotes for Salaried Personal Loans, Home Loans,LAP, or Business Loans.
                </p>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-premium shadow-sm flex flex-col gap-5 text-left">
              <h3 className="text-sm font-bold text-deep uppercase tracking-wider border-b border-slate-100 pb-2">Direct Contact Channels</h3>

              {/* Phone numbers */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-bold uppercase">Phone Helpline</span>
                  <a href="tel:+918408090022" className="text-sm font-bold text-deep hover:underline mt-0.5">
                    +91 8408090022
                  </a>
                  <a href="tel:+919890212456" className="text-sm font-bold text-deep hover:underline">
                    +91 9890212456
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 border-t border-slate-100 pt-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs text-slate-400 font-bold uppercase">Email Support</span>
                  <a href="mailto:support@theimperialfinancial.com" className="text-sm font-bold text-deep hover:underline mt-0.5">
                    support@theimperialfinancial.com
                  </a>
                  <a href="mailto:ravi@theimperialfinancial.com" className="text-xs font-semibold text-slate-500 hover:underline">
                    ravi@theimperialfinancial.com (Direct Advisor)
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5 border-t border-slate-100 pt-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-bold uppercase">Office Address</span>
                  <p className="text-sm text-slate-600 font-semibold leading-relaxed mt-0.5 text-left">
                    302, 3rd floor, B-Wing, Lokmat building, Nagpur, Maharashtra
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5 border-t border-slate-100 pt-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-bold uppercase">Consultation Hours</span>
                  <p className="text-sm text-slate-600 font-bold mt-0.5">
                    Mon – Sat: 09:30 AM to 07:00 PM
                  </p>
                </div>
              </div>

            </div>

            {/* Shield info */}
            <div className="flex items-center gap-2.5 text-xs text-slate-500 font-semibold bg-white border border-slate-200 p-4 rounded-premium shadow-sm text-left">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
              <span>Lead verification runs under secure 256-bit encryption. Safe financial practices guaranteed.</span>
            </div>
          </div>

          {/* Form and Map side */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Form */}
            <LeadForm defaultLoanType="Financial Consultation" formTitle="Contact Form" />
            
            {/* Google Maps Integration */}
            <div className="bg-white border border-slate-200 p-2 rounded-premium shadow-sm overflow-hidden h-[300px] w-full relative">
              <iframe
                title="Imperial Financial Office Location Map"
                src="https://maps.google.com/maps?q=Lokmat%20Bhavan,%20Nagpur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
