'use client';
import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Image from 'next/image';
import Link from 'next/link';
import TestImage from '@/assets/test.jpg';
import './globals.css';
import DownloadApp from './components/download';
import InfoCta from './components/InfoCta';

import HomeBanner from './components/homesection';
import CardSection from './components/Card';
import VideoBanner from './components/Video';

export default function Home() {
  return (
    <div className="mx-auto">
      <HomeBanner color="bg-[#cbe1ad]" image={TestImage} />
      <VideoBanner
        image="https://consumer-static-assets.wolt.com/frontpage-assets/video-cover-image-4.jpg"
        title="What is Nana?"
        subtitle="Delivered."
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis vitae iusto ex, eos nemo, dolores cupiditate labore saepe, aspernatur accusamus non adipisci harum molestias unde voluptate tenetur atque optio? Odit."
      />

      <InfoCta
        title="Did you know?"
        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae voluptas temporibus mollitia eaque minima repudiandae ipsa necessitatibus quisquam optio maiores perspiciatis deleniti blanditiis, molestias neque porro officia, facere provident adipisci debitis tempora est odit. Temporibus aperiam tempora voluptatum reprehenderit eaque at assumenda nobis alias eius. Sed delectus rerum qui iste?"
      />
      <CardSection />

      <DownloadApp />
    </div>
  );
}
