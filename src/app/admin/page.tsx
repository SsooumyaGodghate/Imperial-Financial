'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  LogOut,
  Search,
  Trash2,
  CheckCircle,
  FileSpreadsheet,
  RefreshCw,
  FolderOpen,
  Filter,
  ShieldAlert,
  ClipboardList,
  Edit3,
  Lock,
  User as UserIcon,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

interface Lead {
  _id: string;
  name: string;
  phone: string;
  email: string;
  loanType: string;
  message: string;
  status: 'New' | 'Contacted' | 'Interested' | 'Converted' | 'Closed';
  notes?: string;
  createdAt: string;
}

interface AuditLog {
  _id: string;
  action: string;
  adminUser: string;
  details: string;
  ipAddress?: string;
  createdAt: string;
}

export default function AdminPage() {
  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard states
  const [leads, setLeads] = useState<Lead[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [activeTab, setActiveTab] = useState<'leads' | 'logs'>('leads');
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loanFilter, setLoanFilter] = useState('');
  
  // Lead Notes editing states
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [editingNotesText, setEditingNotesText] = useState('');

  // Check login state by testing the leads API
  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/leads?limit=1');
      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    } finally {
      setCheckingAuth(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Fetch leads from API
  const fetchLeads = useCallback(async () => {
    if (!isLoggedIn) return;
    setLeadsLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (statusFilter) queryParams.append('status', statusFilter);
      if (loanFilter) queryParams.append('loanType', loanFilter);

      const response = await fetch(`/api/admin/leads?${queryParams.toString()}`);
      if (response.ok) {
        const resData = await response.json();
        setLeads(resData.data || []);
      } else if (response.status === 401) {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error('Fetch leads error:', err);
    } finally {
      setLeadsLoading(false);
    }
  }, [search, statusFilter, loanFilter, isLoggedIn]);

  // Fetch audit logs from API
  const fetchAuditLogs = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const response = await fetch('/api/admin/audit-logs');
      if (response.ok) {
        const resData = await response.json();
        setAuditLogs(resData.data || []);
      }
    } catch (err) {
      console.error('Fetch audit logs error:', err);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchLeads();
    }
  }, [isLoggedIn, fetchLeads]);

  useEffect(() => {
    if (isLoggedIn && activeTab === 'logs') {
      fetchAuditLogs();
    }
  }, [isLoggedIn, activeTab, fetchAuditLogs]);

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      setIsLoggedIn(true);
      setLoginUsername('');
      setLoginPassword('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLoginError(err.message);
      } else {
        setLoginError('An unexpected error occurred.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        setIsLoggedIn(false);
        setLeads([]);
        setAuditLogs([]);
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Update lead status
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchLeads();
        if (activeTab === 'logs') fetchAuditLogs();
      }
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  // Save lead notes
  const handleSaveNotes = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: editingNotesText }),
      });
      if (response.ok) {
        setEditingNotesId(null);
        fetchLeads();
      }
    } catch (err) {
      console.error('Save notes error:', err);
    }
  };

  // Delete lead
  const handleDeleteLead = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the lead for "${name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/leads/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchLeads();
        if (activeTab === 'logs') fetchAuditLogs();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // Calculate metrics
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const contactedLeads = leads.filter((l) => l.status === 'Contacted').length;
  const convertedLeads = leads.filter((l) => l.status === 'Converted').length;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Contacted':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Interested':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Converted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Closed':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  // Render checking authentication loader
  if (checkingAuth) {
    return (
      <div className="bg-slatebg min-h-[80vh] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-slate-405 font-bold">Verifying Session...</span>
      </div>
    );
  }

  // 1. RENDER LOGIN FORM INLINE IF NOT LOGGED IN
  if (!isLoggedIn) {
    return (
      <div className="bg-slatebg min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full flex flex-col gap-8 bg-white p-8 md:p-10 rounded-premium border border-slate-200 shadow-premium relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-deep to-primary" />

          {/* Logo and title */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-1 shadow-sm w-12 h-12">
              <Image
                src="/logo.jpeg"
                alt="Imperial Financial Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-md font-bold tracking-tight text-deep leading-none">
                Imperial Financial
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Admin Portal
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-deep mt-2">Sign In To Dashboard</h2>
          </div>

          {loginError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold p-3.5 rounded-premium flex items-center gap-2 text-left">
              <AlertCircle className="w-4.5 h-4.5 text-rose-600 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="username" className="text-xs font-bold text-deep uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  id="username"
                  required
                  disabled={loginLoading}
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-slatebg border border-slate-200 rounded-premium-sm pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary disabled:opacity-60 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="password" className="text-xs font-bold text-deep uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  id="password"
                  required
                  disabled={loginLoading}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slatebg border border-slate-200 rounded-premium-sm pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary disabled:opacity-60 transition"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold text-sm py-3 rounded-premium shadow-premium transition duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 disabled:opacity-75 disabled:pointer-events-none mt-2"
            >
              {loginLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 border-t border-slate-100 pt-4 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Secure administrator login session. Activity logs are recorded.</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. RENDER THE DASHBOARD DIRECTLY ON THE SAME PAGE IF LOGGED IN
  return (
    <div className="bg-slatebg min-h-screen text-slate-800 text-left">
      {/* Top dashboard bar */}
      <div className="bg-white border-b border-slate-200 py-4.5 px-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-0.5 shadow-sm w-9 h-9">
            <Image
              src="/logo.jpeg"
              alt="Imperial Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-deep tracking-wide leading-none">
              Imperial Financial
            </span>
            <span className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-widest">
              Manager Panel
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              fetchLeads();
              if (activeTab === 'logs') fetchAuditLogs();
            }}
            className="p-2 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-lg transition"
            title="Refresh database data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold px-4 py-2 rounded-premium transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
        {/* Tab Selection */}
        <div className="flex gap-2 bg-white border border-slate-200 p-1 rounded-premium shadow-sm w-fit">
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-6 py-2 rounded-premium-sm text-xs font-bold transition ${
              activeTab === 'leads'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            Leads Management
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`flex items-center gap-2 px-6 py-2 rounded-premium-sm text-xs font-bold transition ${
              activeTab === 'logs'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            Audit Logging Trail
          </button>
        </div>

        {/* Tab 1: Leads Dashboard */}
        {activeTab === 'leads' && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-205">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Leads */}
              <div className="bg-white border border-slate-200 p-5 rounded-premium shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Leads</span>
                  <span className="text-2xl font-extrabold text-deep">{totalLeads}</span>
                </div>
              </div>

              {/* New Leads */}
              <div className="bg-white border border-slate-200 p-5 rounded-premium shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">New Inquiries</span>
                  <span className="text-2xl font-extrabold text-blue-600">{newLeadsCount}</span>
                </div>
              </div>

              {/* Contacted */}
              <div className="bg-white border border-slate-200 p-5 rounded-premium shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">In Discussion</span>
                  <span className="text-2xl font-extrabold text-amber-600">{contactedLeads}</span>
                </div>
              </div>

              {/* Converted */}
              <div className="bg-white border border-slate-200 p-5 rounded-premium shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sanctioned</span>
                  <span className="text-2xl font-extrabold text-emerald-600">{convertedLeads}</span>
                </div>
              </div>
            </div>

            {/* Datatable Controls */}
            <div className="bg-white border border-slate-200 p-5 rounded-premium shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <span className="absolute left-3.5 top-2.5 text-slate-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Search name, phone, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slatebg border border-slate-200 rounded-premium-sm pl-10 pr-4 py-2 text-xs text-slate-700 focus:outline-none focus:border-primary placeholder-slate-400"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {/* Status Filter */}
                <div className="flex items-center gap-1.5 bg-slatebg border border-slate-200 px-3 py-1.5 rounded-premium-sm text-xs font-semibold text-slate-600">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                {/* Product Filter */}
                <div className="flex items-center gap-1.5 bg-slatebg border border-slate-200 px-3 py-1.5 rounded-premium-sm text-xs font-semibold text-slate-600">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={loanFilter}
                    onChange={(e) => setLoanFilter(e.target.value)}
                    className="bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="">All Services</option>
                    <option value="Salaried Personal Loan">Salaried Personal Loan</option>
                    <option value="Small Ticket Personal Loan">Small Ticket Personal Loan</option>
                    <option value="Large Ticket Personal Loan">Large Ticket Personal Loan</option>
                    <option value="Home Loan">Home Loan</option>
                    <option value="Affordable Housing Loan">Affordable Housing Loan</option>
                    <option value="Loan Against Property (LAP)">Loan Against Property (LAP)</option>
                    <option value="Business Loan">Business Loan</option>
                    <option value="Balance Transfer Assistance">Balance Transfer Assistance</option>
                    <option value="Financial Consultation">Financial Consultation</option>
                  </select>
                </div>

                {/* Export Button */}
                <a
                  href="/api/admin/leads/export"
                  download
                  className="bg-deep hover:bg-deep-dark border border-deep-dark text-white text-xs font-bold px-4 py-2 rounded-premium flex items-center gap-1.5 shadow-sm transition ml-auto md:ml-0"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  Export CSV
                </a>
              </div>
            </div>

            {/* Datatable leads list */}
            <div className="bg-white border border-slate-200 rounded-premium shadow-sm overflow-hidden">
              <div className="overflow-x-auto w-full">
                {leadsLoading ? (
                  <div className="py-20 text-center flex flex-col items-center gap-3 justify-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-slate-400 font-bold">Querying Leads database...</span>
                  </div>
                ) : leads.length === 0 ? (
                  <div className="py-20 text-center text-slate-400 text-sm font-semibold">
                    No leads found matching your criteria.
                  </div>
                ) : (
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slatebg border-b border-slate-200 text-deep font-bold uppercase tracking-wider">
                        <th className="py-4.5 px-5">Submit Date</th>
                        <th className="py-4.5 px-5">Client Info</th>
                        <th className="py-4.5 px-5">Service Type</th>
                        <th className="py-4.5 px-5">Inquiry Details</th>
                        <th className="py-4.5 px-5">Status</th>
                        <th className="py-4.5 px-5">Follow-up Notes</th>
                        <th className="py-4.5 px-5 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead) => (
                        <tr key={lead._id} className="border-b border-slate-100 hover:bg-slate-50/50 transition">
                          {/* Date */}
                          <td className="py-4 px-5 text-slate-400 font-semibold whitespace-nowrap">
                            {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}<br />
                            <span className="text-[10px] text-slate-400">
                              {new Date(lead.createdAt).toLocaleTimeString('en-IN', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </td>

                          {/* Client info */}
                          <td className="py-4 px-5">
                            <div className="flex flex-col gap-1">
                              <span className="font-extrabold text-deep text-sm">{lead.name}</span>
                              <a href={`tel:${lead.phone}`} className="text-slate-500 hover:underline font-semibold">
                                {lead.phone}
                              </a>
                              <a href={`mailto:${lead.email}`} className="text-slate-400 hover:underline font-medium">
                                {lead.email}
                              </a>
                            </div>
                          </td>

                          {/* Loan type */}
                          <td className="py-4 px-5 whitespace-nowrap">
                            <span className="bg-slatebg border border-slate-200 text-deep text-[11px] font-bold py-1 px-2.5 rounded-full shadow-sm">
                              {lead.loanType}
                            </span>
                          </td>

                          {/* Message */}
                          <td className="py-4 px-5 max-w-xs">
                            <p className="text-slate-600 line-clamp-3 leading-relaxed font-medium">
                              {lead.message}
                            </p>
                          </td>

                          {/* Status badge */}
                          <td className="py-4 px-5">
                            <div className="relative">
                              <select
                                value={lead.status}
                                onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                                className={`appearance-none border text-[11px] font-bold py-1 pl-2.5 pr-6 rounded-premium-sm cursor-pointer focus:outline-none ${getStatusBadgeClass(
                                  lead.status
                                )}`}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Interested">Interested</option>
                                <option value="Converted">Converted</option>
                                <option value="Closed">Closed</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500">
                                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20">
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </td>

                          {/* Notes editing */}
                          <td className="py-4 px-5 max-w-[200px]">
                            {editingNotesId === lead._id ? (
                              <div className="flex flex-col gap-1.5">
                                <textarea
                                  value={editingNotesText}
                                  onChange={(e) => setEditingNotesText(e.target.value)}
                                  rows={2}
                                  className="w-full border border-primary rounded px-2 py-1 text-[11px] resize-none focus:outline-none"
                                />
                                <div className="flex gap-1.5 self-end">
                                  <button
                                    onClick={() => setEditingNotesId(null)}
                                    className="text-[9px] font-bold text-slate-500 border border-slate-200 px-2 py-0.5 rounded hover:bg-slate-50"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleSaveNotes(lead._id)}
                                    className="text-[9px] font-bold bg-primary text-white px-2 py-0.5 rounded hover:bg-primary-dark"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div
                                onClick={() => {
                                  setEditingNotesId(lead._id);
                                  setEditingNotesText(lead.notes || '');
                                }}
                                className="text-slate-500 hover:text-slate-700 cursor-pointer min-h-[30px] border border-dashed border-transparent hover:border-slate-200 hover:bg-slate-50/30 p-1.5 rounded transition text-[11px]"
                                title="Click to edit notes"
                              >
                                {lead.notes ? (
                                  <span className="leading-relaxed block italic font-semibold">{lead.notes}</span>
                                ) : (
                                  <span className="text-slate-350 italic block">Click to add follow-up notes...</span>
                                )}
                              </div>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-5 text-center">
                            <button
                              onClick={() => handleDeleteLead(lead._id, lead.name)}
                              className="text-slate-400 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Logs Logging */}
        {activeTab === 'logs' && (
          <div className="flex flex-col gap-6 bg-white border border-slate-200 p-6 rounded-premium shadow-sm text-left animate-in fade-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-deep flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-primary" /> Security Audit Log
              </h2>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Showing latest 100 entries</span>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slatebg border-b border-slate-200 text-deep font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Security Action</th>
                    <th className="py-3 px-4">Operator</th>
                    <th className="py-3 px-4">Security Log Details</th>
                    <th className="py-3 px-4">IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log._id} className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="py-3 px-4 text-slate-400 font-semibold whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}, {new Date(log.createdAt).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                            log.action === 'ADMIN_LOGIN'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-250'
                              : log.action === 'LEAD_DELETE'
                              ? 'bg-rose-50 text-rose-700 border-rose-250'
                              : 'bg-blue-50 text-blue-700 border-blue-250'
                          }`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-deep font-bold">{log.adminUser}</td>
                      <td className="py-3 px-4 text-slate-600 font-medium leading-relaxed">{log.details}</td>
                      <td className="py-3 px-4 font-mono text-slate-400">{log.ipAddress || '—'}</td>
                    </tr>
                  ))}
                  {auditLogs.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-slate-400 font-semibold">
                        No audit logs available in database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
