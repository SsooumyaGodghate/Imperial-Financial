import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Award, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slatebg border-t border-slate-200">
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Company info */}
        <div className="flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-0.5 shadow-sm">
              <Image
                src="/logo.jpeg"
                alt="Imperial Financial Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-md font-bold tracking-tight text-deep leading-none">
                Imperial
              </span>
              <span className="text-[9px] font-semibold text-gold tracking-widest leading-none mt-1">
                Financial
              </span>
            </div>
          </Link>
          <p className="text-slate-600 text-sm leading-relaxed">
            Helping individuals and businesses secure the right financing with expert guidance, fast processing, and trusted financial solutions.
          </p>
          <div className="flex items-center gap-2 text-deep text-xs font-semibold bg-white border border-slate-100 rounded-lg p-2.5 shadow-sm">
            <Award className="w-4 h-4 text-gold shrink-0" />
            <span>Premium Loan Advisory Services</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-deep font-bold text-sm uppercase tracking-wider mb-5">Quick Links</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <Link href="/" className="text-slate-600 hover:text-primary transition-colors font-medium">Home</Link>
            </li>
            <li>
              <Link href="/services" className="text-slate-600 hover:text-primary transition-colors font-medium">Our Services</Link>
            </li>
            <li>
              <Link href="/about" className="text-slate-600 hover:text-primary transition-colors font-medium">About Us</Link>
            </li>
            <li>
              <Link href="/emi-calculator" className="text-slate-600 hover:text-primary transition-colors font-medium">EMI Calculator</Link>
            </li>
            <li>
              <Link href="/contact" className="text-slate-600 hover:text-primary transition-colors font-medium">Contact & Support</Link>
            </li>
            <li>
              <Link href="/admin" className="text-slate-400 hover:text-primary transition-colors text-xs font-medium">Admin Portal</Link>
            </li>
          </ul>
        </div>

        {/* Services List */}
        <div>
          <h3 className="text-deep font-bold text-sm uppercase tracking-wider mb-5">Our Offerings</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-slate-600 font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> Salaried Personal Loans
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> Business Loans
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> Home & Housing Loans
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> Loan Against Property (LAP)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> Balance Transfer Assistance
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> Financial Consultation
            </li>
          </ul>
        </div>

        {/* Contact details */}
        <div className="flex flex-col gap-4">
          <h3 className="text-deep font-bold text-sm uppercase tracking-wider mb-1">Get In Touch</h3>
          <div className="flex flex-col gap-3 text-sm text-slate-600 font-medium">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>
                <strong>Imperial Financial Office</strong><br />
                302, 3rd floor, B-Wing, Lokmat building, Nagpur, Maharashtra
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <div className="flex flex-col">
                <a href="tel:+918408090022" className="hover:text-primary transition-colors">+91 8408090022</a>
                <a href="tel:+919890212456" className="hover:text-primary transition-colors">+91 9890212456</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <a href="mailto:ravigodghate76@gmail.com" className="hover:text-primary transition-colors">
                ravigodghate76@gmail.com
              </a>
            </div>
            <div className="text-xs border-t border-slate-200/60 pt-3 mt-1">
              <span className="text-slate-500">Adviser:</span> <strong className="text-deep">Ravi Godghate</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="bg-slate-900 text-slate-400 py-6 px-4 md:px-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center md:text-left">
            &copy; {currentYear} Imperial Financial. All Rights Reserved. Designed for premium, high-trust financial services.
          </p>
          <div className="flex gap-6">
            <Link href="/services" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/emi-calculator" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
