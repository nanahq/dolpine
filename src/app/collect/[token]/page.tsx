'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';

// const API_BASE = 'https://loungingly-unconjectural-ruth.ngrok-free.dev/api/v1';
const API_BASE = 'https://api.trynanaapp.com/api/v1';

type PageState =
  | 'loading'
  | 'invalid'
  | 'ready'
  | 'locating'
  | 'submitting'
  | 'success'
  | 'already_used'
  | 'error';

interface CollectionRequest {
  requester_name: string;
  status: string;
}

interface SuccessData {
  pin: string;
  city: string;
  state: string;
}

// ── Shared primitives ─────────────────────────────────────────────────────────

function NanaWordmark() {
  return (
    <svg width="52" height="20" viewBox="0 0 52 20" fill="none">
      <text x="0" y="16" fontFamily="sans-serif" fontWeight="900" fontSize="18" fill="#469ADC">nana</text>
    </svg>
  );
}

function Spinner() {
  return (
    <div className="w-8 h-8 border-[2.5px] border-black/10 border-t-black rounded-full animate-spin" />
  );
}

function BottomButton({
  onClick,
  children,
  variant = 'primary',
}: {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
}) {
  const base = 'w-full py-[18px] rounded-2xl text-base font-bold tracking-[-0.01em] active:scale-[0.97] transition-transform';
  const styles = {
    primary: `${base} bg-black text-white`,
    ghost: `${base} bg-black/5 text-black`,
  };
  return (
    <button onClick={onClick} className={styles[variant]}>
      {children}
    </button>
  );
}

// ── Layout shell ──────────────────────────────────────────────────────────────

function Page({
  children,
  footer,
  bg = 'bg-white',
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
  bg?: string;
}) {
  return (
    <main className={`min-h-dvh flex flex-col ${bg}`}>
      {/* Top nav */}
      <nav className="flex items-center px-6 pt-12 pb-2">
        <NanaWordmark />
      </nav>

      {/* Body */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        {children}
      </div>

      {/* Footer slot */}
      {footer && (
        <div className="px-6 pb-10 space-y-3">
          {footer}
          <p className="text-center text-xs text-black/30 pt-1">
            Powered by <span className="font-semibold">Nana</span>
          </p>
        </div>
      )}
    </main>
  );
}

// ── States ────────────────────────────────────────────────────────────────────

function LoadingState() {
  return (
    <Page>
      <div className="flex flex-col items-center gap-4">
        <Spinner />
        <p className="text-sm text-black/40">Checking your link…</p>
      </div>
    </Page>
  );
}

function InvalidState() {
  return (
    <Page>
      <div className="space-y-3">
        <p className="text-xs font-semibold tracking-widest text-black/30 uppercase">Link invalid</p>
        <h1 className="text-[2rem] font-black leading-tight text-black tracking-tight">
          This link has expired
        </h1>
        <p className="text-base text-black/50 leading-relaxed">
          Ask the person who sent this to generate a new link in the Nana app.
        </p>
      </div>
    </Page>
  );
}

function AlreadyUsedState() {
  return (
    <Page bg="bg-[#F0FDF4]">
      <div className="space-y-3">
        <div className="w-12 h-12 bg-[#DCFCE7] rounded-2xl flex items-center justify-center mb-2">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-xs font-semibold tracking-widest text-green-700/60 uppercase">Done</p>
        <h1 className="text-[2rem] font-black leading-tight text-black tracking-tight">
          Location already shared
        </h1>
        <p className="text-base text-black/50 leading-relaxed">
          This link was already used. If you need to update your address, ask for a new link.
        </p>
      </div>
    </Page>
  );
}

function ReadyState({
  requestData,
  onShare,
}: {
  requestData: CollectionRequest;
  onShare: () => void;
}) {
  return (
    <Page
      footer={
        <>
          <BottomButton onClick={onShare}>Share my location</BottomButton>
          <p className="text-center text-xs text-black/35 leading-relaxed px-2">
            Only shared with{' '}
            <span className="font-semibold text-black/50">{requestData.requester_name}</span>
            {' '}to save a delivery address
          </p>
        </>
      }
    >
      <div className="space-y-4">
        {/* Icon */}
        <div className="w-14 h-14 bg-[#EBF5FF] rounded-[16px] flex items-center justify-center mb-2">
          <svg className="w-7 h-7 text-nana-blue" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.079 3.218-4.474 3.218-7.284a6.5 6.5 0 00-13 0c0 2.81 1.274 5.205 3.218 7.284a19.58 19.58 0 002.683 2.282 16.974 16.974 0 001.144.742zM12 9a2 2 0 100 4 2 2 0 000-4z" clipRule="evenodd" />
          </svg>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest text-black/30 uppercase mb-3">
            Address request
          </p>
          <h1 className="text-[2rem] font-black leading-[1.1] text-black tracking-tight">
            {requestData.requester_name} needs your location
          </h1>
        </div>

        <p className="text-base text-black/50 leading-relaxed">
          They&apos;ll use it to send a delivery to you via Nana. Your location will only be saved as a delivery address.
        </p>
      </div>
    </Page>
  );
}

function LocatingState() {
  return (
    <Page>
      <div className="space-y-5">
        {/* Animated rings */}
        <div className="relative w-14 h-14 mb-2">
          <div className="absolute inset-0 rounded-2xl bg-[#EBF5FF] animate-ping opacity-50" style={{ animationDuration: '1.5s' }} />
          <div className="relative w-14 h-14 bg-[#EBF5FF] rounded-2xl flex items-center justify-center">
            <svg className="w-7 h-7 text-nana-blue" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.079 3.218-4.474 3.218-7.284a6.5 6.5 0 00-13 0c0 2.81 1.274 5.205 3.218 7.284a19.58 19.58 0 002.683 2.282 16.974 16.974 0 001.144.742zM12 9a2 2 0 100 4 2 2 0 000-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest text-black/30 uppercase mb-3">
            Please wait
          </p>
          <h1 className="text-[2rem] font-black leading-tight text-black tracking-tight">
            Finding your location
          </h1>
        </div>

        <p className="text-base text-black/50">
          Allow location access when prompted by your browser.
        </p>
      </div>
    </Page>
  );
}

function SubmittingState() {
  return (
    <Page>
      <div className="space-y-5">
        <div className="w-14 h-14 flex items-center justify-center mb-2">
          <Spinner />
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest text-black/30 uppercase mb-3">
            Almost done
          </p>
          <h1 className="text-[2rem] font-black leading-tight text-black tracking-tight">
            Saving your address
          </h1>
        </div>

        <p className="text-base text-black/50">This will only take a moment…</p>
      </div>
    </Page>
  );
}

function SuccessState({
  successData,
  requesterName,
  onCopy,
  copied,
}: {
  successData: SuccessData;
  requesterName: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <Page
      bg="bg-white"
      footer={
        <>
          <BottomButton onClick={onCopy} variant={copied ? 'ghost' : 'primary'}>
            {copied ? '✓ Copied' : 'Copy PIN'}
          </BottomButton>
          <p className="text-center text-xs text-black/35 leading-relaxed px-2">
            {requesterName} enters this PIN in Nana to confirm your address
          </p>
        </>
      }
    >
      <div className="space-y-8">
        {/* Status */}
        <div className="space-y-3">
          <div className="w-14 h-14 bg-[#DCFCE7] rounded-2xl flex items-center justify-center">
            <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest text-black/30 uppercase mb-3">
              Location shared
            </p>
            <h1 className="text-[2rem] font-black leading-tight text-black tracking-tight">
              Share this PIN with{' '}
              <span className="text-nana-blue">{requesterName}</span>
            </h1>
          </div>

          {(successData.city || successData.state) && (
            <p className="text-sm text-black/40">
              {[successData.city, successData.state].filter(Boolean).join(', ')}
            </p>
          )}
        </div>

        {/* PIN */}
        <button
          onClick={onCopy}
          className="w-full text-left group"
          aria-label="Tap to copy PIN"
        >
          <p className="text-[4.5rem] font-black tracking-[0.15em] text-black leading-none tabular-nums select-all">
            {successData.pin}
          </p>
          <p className="text-sm text-black/30 mt-2 group-active:text-black/50 transition-colors">
            {copied ? '✓ Copied to clipboard' : 'Tap to copy'}
          </p>
        </button>
      </div>
    </Page>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <Page
      footer={<BottomButton onClick={onRetry}>Try again</BottomButton>}
    >
      <div className="space-y-3">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-2">
          <svg className="w-6 h-6 text-semantic-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-xs font-semibold tracking-widest text-black/30 uppercase">Error</p>
        <h1 className="text-[2rem] font-black leading-tight text-black tracking-tight">
          Something went wrong
        </h1>
        <p className="text-base text-black/50 leading-relaxed">{message}</p>
      </div>
    </Page>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function CollectPage() {
  const { token } = useParams<{ token: string }>();
  const [state, setState] = useState<PageState>('loading');
  const [requestData, setRequestData] = useState<CollectionRequest | null>(null);
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE}/addresses/collection-request/${token}`)
      .then((r) => r.json())
      .then((res) => {
        if (!res.success || !res.data?.valid) {
          setState('invalid');
          return;
        }
        if (res.data.status === 'collected') {
          setState('already_used');
          return;
        }
        setRequestData({
          requester_name: res.data.requester_name || 'Someone',
          status: res.data.status,
        });
        setState('ready');
      })
      .catch(() => setState('invalid'));
  }, [token]);

  const handleShareLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setErrorMessage('Your browser does not support location access.');
      setState('error');
      return;
    }

    setState('locating');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setState('submitting');

        try {
          const geoRes = await fetch(`${API_BASE}/location/reverse-geocode-google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude }),
          });
          const geoData = await geoRes.json();

          const addressLine1 =
            geoData?.formatted_address ||
            `${geoData?.street_number || ''} ${geoData?.street || ''}`.trim() ||
            `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

          const submitRes = await fetch(
            `${API_BASE}/addresses/collection-request/${token}/submit`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                latitude,
                longitude,
                address_line_1: addressLine1,
                city: geoData?.city || geoData?.subregion || '',
                state: geoData?.state || '',
                country: geoData?.country || 'Nigeria',
              }),
            },
          );

          const submitData = await submitRes.json();

          if (!submitRes.ok || !submitData.success) {
            if (submitRes.status === 409) {
              setState('already_used');
            } else {
              setErrorMessage(submitData?.message || 'Something went wrong. Please try again.');
              setState('error');
            }
            return;
          }

          setSuccessData({
            pin: submitData.data.pin,
            city: submitData.data.address?.city || '',
            state: submitData.data.address?.state || '',
          });
          setState('success');
        } catch {
          setErrorMessage('Failed to submit your location. Please check your connection and try again.');
          setState('error');
        }
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setErrorMessage('Location access was denied. Please allow location access in your browser settings and try again.');
        } else {
          setErrorMessage('Could not get your location. Please try again.');
        }
        setState('error');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  }, [token]);

  const copyPin = useCallback(() => {
    if (!successData?.pin) return;
    navigator.clipboard.writeText(successData.pin).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [successData]);

  if (state === 'loading') return <LoadingState />;
  if (state === 'invalid') return <InvalidState />;
  if (state === 'already_used') return <AlreadyUsedState />;
  if (state === 'locating') return <LocatingState />;
  if (state === 'submitting') return <SubmittingState />;
  if (state === 'ready' && requestData) return <ReadyState requestData={requestData} onShare={handleShareLocation} />;
  if (state === 'success' && successData) return (
    <SuccessState
      successData={successData}
      requesterName={requestData?.requester_name || 'them'}
      onCopy={copyPin}
      copied={copied}
    />
  );
  if (state === 'error') return <ErrorState message={errorMessage} onRetry={() => setState('ready')} />;

  return null;
}
