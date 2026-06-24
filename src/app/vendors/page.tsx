'use client';

import React, { useState } from 'react';
import { Store, Phone, Instagram, User, CheckCircle, ArrowRight, ChefHat, TrendingUp, Zap, Users } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.trynanaapp.com';

const PERKS = [
  { icon: TrendingUp, title: 'Grow your revenue', body: 'Reach thousands of hungry customers in your city who are ready to order right now.' },
  { icon: Zap,        title: 'Fast onboarding',  body: 'Get your store live in days, not weeks. Our team handles the setup end to end.' },
  { icon: Users,      title: 'Dedicated support', body: 'A partner success manager assigned to your account from day one.' },
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function VendorsPage() {
  const [form, setForm] = useState({ name: '', business_name: '', phone: '', instagram: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(`${API_URL}/api/v1/vendor-interest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data?.message ?? 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  const isValid = Object.values(form).every(v => v.trim().length > 0);

  if (status === 'success') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-nana-blue via-[#3a7bc8] to-nana-blue flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">You're on the list!</h2>
          <p className="text-gray-500 leading-relaxed">
            Thanks for your interest. Our team will reach out to <span className="font-semibold text-gray-700">{form.phone}</span> within 48 hours to get your store live.
          </p>
          <div className="mt-8 pt-6 border-t border-gray-100">
            <a href="/" className="text-nana-blue font-semibold text-sm hover:underline">
              ← Back to Nana
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-nana-blue via-[#3a7bc8] to-nana-blue overflow-hidden py-24 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white px-5 py-2.5 rounded-md mb-8 border border-white/25">
            <ChefHat className="w-4 h-4" />
            <span className="text-sm font-bold">Partner with Nana</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
            Sell more.<br />
            <span className="text-white/80">Reach more customers.</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of restaurants and stores already growing their business on Nana. Fill in the form below and we'll get you started.
          </p>
        </div>
      </section>

      {/* Perks + Form */}
      <section className="bg-background-secondary py-20 px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — perks */}
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-10">
              Why partner with Nana?
            </h2>
            <div className="flex flex-col gap-8">
              {PERKS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-nana-blue/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-nana-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-border-light">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Show your interest</h2>
            <p className="text-sm text-gray-500 mb-8">All fields are required. We'll contact you within 48 hours.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="Amina Ibrahim"
                    value={form.name}
                    onChange={set('name')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-light focus:border-nana-blue focus:ring-2 focus:ring-nana-blue/20 outline-none transition text-sm text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                </div>
              </div>

              {/* Business name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Business name</label>
                <div className="relative">
                  <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="Mama's Kitchen"
                    value={form.business_name}
                    onChange={set('business_name')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-light focus:border-nana-blue focus:ring-2 focus:ring-nana-blue/20 outline-none transition text-sm text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    value={form.phone}
                    onChange={set('phone')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-light focus:border-nana-blue focus:ring-2 focus:ring-nana-blue/20 outline-none transition text-sm text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                </div>
              </div>

              {/* Instagram */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Instagram handle</label>
                <div className="relative">
                  <Instagram className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="@mamaskitchen"
                    value={form.instagram}
                    onChange={set('instagram')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-light focus:border-nana-blue focus:ring-2 focus:ring-nana-blue/20 outline-none transition text-sm text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={!isValid || status === 'loading'}
                className="mt-2 w-full flex items-center justify-center gap-2 bg-nana-blue text-white font-bold py-4 rounded-xl hover:bg-[#3a87c9] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Submit interest
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-xs text-center text-gray-400">
                By submitting you agree to be contacted by Nana's partner team.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
