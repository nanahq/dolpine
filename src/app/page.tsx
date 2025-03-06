'use client';
import React from 'react';
import './globals.css';
import TestHero from '@/assets/test-hero.avif';
import DownloadApp from './components/DownloadSection';
import InfoCta from './components/InfoCta';
import HeroBanner from './components/Hero';
import CardSection from './components/Card';
import VideoBanner from './components/Video';

export default function Home() {
  return (
    <div className="mx-auto">
      <HeroBanner color="bg-[#D1BC9B]" image={TestHero} />
      <VideoBanner
        image="https://images.unsplash.com/photo-1488992783499-418eb1f62d08?q=80&w=989&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="What is Nana?"
        subtitle="Delivered."
        content="Nana is a delivery platform. We bring an end to end delivery processes - From your mobile phone to your doorstep in minutes. We understand the lack of reliability with traditional delivery service and Nana is here to fix that"
      />

      <InfoCta
        title="Not just another  delivery app"
        description="We have partnered with hundreds of homemade chefs, restaurants and grocery vendors around you to bring to you an wide array of options. We offer real time tracking to allow you track your order from the moment you pay to getting it to your doorstep. "
      />

      <DownloadApp />
      <CardSection />
    </div>
  );
}
