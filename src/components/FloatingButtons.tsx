'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';

export default function FloatingButtons() {
  const [showCallMenu, setShowCallMenu] = useState(false);

  const whatsappUrl = `https://wa.me/919890212456?text=${encodeURIComponent(
    'Hello Imperial Financial, I would like assistance regarding a loan.'
  )}`;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5 items-end">
        {/* Call numbers menu popup */}
        {showCallMenu && (
          <div className="bg-white border border-slate-200 rounded-premium shadow-premium-hover p-4 flex flex-col gap-2.5 animate-in fade-in slide-in-from-bottom-5 duration-200 w-64 mr-1">
            <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
              <span className="text-xs font-bold text-deep uppercase tracking-wider">Contact Advisors</span>
              <button
                onClick={() => setShowCallMenu(false)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="tel:+918408090022"
                className="flex items-center justify-between text-sm font-semibold text-slate-700 hover:bg-primary/5 hover:text-primary p-2 rounded-lg transition-colors"
                onClick={() => setShowCallMenu(false)}
              >
                <span>Call Advisor 1</span>
                <span className="text-xs font-mono text-slate-500">+91 8408090022</span>
              </a>
              <a
                href="tel:+919890212456"
                className="flex items-center justify-between text-sm font-semibold text-slate-700 hover:bg-primary/5 hover:text-primary p-2 rounded-lg transition-colors"
                onClick={() => setShowCallMenu(false)}
              >
                <span>Call Advisor 2</span>
                <span className="text-xs font-mono text-slate-500">+91 9890212456</span>
              </a>
            </div>
          </div>
        )}

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-premium-hover hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group relative"
          aria-label="Contact via WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="absolute right-full mr-3 bg-slate-900 text-white text-[11px] font-semibold py-1.5 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
            Chat on WhatsApp
          </span>
        </a>

        {/* Call Button */}
        <button
          onClick={() => setShowCallMenu(!showCallMenu)}
          className="bg-primary hover:bg-primary-dark text-white p-3.5 rounded-full shadow-premium-hover hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group relative border border-white/10"
          aria-label="Call Contacts"
        >
          <Phone className="w-6 h-6 fill-white" />
          <span className="absolute right-full mr-3 bg-slate-900 text-white text-[11px] font-semibold py-1.5 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
            Call Advisor
          </span>
        </button>
      </div>
    </>
  );
}
