'use client';

import React from 'react';
import './globals.css';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import CategoriesSection from './components/sections/CategoriesSection';
import HowItWorksSection from './components/sections/HowItWorksSection';
import StatsSection from './components/sections/StatsSection';
import DownloadApp from './components/DownloadSection';
import CardSection from './components/Card';
import CTASection from './components/sections/CTASection';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Categories Section - Marketplace Ready */}
      <CategoriesSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Download App Section */}
      <DownloadApp />

      {/* Beyond Delivery Section */}
      <CardSection />

      {/* Final CTA Section */}
      <CTASection />
    </main>
  );
}
