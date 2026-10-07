import React from 'react';
import { PageHero } from '../components/pages/PageParts';
import { OpenRoles, type Role } from '../components/pages/OpenRoles';

export const metadata = { title: 'Careers' };

const PERKS = [
  { title: 'Health cover', copy: 'For you and your family, from day one.' },
  { title: 'On site in Kano', copy: 'Work alongside the team at our hub on Zoo Road.' },
  { title: 'Learning budget', copy: 'Courses, books and conferences.' },
  { title: 'Ownership', copy: 'Equity for every full-time hire.' },
];

const ROLES: Role[] = [
  { title: 'Social Media Manager', team: 'Marketing', location: 'On site · Kano', description: 'Run Nana’s Instagram, TikTok, X and WhatsApp channels — plan the calendar, write the posts, reply to customers and grow the audience across Kano.' },
  { title: 'Content Creator', team: 'Marketing', location: 'On site · Kano', description: 'Make the posts, reels and stories people stop scrolling for — food, riders, stores and the city — and turn ideas into content every week.' },
  { title: 'Videographer', team: 'Marketing', location: 'On site · Kano', description: 'Shoot and edit video for social, campaigns and the app: restaurant menus, rider stories and short-form ads, from planning the shot to the final cut.' },
  { title: 'Merchant Success Manager', team: 'Partnerships', location: 'On site · Kano', description: 'Onboard restaurants and stores, then help them grow with better menus, photos and promos — and be the person they call when something needs fixing.' },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        bg="var(--yellow)"
        eyebrow="Careers"
        size="clamp(64px,10vw,160px)"
        title={
          <>
            Build what
            <br />
            your city
            <br />
            runs on
          </>
        }
        lede="Small team, big streets. We hire people who like hard problems and short feedback loops."
      />
      <section className="v-wrap" style={{ paddingTop: 'clamp(64px,8vw,110px)', paddingBottom: 40, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 16 }}>
        {PERKS.map((p) => (
          <div key={p.title} className="v-reveal" style={{ borderRadius: 24, background: 'var(--fill)', padding: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 19, fontWeight: 600 }}>{p.title}</span>
            <span style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--muted)' }}>{p.copy}</span>
          </div>
        ))}
      </section>
      <OpenRoles roles={ROLES} />
    </>
  );
}
