'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';

type UploadState = 'idle' | 'uploading' | 'done' | 'error';

export default function UploadPage() {
  const [state, setState] = useState<UploadState>('idle');
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setPreview(URL.createObjectURL(file));
    setState('uploading');
    setUrl(null);
    setError(null);
    setCopied(false);

    const body = new FormData();
    body.append('file', file);

    const res = await fetch('/api/upload', { method: 'POST', body });
    const json = await res.json();

    if (!res.ok) {
      setState('error');
      setError(json.error ?? 'Upload failed');
      return;
    }

    setUrl(json.url);
    setState('done');
  }

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    upload(files[0]);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    handleFiles(e.target.files);
  }

  function reset() {
    setState('idle');
    setUrl(null);
    setError(null);
    setPreview(null);
    setCopied(false);
    if (inputRef.current) inputRef.current.value = '';
  }

  function copyUrl() {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-5 pt-14 pb-5 safe-top">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Image Upload</h1>
        <p className="text-sm text-gray-400 mt-0.5">Uploads to DigitalOcean Spaces · max 10 MB</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 flex flex-col gap-4">

        {/* Preview / drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => state === 'idle' && inputRef.current?.click()}
          className={[
            'relative rounded-2xl overflow-hidden transition-colors duration-150',
            state === 'idle' ? 'active:opacity-80 cursor-pointer' : '',
            preview ? 'bg-black' : 'bg-white border-2 border-dashed',
            isDragging ? 'border-orange-400' : 'border-gray-200',
          ].join(' ')}
          style={{ minHeight: 260 }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleChange}
          />

          {/* Full image preview */}
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="preview"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: state === 'uploading' ? 0.4 : state === 'done' ? 0.6 : 0.5 }}
            />
          )}

          {/* Overlay content */}
          <div className="relative flex flex-col items-center justify-center gap-4 p-8" style={{ minHeight: 260 }}>
            {state === 'idle' && !preview && (
              <>
                <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-700 text-base">Tap to choose an image</p>
                  <p className="text-sm text-gray-400 mt-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-400">PNG · JPG · GIF · WEBP</p>
              </>
            )}

            {state === 'uploading' && (
              <div className="bg-black/50 rounded-2xl px-6 py-4 flex flex-col items-center gap-3">
                <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <p className="text-white font-semibold text-sm">Uploading…</p>
              </div>
            )}

            {state === 'done' && (
              <div className="bg-green-500/90 rounded-2xl px-6 py-4 flex flex-col items-center gap-2">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <p className="text-white font-semibold text-sm">Upload complete</p>
              </div>
            )}

            {state === 'error' && (
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <p className="font-semibold text-red-600 text-center text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* URL result card */}
        {state === 'done' && url && (
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 pt-4 pb-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">CDN URL</p>
            </div>
            <div className="px-4 pb-3">
              <p className="text-sm text-gray-700 font-mono break-all leading-relaxed">{url}</p>
            </div>
            <button
              onClick={copyUrl}
              className={[
                'w-full py-4 text-sm font-bold tracking-wide border-t border-gray-100 transition-colors active:opacity-70',
                copied ? 'text-green-600 bg-green-50' : 'text-orange-500 bg-white',
              ].join(' ')}
            >
              {copied ? '✓ Copied to clipboard' : 'Copy URL'}
            </button>
          </div>
        )}

        {/* Pick from camera / gallery explicitly on mobile */}
        {state === 'idle' && (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.removeAttribute('capture');
                  inputRef.current.click();
                }
              }}
              className="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-2xl py-5 active:bg-gray-50 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-600">Gallery</span>
            </button>
            <button
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.setAttribute('capture', 'environment');
                  inputRef.current.click();
                }
              }}
              className="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-2xl py-5 active:bg-gray-50 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>
              <span className="text-sm font-medium text-gray-600">Camera</span>
            </button>
          </div>
        )}

        {/* Reset */}
        {(state === 'done' || state === 'error') && (
          <button
            onClick={reset}
            className="w-full py-4 rounded-2xl border border-gray-200 bg-white text-sm font-semibold text-gray-500 active:bg-gray-50 transition-colors"
          >
            Upload another image
          </button>
        )}
      </div>
    </div>
  );
}
