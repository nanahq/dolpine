import { apiGet } from './config';

export type AmbassadorInvite = {
  first_name: string | null;
  code: string;
  /** The referee gets free delivery on their first order. */
  free_delivery: boolean;
};

/** Null for an unknown or paused code, or with the program off: the page then shows plain /download. */
export async function getAmbassadorInvite(code: string): Promise<AmbassadorInvite | null> {
  if (!/^[A-Za-z0-9]{3,20}$/.test(code)) return null;
  // Short window so pausing an ambassador takes effect within a minute.
  return apiGet<AmbassadorInvite>(`a/${encodeURIComponent(code)}`, { revalidate: 60 });
}
