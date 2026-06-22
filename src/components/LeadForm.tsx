'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

const LOAN_TYPES = [
  'Salaried Personal Loan',
  'Small Ticket Personal Loan',
  'Large Ticket Personal Loan',
  'Home Loan',
  'Affordable Housing Loan',
  'Loan Against Property (LAP)',
  'Business Loan',
  'Balance Transfer Assistance',
  'Financial Consultation',
];

interface LeadFormProps {
  defaultLoanType?: string;
  formTitle?: string;
  formSubtitle?: string;
}

export default function LeadForm({
  defaultLoanType = '',
  formTitle = 'Request A Call Back',
  formSubtitle = 'Provide your details below, and our financial expert Ravi Godghate will get in touch with you shortly.',
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    loanType: defaultLoanType,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        loanType: defaultLoanType,
        message: '',
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white p-8 md:p-10 rounded-premium border border-slate-100 shadow-premium text-center flex flex-col items-center gap-5 justify-center min-h-[400px] animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-deep font-bold text-xl md:text-2xl">Application Submitted!</h3>
          <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
            Thank you for choosing Imperial Financial. Our lead consultant, <strong>Ravi Godghate</strong>, will review your request and call you shortly.
          </p>
        </div>
        <button
          onClick={() => setSuccess(false)}
          className="bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-6 py-2.5 rounded-premium transition duration-200 mt-2"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 rounded-premium border border-slate-100 shadow-premium flex flex-col gap-6 relative overflow-hidden">
      {/* Visual background indicator */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-deep to-gold" />

      <div className="flex flex-col gap-1.5">
        <h3 className="text-deep font-bold text-xl md:text-2xl tracking-tight">{formTitle}</h3>
        <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{formSubtitle}</p>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold p-3.5 rounded-premium flex items-center gap-2">
          <AlertCircle className="w-4.5 h-4.5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-bold text-deep uppercase tracking-wider">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={loading}
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full bg-slatebg border border-slate-200 rounded-premium-sm px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:opacity-60 transition"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Phone input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-xs font-bold text-deep uppercase tracking-wider">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              disabled={loading}
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 9890212456"
              className="w-full bg-slatebg border border-slate-200 rounded-premium-sm px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:opacity-60 transition"
            />
          </div>

          {/* Email input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-bold text-deep uppercase tracking-wider">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              disabled={loading}
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full bg-slatebg border border-slate-200 rounded-premium-sm px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:opacity-60 transition"
            />
          </div>
        </div>

        {/* Loan Type select */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="loanType" className="text-xs font-bold text-deep uppercase tracking-wider">
            Loan Category <span className="text-rose-500">*</span>
          </label>
          <select
            id="loanType"
            name="loanType"
            required
            disabled={loading}
            value={formData.loanType}
            onChange={handleChange}
            className="w-full bg-slatebg border border-slate-200 rounded-premium-sm px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:opacity-60 transition"
          >
            <option value="" disabled>Select the service you need...</option>
            {LOAN_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Message input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-xs font-bold text-deep uppercase tracking-wider">
            Message / Specific Requirements <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            disabled={loading}
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your loan requirement (e.g. loan amount, employment details, property type)..."
            className="w-full bg-slatebg border border-slate-200 rounded-premium-sm px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:opacity-60 transition resize-none"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold text-sm py-3 rounded-premium shadow-premium transition duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 disabled:opacity-75 disabled:pointer-events-none mt-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing Request...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Consultation Request
            </>
          )}
        </button>
      </form>

      {/* Safety Indicator */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 border-t border-slate-100 pt-4 font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Your data is 256-bit encrypted and safely stored. We never share your contact details.</span>
      </div>
    </div>
  );
}
