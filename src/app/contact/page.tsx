'use client';
import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Container, Section, Eyebrow, Dot, Field, SelectField, TextareaField, FormSuccess } from '../components/site/primitives';
import { track } from '@/lib/analytics';

const CHANNELS = [
  { icon: MessageCircle, title: 'In-app chat', copy: '7:00 am – midnight, every day. Under two minutes to a human.' },
  { icon: Phone, title: 'WhatsApp & phone', copy: '0812 222 9693 — call or message, same number.' },
  { icon: Mail, title: 'Email', copy: 'suraj@trynanaapp.com' },
  { icon: MapPin, title: 'The hub', copy: 'Suite 60, MYCA7 Plaza, Zoo Road, Kano. Riders welcome Mon–Sat.' },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <Section noReveal style={{ padding: 'clamp(36px,6vw,64px) 0 clamp(46px,7vw,80px)' }}>
        <Container>
          <Eyebrow>Contact</Eyebrow>
          <h1 style={{ margin: 0, maxWidth: '20em', fontSize: 'clamp(32px,6vw,48px)', lineHeight: 1.05, letterSpacing: '-0.045em', fontWeight: 900, color: 'var(--text-strong)' }}>
            How can we help?
          </h1>
          <p style={{ margin: '16px 0 0', maxWidth: '32em', fontSize: 17, lineHeight: 1.5, color: 'var(--text-muted)' }}>
            For anything about a live order, in-app chat is fastest — the agent can see your rider.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 16, marginTop: 34 }}>
            {CHANNELS.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} style={{ padding: 24, borderRadius: 18, background: '#fff', boxShadow: 'var(--shadow-sm)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 12, color: 'var(--color-primary)' }}>
                    <Icon style={{ width: 19, height: 19 }} />
                  </span>
                  <div style={{ marginTop: 15, fontSize: 16.5, fontWeight: 700, color: 'var(--text-strong)' }}>{c.title}</div>
                  <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.5, color: 'var(--text-muted)' }}>{c.copy}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section style={{ padding: '0 0 clamp(46px,7vw,84px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ background: '#fff', borderRadius: 24, boxShadow: 'var(--shadow-md)', padding: 'clamp(24px,4vw,40px)' }}>
            {sent ? (
              <FormSuccess
                title={<>Message sent<Dot /></>}
                body="You'll hear from us within one working day. For a live order, use in-app chat instead — it's faster."
              />
            ) : (
              <div>
                <h2 style={{ margin: 0, fontSize: 'clamp(23px,3.6vw,30px)', lineHeight: 1.1, letterSpacing: '-0.032em', fontWeight: 700, color: 'var(--text-strong)' }}>
                  Send us a message
                  <Dot />
                </h2>
                <p style={{ margin: '10px 0 26px', fontSize: 15.5, lineHeight: 1.5, color: 'var(--text-muted)' }}>
                  We answer within one working day.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Topic only — the name, contact detail and message stay out of analytics.
                    const form = new FormData(e.currentTarget);
                    track('contact_message_sent', {
                      topic: String(form.get('topic') ?? ''),
                    });
                    setSent(true);
                  }}
                  style={{ display: 'grid', gap: 16 }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
                    <Field label="Your name" placeholder="First and last name" required />
                    <Field label="Email or phone" placeholder="So we can reply" required />
                  </div>
                  <SelectField label="What's this about?" name="topic" required>
                    <option value="" disabled>Choose a topic</option>
                    <option>A problem with an order</option>
                    <option>Becoming a vendor</option>
                    <option>Riding with Nana</option>
                    <option>Nana for business</option>
                    <option>Press or investors</option>
                    <option>Something else</option>
                  </SelectField>
                  <TextareaField
                    label="Message"
                    rows={5}
                    placeholder="Tell us what happened, and include your order number if you have one."
                  />
                  <div style={{ marginTop: 4 }}>
                    <button type="submit" className="n-btn n-btn--primary" style={{ height: 56, padding: '0 28px', fontSize: 16 }}>
                      Send message
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
