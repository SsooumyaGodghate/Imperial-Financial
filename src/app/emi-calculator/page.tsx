'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Info, HelpCircle, ArrowRight, Calculator } from 'lucide-react';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(2500000); // 25 Lakhs default
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% default
  const [tenure, setTenure] = useState(15); // 15 years default
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');

  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);

  // Perform real-time EMI calculation
  useEffect(() => {
    const principal = loanAmount;
    const ratePerMonth = interestRate / 12 / 100;
    const totalMonths = tenureType === 'years' ? tenure * 12 : tenure;

    if (principal > 0 && ratePerMonth > 0 && totalMonths > 0) {
      // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
      const emi =
        (principal * ratePerMonth * Math.pow(1 + ratePerMonth, totalMonths)) /
        (Math.pow(1 + ratePerMonth, totalMonths) - 1);

      const repayment = emi * totalMonths;
      const interest = repayment - principal;

      setMonthlyEMI(Math.round(emi));
      setTotalRepayment(Math.round(repayment));
      setTotalInterest(Math.round(interest));
    } else {
      setMonthlyEMI(0);
      setTotalRepayment(0);
      setTotalInterest(0);
    }
  }, [loanAmount, interestRate, tenure, tenureType]);

  // Format currencies into Indian Standards: e.g. ₹2,50,000
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Donut chart stroke details
  const principalPercentage = totalRepayment > 0 ? (loanAmount / totalRepayment) * 100 : 100;
  const interestPercentage = 100 - principalPercentage;
  
  // SVG Donut Config
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (interestPercentage / 100) * circumference;

  return (
    <div className="bg-slatebg min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">Financial Planning Tools</span>
          <h1 className="text-4xl md:text-5xl font-bold text-deep tracking-tight font-heading">
            Loan EMI Calculator
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Estimate your monthly installments, total interest burden, and amortization breakdown in real-time. Adjust the sliders to match your budget.
          </p>
        </div>

        {/* Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-6 md:p-8 rounded-premium shadow-sm flex flex-col gap-8 text-left">
            <h2 className="text-lg font-bold text-deep flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calculator className="w-5 h-5 text-primary" /> Calculator Inputs
            </h2>

            {/* Loan Amount */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Loan Amount</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm font-bold">₹</span>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="bg-slatebg border border-slate-200 rounded-premium-sm pl-8 pr-4 py-2 text-sm text-slate-800 font-bold focus:outline-none focus:border-primary w-40 text-right"
                  />
                </div>
              </div>
              <input
                type="range"
                min="50000"
                max="100000000"
                step="50000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>₹50,000</span>
                <span>₹50 Lakhs</span>
                <span>₹10 Crores</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Interest Rate (p.a.)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.05"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="bg-slatebg border border-slate-200 rounded-premium-sm px-4 py-2 text-sm text-slate-800 font-bold focus:outline-none focus:border-primary w-32 text-right"
                  />
                  <span className="absolute right-3.5 top-2 text-slate-400 text-sm font-bold">%</span>
                </div>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="0.05"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>5%</span>
                <span>15%</span>
                <span>25%</span>
              </div>
            </div>

            {/* Loan Tenure */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Loan Tenure</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Math.max(0, parseInt(e.target.value) || 0))}
                    className="bg-slatebg border border-slate-200 rounded-premium-sm px-4 py-2 text-sm text-slate-800 font-bold focus:outline-none focus:border-primary w-24 text-right"
                  />
                  
                  {/* Years vs Months toggle */}
                  <div className="bg-slatebg border border-slate-200 p-0.5 rounded-lg flex items-center shadow-inner">
                    <button
                      onClick={() => {
                        if (tenureType === 'months') {
                          setTenure(Math.max(1, Math.round(tenure / 12)));
                          setTenureType('years');
                        }
                      }}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                        tenureType === 'years'
                          ? 'bg-white text-primary shadow-sm'
                          : 'text-slate-500'
                      }`}
                    >
                      Yr
                    </button>
                    <button
                      onClick={() => {
                        if (tenureType === 'years') {
                          setTenure(tenure * 12);
                          setTenureType('months');
                        }
                      }}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                        tenureType === 'months'
                          ? 'bg-white text-primary shadow-sm'
                          : 'text-slate-500'
                      }`}
                    >
                      Mo
                    </button>
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max={tenureType === 'years' ? 30 : 360}
                step="1"
                value={tenure}
                onChange={(e) => setTenure(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>1 {tenureType === 'years' ? 'Year' : 'Month'}</span>
                <span>{tenureType === 'years' ? '15 Years' : '180 Months'}</span>
                <span>{tenureType === 'years' ? '30 Years' : '360 Months'}</span>
              </div>
            </div>

            {/* Advise box */}
            <div className="bg-primary/5 border border-primary/15 p-4.5 rounded-premium flex items-start gap-3">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Need help lower rates?</strong> Try transferring your high-interest active loan to a partner bank through our <strong>Balance Transfer Assistance</strong>.
              </p>
            </div>
          </div>

          {/* Results Summary & Breakdown Panel */}
          <div className="lg:col-span-5 bg-deep text-white p-6 md:p-8 rounded-premium shadow-md flex flex-col justify-between text-left relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            
            <div className="relative z-10 flex flex-col gap-6">
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-350 border-b border-white/10 pb-3">
                Calculated Summary
              </h2>

              {/* Monthly EMI */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Monthly EMI Payment</span>
                <span className="text-4xl font-extrabold text-gold tracking-tight">{formatCurrency(monthlyEMI)}</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 border-t border-b border-white/10 py-5">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Principal Amount</span>
                  <span className="text-md font-bold text-white">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Total Interest Payable</span>
                  <span className="text-md font-bold text-white">{formatCurrency(totalInterest)}</span>
                </div>
              </div>

              {/* Total Repayment */}
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-300">Total Repayment (Principal + Int)</span>
                <span className="text-lg font-bold text-white">{formatCurrency(totalRepayment)}</span>
              </div>

              {/* Interactive Chart Visual */}
              <div className="flex items-center gap-6 mt-4 bg-white/5 p-4 rounded-premium border border-white/10">
                <div className="relative flex items-center justify-center shrink-0 w-20 h-20">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="40" cy="40" r="30" className="stroke-primary fill-none" strokeWidth="8" />
                    <circle
                      cx="40"
                      cy="40"
                      r="30"
                      className="stroke-gold fill-none"
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-[9px] font-bold uppercase text-slate-400">Ratio</div>
                </div>

                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex items-center gap-2 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                    <span>Principal: <strong>{principalPercentage.toFixed(0)}%</strong></span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-gold shrink-0" />
                    <span>Interest: <strong>{interestPercentage.toFixed(0)}%</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-white/10 relative z-10 flex flex-col gap-3">
              <Link
                href="/services"
                className="bg-white hover:bg-slate-50 text-deep font-bold text-center text-xs py-3 rounded-premium shadow-md transition flex items-center justify-center gap-1.5"
              >
                Apply For This Loan
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <div className="text-center text-[10px] text-slate-400 font-semibold flex items-center justify-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> Quotes are subject to credit approvals and matching bank policies.
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
