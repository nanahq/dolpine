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
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis vitae iusto ex, eos nemo, dolores cupiditate labore saepe, aspernatur accusamus non adipisci harum molestias unde voluptate tenetur atque optio? Odit."
      />

      <InfoCta
        title="Did you know?"
        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae voluptas temporibus mollitia eaque minima repudiandae ipsa necessitatibus quisquam optio maiores perspiciatis deleniti blanditiis, molestias neque porro officia, facere provident adipisci debitis tempora est odit. Temporibus aperiam tempora voluptatum reprehenderit eaque at assumenda nobis alias eius. Sed delectus rerum qui iste?"
      />

      <DownloadApp />
      <CardSection />
    </div>
  );
}
