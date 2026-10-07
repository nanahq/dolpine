import { api } from '../api/client';

/** Where the order goes. Only ever built from a geocoded place, so it always has coordinates. */
export interface DeliveryAddress {
  /** Short line for the header pill, e.g. "14 Zoo Road". */
  label: string;
  /** Full formatted address. */
  line: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  /** Google could only place a street or area, so the rider needs a landmark. */
  approximate: boolean;
}

export interface PlaceSuggestion {
  place_id: string;
  description: string;
  main_text: string;
  secondary_text: string;
}

interface PlaceDetails {
  latitude: number;
  longitude: number;
  address_line_1: string;
  city: string;
  state: string;
  formatted_address: string;
  precision?: 'exact' | 'approximate';
}

interface ReverseGeocode {
  formatted_address: string;
  city?: string;
  state?: string;
}

/** Google bills autocomplete per session, so keystrokes and the final pick share one token. */
export function newPlacesSession(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now());
}

export function searchPlaces(query: string, session: string, signal?: AbortSignal) {
  return api<PlaceSuggestion[]>('location/places-autocomplete', { query: { query, session_token: session }, signal });
}

export async function resolvePlace(s: PlaceSuggestion, session: string): Promise<DeliveryAddress> {
  const d = await api<PlaceDetails>('location/place-details', { query: { place_id: s.place_id, session_token: session } });
  return {
    label: s.main_text || d.address_line_1,
    line: d.formatted_address || s.description,
    city: d.city,
    state: d.state,
    lat: d.latitude,
    lng: d.longitude,
    approximate: d.precision === 'approximate',
  };
}

export function currentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error('unsupported'));
    navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 12_000 });
  });
}

export async function addressFromCoords(lat: number, lng: number): Promise<DeliveryAddress> {
  const g = await api<ReverseGeocode>('location/reverse-geocode-google', {
    method: 'POST',
    body: { latitude: lat, longitude: lng },
  });
  const line = g.formatted_address;
  return {
    label: line.split(',')[0]?.trim() || 'Current location',
    line,
    city: g.city ?? '',
    state: g.state ?? '',
    lat,
    lng,
    // A GPS fix lands on the right building but not the right gate.
    approximate: true,
  };
}

/** Straight-line km, good enough to sort stores by nearness. */
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
