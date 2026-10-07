'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  addressFromCoords,
  currentPosition,
  newPlacesSession,
  resolvePlace,
  searchPlaces,
  type DeliveryAddress,
  type PlaceSuggestion,
} from '@/lib/shop/address';
import { NanaIcon } from '../site/NanaIcon';

type Props = {
  onPick: (a: DeliveryAddress) => void;
  autoFocus?: boolean;
  placeholder?: string;
  invalid?: boolean;
};

/** Google-backed address search plus "use my location". Every result carries coordinates. */
export function AddressSearch({ onPick, autoFocus, placeholder = 'Search street, estate or landmark', invalid }: Props) {
  const [q, setQ] = useState('');
  const [hits, setHits] = useState<PlaceSuggestion[]>([]);
  const [busy, setBusy] = useState<'search' | 'pick' | 'gps' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const session = useRef(newPlacesSession());

  useEffect(() => {
    const query = q.trim();
    if (query.length < 3) {
      setHits([]);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setBusy('search');
      try {
        setHits(await searchPlaces(query, session.current, ctrl.signal));
        setError(null);
      } catch (e) {
        if ((e as Error).name !== 'AbortError') setError('Address search is unavailable right now.');
      } finally {
        setBusy((b) => (b === 'search' ? null : b));
      }
    }, 280);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [q]);

  async function pick(s: PlaceSuggestion) {
    setBusy('pick');
    try {
      onPick(await resolvePlace(s, session.current));
      session.current = newPlacesSession();
      setQ('');
      setHits([]);
    } catch {
      setError('Could not load that address. Try another result.');
    } finally {
      setBusy(null);
    }
  }

  async function useGps() {
    setBusy('gps');
    setError(null);
    try {
      const pos = await currentPosition();
      onPick(await addressFromCoords(pos.coords.latitude, pos.coords.longitude));
    } catch {
      setError('We couldn’t get your location. Search for your address instead.');
    } finally {
      setBusy(null);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ position: 'relative' }}>
        <NanaIcon name="SearchSize20" size={18} style={{ position: 'absolute', left: 14, top: 17, color: '#6E787F' }} />
        <input
          className={`v-input${invalid ? ' is-error' : ''}`}
          style={{ paddingLeft: 42 }}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="off"
          aria-label="Delivery address"
        />
        {busy && busy !== 'gps' && (
          <span className="v-spinner" style={{ position: 'absolute', right: 16, top: 17, color: 'var(--blue)' }} />
        )}
      </div>
      <button type="button" className="v-menu-item" onClick={useGps} disabled={busy === 'gps'}>
        <span style={iconTile}>
          {busy === 'gps' ? <span className="v-spinner" /> : <NanaIcon name="Location" size={18} />}
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontWeight: 600 }}>Use my current location</span>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Your browser will ask first</span>
        </span>
      </button>
      {hits.map((s) => (
        <button key={s.place_id} type="button" className="v-menu-item" onClick={() => pick(s)} disabled={busy === 'pick'}>
          <span style={iconTile}>
            <NanaIcon name="MapPinSize20" size={18} />
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
            <span style={{ fontWeight: 600 }}>{s.main_text}</span>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>{s.secondary_text}</span>
          </span>
        </button>
      ))}
      {error && <span className="v-err" style={{ padding: '0 4px' }}>{error}</span>}
    </div>
  );
}

const iconTile: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 12,
  background: 'var(--fill)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};
