'use client';

import { useState, useEffect, useCallback } from 'react';

const CORRECT_PASSWORD = 'coiep2026';
const COOKIE_NAME = 'presentation_auth';
const COOKIE_DAYS = 7;

function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/presentation`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Fruition Logo Component
const FruitionLogo = ({ width = 140 }: { width?: number }) => (
  <svg width={width} height={width * 0.245} viewBox="0 0 208 51" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="7.12349" cy="43.7532" rx="7.12349" ry="7.14285" fill="white"/>
    <path d="M7.17408 18.7168C3.21195 18.7168 0 21.9124 0 25.8544V36.1908C1.40475 34.2546 3.70892 32.9921 6.31319 32.9921H20.0874C24.0496 32.9921 27.2615 29.7964 27.2615 25.8544C27.2615 25.8397 27.2615 25.825 27.2614 25.8102L27.2615 18.7168H7.17408Z" fill="white"/>
    <path d="M7.1432 0.896484C3.19812 0.896484 0 4.09212 0 8.03413V18.3705C1.3987 16.4343 3.69296 15.1718 6.28602 15.1718H28.5728C32.5179 15.1718 35.716 11.9761 35.716 8.03413C35.716 8.01938 35.716 8.00464 35.7159 7.98991L35.716 0.896484H7.1432Z" fill="white"/>
    <path d="M203.696 25.9782C205.712 25.9782 207.337 24.3476 207.337 22.3343C207.337 20.3211 205.708 18.6904 203.696 18.6904C201.684 18.6904 200.054 20.3211 200.054 22.3343C200.054 24.3476 201.684 25.9782 203.696 25.9782ZM203.696 25.0171C202.216 25.0171 201.019 23.8146 201.019 22.3343C201.019 20.854 202.216 19.6515 203.696 19.6515C205.18 19.6515 206.377 20.854 206.377 22.3343C206.377 23.8192 205.18 25.0171 203.696 25.0171ZM202.38 23.9741H203.254V22.8445H203.814L204.333 23.9741H205.289L204.652 22.6805C204.975 22.4983 205.189 22.1749 205.189 21.724C205.189 21.018 204.661 20.6126 204.023 20.6126H202.38V23.9741ZM203.254 22.2113V21.2594H203.805C204.051 21.2594 204.269 21.3915 204.269 21.724C204.269 22.0474 204.055 22.2113 203.8 22.2113H203.254Z" fill="white"/>
    <path d="M46.4522 37.299H58.8826V30.6327H46.4522V24.3997H62.2967V17.7334H38.542V50.4148H46.4522V37.299Z" fill="white"/>
    <path d="M70.0512 30.4643L69.8107 27.3116H62.6699V50.4148H70.2435V39.2964C70.2435 34.9886 72.6719 33.4244 75.533 33.4244C76.4948 33.4244 77.4805 33.5928 78.4423 33.9297L78.8991 27.3116C77.9374 26.9988 76.9997 26.8303 76.086 26.8303C73.4172 26.8303 71.1331 28.178 70.0512 30.4643Z" fill="white"/>
    <path d="M95.6697 27.3116V40.1869C95.6697 42.4972 94.1791 43.9893 91.919 43.9893C89.9234 43.9893 88.4087 42.4731 88.4087 40.1869V27.3116H80.8351V40.9088C80.8351 46.6365 85.0907 50.8962 91.919 50.8962C98.7473 50.8962 103.243 46.6365 103.243 40.7644V27.3116H95.6697Z" fill="white"/>
    <path d="M114.7 27.3116H107.127V50.4148H114.7V27.3116ZM110.878 24.3515C113.33 24.3515 115.061 22.6669 115.061 20.2122C115.061 17.7334 113.33 16.0488 110.878 16.0488C108.425 16.0488 106.742 17.7575 106.742 20.2122C106.742 22.6669 108.449 24.3515 110.878 24.3515Z" fill="white"/>
    <path d="M134.669 33.4966V27.3116H128.153V19.8994H120.82V27.3116H117.141V33.4966H120.82V42.1843C120.82 48.3452 124.643 50.8962 129.932 50.8962C131.856 50.8962 134.38 50.463 136.063 49.8373L135.534 43.6764C131.88 44.5428 128.394 44.8797 128.394 40.957V33.4966H134.669Z" fill="white"/>
    <path d="M145.886 27.3116H138.312V50.4148H145.886V27.3116ZM142.063 24.3515C144.515 24.3515 146.246 22.6669 146.246 20.2122C146.246 17.7334 144.515 16.0488 142.063 16.0488C139.61 16.0488 137.927 17.7575 137.927 20.2122C137.927 22.6669 139.634 24.3515 142.063 24.3515Z" fill="white"/>
    <path d="M161.358 26.8303C154.217 26.8303 148.952 31.9804 148.952 38.8632C148.952 45.7461 154.217 50.8962 161.358 50.8962C168.499 50.8962 173.764 45.7461 173.764 38.8632C173.764 31.9804 168.499 26.8303 161.358 26.8303ZM161.358 33.5447C164.243 33.5447 166.263 35.7347 166.263 38.8632C166.263 41.9918 164.243 44.1818 161.358 44.1818C158.473 44.1818 156.453 41.9918 156.453 38.8632C156.453 35.7347 158.473 33.5447 161.358 33.5447Z" fill="white"/>
    <path d="M199.671 50.4148V35.3978C199.671 29.8867 195.488 26.8303 191.136 26.8303C188.419 26.8303 185.63 27.6726 183.995 29.7423L183.755 27.3116H176.806V50.4148H184.38V37.5637C184.38 34.9886 186.327 33.7613 188.227 33.7613C190.054 33.7613 192.098 34.9886 192.098 37.5637V50.4148H199.671Z" fill="white"/>
  </svg>
);

// SVG Icons for professional look
const Icons = {
  clock: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  book: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  lock: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  chart: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  dollar: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  trophy: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
  sparkle: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
  edit: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  target: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  refresh: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>,
  shield: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  users: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  message: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  clipboard: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>,
  check: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  search: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  tool: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  cloud: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  zap: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  link: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  upload: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  school: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  family: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="3"/><path d="M12 8v4"/><circle cx="6" cy="17" r="2"/><circle cx="18" cy="17" r="2"/><path d="M6 15v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/></svg>,
  building: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>,
  cpu: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  folder: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  trending: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
};

export default function PresentationPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 12;

  useEffect(() => {
    const auth = getCookie(COOKIE_NAME);
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setCookie(COOKIE_NAME, 'true', COOKIE_DAYS);
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const showSlide = useCallback((n: number) => {
    let newSlide = n;
    if (n > totalSlides) newSlide = 1;
    if (n < 1) newSlide = totalSlides;
    setCurrentSlide(newSlide);
  }, [totalSlides]);

  const nextSlide = useCallback(() => showSlide(currentSlide + 1), [currentSlide, showSlide]);
  const prevSlide = useCallback(() => showSlide(currentSlide - 1), [currentSlide, showSlide]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated, nextSlide, prevSlide]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0A3161',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: '#FFFFFF', fontFamily: 'Georgia, serif' }}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A3161 0%, #0d4a8a 50%, #0A3161 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
      }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '48px',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        }}>
          <div style={{
            marginBottom: '24px',
            fontSize: '2.5rem',
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
          }}>
            <span style={{ color: '#A67C52' }}>Co</span>
            <span style={{ color: '#0A3161' }}>IEP</span>
          </div>
          <h1 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#333333',
            marginBottom: '8px',
            fontFamily: 'Georgia, serif',
          }}>
            Progress Presentation
          </h1>
          <p style={{
            color: '#666666',
            marginBottom: '32px',
            fontSize: '0.95rem',
          }}>
            Enter password to view
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '1rem',
                border: '2px solid #E5E5E5',
                borderRadius: '8px',
                background: '#F9F9F9',
                color: '#333333',
                outline: 'none',
                marginBottom: '16px',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#A67C52'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'}
              autoFocus
            />
            {error && (
              <p style={{ color: '#DC3545', marginBottom: '16px', fontSize: '0.9rem' }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px 24px',
                fontSize: '1rem',
                fontWeight: 600,
                background: '#0A3161',
                border: 'none',
                borderRadius: '8px',
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#0d4a8a'}
              onMouseOut={(e) => e.currentTarget.style.background = '#0A3161'}
            >
              View Presentation
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, -apple-system, BlinkMacSystemFont, sans-serif; background: #0A3161; color: #333333; overflow: hidden; }
        .slide-container { width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; }
        .slide { display: none; width: 100%; height: 100%; padding: 60px 80px; animation: fadeIn 0.5s ease-in-out; }
        .slide.active { display: flex; flex-direction: column; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .title-slide { justify-content: center; align-items: center; text-align: center; background: linear-gradient(135deg, #0A3161 0%, #0d4a8a 50%, #0A3161 100%); color: #FFFFFF; }
        .title-slide h1 { font-size: 4rem; font-weight: 700; margin-bottom: 20px; font-family: Georgia, serif; color: #FFFFFF; }
        .title-slide h2 { font-size: 2rem; font-weight: 400; color: rgba(255,255,255,0.85); margin-bottom: 40px; }
        .title-slide .subtitle { font-size: 1.2rem; color: rgba(255,255,255,0.7); }

        .logo-text { font-size: 5rem; font-weight: 700; font-family: Georgia, serif; margin-bottom: 20px; }
        .logo-co { color: #A67C52; }
        .logo-iep { color: #FFFFFF; }

        .content-slide { background: #F2F2F2; color: #333333; }
        .slide-header { margin-bottom: 40px; }
        .slide-header h2 { font-size: 2.5rem; font-weight: 600; color: #0A3161; margin-bottom: 10px; font-family: Georgia, serif; }
        .slide-header .accent-bar { width: 80px; height: 4px; background: #A67C52; border-radius: 2px; }

        .content-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; flex: 1; }
        .content-grid.three-col { grid-template-columns: repeat(3, 1fr); }

        .card { background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 12px; padding: 28px; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1); }
        .card-icon { width: 52px; height: 52px; background: #0A3161; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; color: #FFFFFF; }
        .card-icon.accent { background: #A67C52; }
        .card h3 { font-size: 1.2rem; font-weight: 600; margin-bottom: 10px; color: #0A3161; font-family: Georgia, serif; }
        .card p { color: #555555; line-height: 1.6; font-size: 0.95rem; }
        .card ul { list-style: none; color: #555555; }
        .card ul li { padding: 6px 0; padding-left: 22px; position: relative; line-height: 1.5; font-size: 0.95rem; }
        .card ul li::before { content: ""; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 6px; height: 6px; background: #A67C52; border-radius: 50%; }

        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 40px; }
        .stat-card { background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 12px; padding: 28px; text-align: center; }
        .stat-number { font-size: 3rem; font-weight: 700; color: #0A3161; margin-bottom: 8px; font-family: Georgia, serif; }
        .stat-number.accent { color: #A67C52; }
        .stat-label { color: #555555; font-size: 0.95rem; }

        .timeline { display: flex; justify-content: space-between; position: relative; margin-top: 40px; }
        .timeline::before { content: ""; position: absolute; top: 30px; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #A67C52 0%, #A67C52 75%, #0A3161 75%, #0A3161 100%); border-radius: 2px; }
        .timeline-item { text-align: center; flex: 1; position: relative; }
        .timeline-dot { width: 24px; height: 24px; background: #A67C52; border-radius: 50%; margin: 0 auto 20px; position: relative; z-index: 1; border: 4px solid #F2F2F2; }
        .timeline-dot.current { background: #0A3161; box-shadow: 0 0 20px rgba(10, 49, 97, 0.4); }
        .timeline-dot.future { background: #CCCCCC; }
        .timeline-date { font-size: 0.85rem; color: #888888; margin-bottom: 6px; }
        .timeline-title { font-weight: 600; color: #0A3161; margin-bottom: 4px; font-family: Georgia, serif; }
        .timeline-desc { font-size: 0.8rem; color: #666666; }

        .agent-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .agent-card { background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 10px; padding: 18px; text-align: center; }
        .agent-card .icon { margin-bottom: 10px; display: flex; justify-content: center; color: #0A3161; }
        .agent-card h4 { font-size: 0.95rem; font-weight: 600; color: #0A3161; margin-bottom: 6px; font-family: Georgia, serif; }
        .agent-card p { font-size: 0.8rem; color: #666666; }
        .status-badge { display: inline-block; padding: 4px 10px; background: rgba(166, 124, 82, 0.15); color: #A67C52; border-radius: 16px; font-size: 0.7rem; font-weight: 600; margin-top: 8px; text-transform: uppercase; }

        .quote-section { background: #FFFFFF; border-left: 4px solid #A67C52; padding: 28px 36px; border-radius: 0 12px 12px 0; margin: 30px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .quote-text { font-size: 1.3rem; font-style: italic; color: #333333; line-height: 1.6; margin-bottom: 14px; font-family: Georgia, serif; }
        .quote-author { color: #888888; font-size: 0.95rem; }

        .nav-controls { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); display: flex; gap: 20px; align-items: center; z-index: 100; background: rgba(255,255,255,0.95); padding: 12px 24px; border-radius: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        .nav-btn { background: #0A3161; border: none; color: #FFFFFF; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 0.9rem; font-weight: 500; transition: all 0.2s ease; }
        .nav-btn:hover { background: #0d4a8a; }
        .slide-counter { color: #666666; font-size: 0.9rem; min-width: 60px; text-align: center; }
        .progress-bar { position: fixed; top: 0; left: 0; height: 4px; background: #A67C52; transition: width 0.3s ease; z-index: 1000; }

        .feature-list { display: flex; flex-direction: column; gap: 14px; }
        .feature-item { display: flex; align-items: flex-start; gap: 14px; padding: 14px; background: #F9F9F9; border-radius: 10px; border: 1px solid #E5E5E5; }
        .feature-icon { width: 36px; height: 36px; background: #A67C52; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #FFFFFF; }
        .feature-content h4 { color: #0A3161; margin-bottom: 4px; font-size: 1rem; font-family: Georgia, serif; }
        .feature-content p { color: #666666; font-size: 0.85rem; }

        .impact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .impact-card { background: #FFFFFF; border: 2px solid #0A3161; border-radius: 12px; padding: 28px; text-align: center; }
        .impact-card .number { font-size: 2.8rem; font-weight: 700; color: #0A3161; margin-bottom: 8px; font-family: Georgia, serif; }
        .impact-card .label { color: #555555; font-size: 1rem; }

        .two-column { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; flex: 1; }
        .column h3 { font-size: 1.4rem; font-weight: 600; color: #0A3161; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #A67C52; font-family: Georgia, serif; }

        .cta-section { text-align: center; padding: 50px; background: #FFFFFF; border-radius: 16px; margin-top: 30px; border: 2px solid #A67C52; }
        .cta-section h3 { font-size: 1.8rem; margin-bottom: 14px; color: #0A3161; font-family: Georgia, serif; }
        .cta-section p { color: #555555; font-size: 1.1rem; max-width: 600px; margin: 0 auto; }

        .built-by { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 30px; color: rgba(255,255,255,0.7); font-size: 1rem; }

        .value-highlight { background: linear-gradient(135deg, #0A3161 0%, #0d4a8a 100%); color: #FFFFFF; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 30px; }
        .value-highlight .big-number { font-size: 3.5rem; font-weight: 700; font-family: Georgia, serif; }
        .value-highlight .label { font-size: 1.1rem; opacity: 0.9; margin-top: 8px; }

        .fruition-logo { opacity: 0.9; }
      `}</style>

      <div className="progress-bar" style={{ width: `${(currentSlide / totalSlides) * 100}%` }} />

      <div className="slide-container">
        {/* Slide 1: Title */}
        <div className={`slide title-slide ${currentSlide === 1 ? 'active' : ''}`}>
          <div className="logo-text">
            <span className="logo-co">Co</span>
            <span className="logo-iep">IEP</span>
          </div>
          <h2>Collaborative Individualized Education Program Platform</h2>
          <p className="subtitle">Progress Report &amp; Investment Impact<br />University of Wyoming | February 2026</p>
          <div className="built-by">
            <span>Built by</span>
            <FruitionLogo width={120} />
            <span style={{ marginLeft: '4px' }}>Denver, Colorado</span>
          </div>
        </div>

        {/* Slide 2: Executive Summary */}
        <div className={`slide content-slide ${currentSlide === 2 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Executive Summary</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">9</div>
              <div className="stat-label">AI Agents Built</div>
            </div>
            <div className="stat-card">
              <div className="stat-number accent">50</div>
              <div className="stat-label">States Supported</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">300+</div>
              <div className="stat-label">Development Hours</div>
            </div>
            <div className="stat-card">
              <div className="stat-number accent">100%</div>
              <div className="stat-label">Production Ready</div>
            </div>
          </div>
          <div className="quote-section">
            <p className="quote-text">&ldquo;CoIEP represents a transformative approach to IEP development, combining the expertise of special education professionals with the power of AI to create better outcomes for students with disabilities.&rdquo;</p>
            <p className="quote-author">PLACEHOLDER</p>
          </div>
        </div>

        {/* Slide 3: Investment Value */}
        <div className={`slide content-slide ${currentSlide === 3 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Exceptional Investment Value</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="number">300+</div>
              <div className="label">Hours of Expert Development</div>
            </div>
            <div className="impact-card">
              <div className="number" style={{ color: '#A67C52' }}>&lt;$50</div>
              <div className="label">Effective Hourly Rate</div>
            </div>
            <div className="impact-card">
              <div className="number">$150K+</div>
              <div className="label">Market Value Delivered</div>
            </div>
          </div>
          <div className="two-column" style={{ marginTop: '30px' }}>
            <div className="card">
              <div className="card-icon accent">{Icons.dollar}</div>
              <h3>Discounted Partnership Rate</h3>
              <p>As a mission-driven project with the University of Wyoming, Fruition provided significantly discounted rates&mdash;delivering enterprise-grade software at a fraction of typical development costs.</p>
            </div>
            <div className="card">
              <div className="card-icon">{Icons.trophy}</div>
              <h3>Enterprise-Quality Platform</h3>
              <p>Built with the same technologies and standards used by Fortune 500 companies. Production-ready, scalable, and secure from day one.</p>
            </div>
          </div>
        </div>

        {/* Slide 4: The Challenge */}
        <div className={`slide content-slide ${currentSlide === 4 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>The Challenge We&apos;re Addressing</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="content-grid">
            <div className="card">
              <div className="card-icon">{Icons.clock}</div>
              <h3>Time-Intensive Process</h3>
              <p>Creating quality IEPs requires significant time investment from educators who are already stretched thin. Teachers spend hours on documentation instead of instruction.</p>
            </div>
            <div className="card">
              <div className="card-icon accent">{Icons.book}</div>
              <h3>Training Gap</h3>
              <p>Pre-service teachers lack exposure to real-world IEP examples. Limited access to quality training materials hinders professional development.</p>
            </div>
            <div className="card">
              <div className="card-icon">{Icons.lock}</div>
              <h3>Privacy Constraints</h3>
              <p>Working with real student data creates privacy concerns. Training with anonymous data while maintaining authenticity is challenging.</p>
            </div>
            <div className="card">
              <div className="card-icon accent">{Icons.chart}</div>
              <h3>Quality Consistency</h3>
              <p>IEP quality varies significantly across districts and educators. No standardized way to evaluate and improve IEP components.</p>
            </div>
          </div>
        </div>

        {/* Slide 5: Our Solution */}
        <div className={`slide content-slide ${currentSlide === 5 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>The CoIEP Solution</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="two-column">
            <div className="column">
              <h3>AI-Powered Assistance</h3>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">{Icons.sparkle}</div>
                  <div className="feature-content">
                    <h4>Intelligent Document Generation</h4>
                    <p>AI agents create high-quality IEP components based on student needs and state standards</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">{Icons.edit}</div>
                  <div className="feature-content">
                    <h4>Automated Evaluation</h4>
                    <p>Real-time feedback on IEP quality with specific recommendations for improvement</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">{Icons.target}</div>
                  <div className="feature-content">
                    <h4>All 50 States Supported</h4>
                    <p>Standards database ready for all US states with Kansas, New Jersey, and Wyoming fully imported</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <h3>User-Centered Design</h3>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">{Icons.refresh}</div>
                  <div className="feature-content">
                    <h4>Seamless Workflow</h4>
                    <p>Intuitive step-by-step process guides users through IEP creation</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">{Icons.shield}</div>
                  <div className="feature-content">
                    <h4>Privacy First</h4>
                    <p>FERPA-ready architecture with anonymous data mode for training</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">{Icons.users}</div>
                  <div className="feature-content">
                    <h4>Parent Sharing</h4>
                    <p>Secure shareable links allow parents to view IEP progress without platform access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 6: AI Agents */}
        <div className={`slide content-slide ${currentSlide === 6 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>9 Specialized AI Agents</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="agent-grid">
            <div className="agent-card">
              <div className="icon">{Icons.message}</div>
              <h4>General Chat</h4>
              <p>Context-aware assistant</p>
              <span className="status-badge">Operational</span>
            </div>
            <div className="agent-card">
              <div className="icon">{Icons.clipboard}</div>
              <h4>PLAAFP Writer</h4>
              <p>Present Levels generation</p>
              <span className="status-badge">Operational</span>
            </div>
            <div className="agent-card">
              <div className="icon">{Icons.check}</div>
              <h4>PLAAFP Evaluator</h4>
              <p>Reviews &amp; feedback</p>
              <span className="status-badge">Operational</span>
            </div>
            <div className="agent-card">
              <div className="icon">{Icons.target}</div>
              <h4>Goals Writer</h4>
              <p>SMART IEP goals</p>
              <span className="status-badge">Operational</span>
            </div>
            <div className="agent-card">
              <div className="icon">{Icons.chart}</div>
              <h4>Goals Evaluator</h4>
              <p>6-dimension assessment</p>
              <span className="status-badge">Operational</span>
            </div>
            <div className="agent-card">
              <div className="icon">{Icons.edit}</div>
              <h4>SDI Writer</h4>
              <p>Specialized instruction</p>
              <span className="status-badge">Operational</span>
            </div>
            <div className="agent-card">
              <div className="icon">{Icons.search}</div>
              <h4>SDI Evaluator</h4>
              <p>Instruction review</p>
              <span className="status-badge">Operational</span>
            </div>
            <div className="agent-card">
              <div className="icon">{Icons.tool}</div>
              <h4>SAS Writer</h4>
              <p>Aids &amp; Services</p>
              <span className="status-badge">Operational</span>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '24px', color: '#666666' }}>+ SAS Evaluator &amp; Case Manager completing the comprehensive IEP workflow</p>
        </div>

        {/* Slide 7: Scalability & Architecture */}
        <div className={`slide content-slide ${currentSlide === 7 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Built for Scale</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="value-highlight">
            <div className="big-number">100,000+</div>
            <div className="label">Users Supported with Auto-Scaling Architecture</div>
          </div>
          <div className="content-grid three-col">
            <div className="card">
              <div className="card-icon">{Icons.cloud}</div>
              <h3>Kubernetes Infrastructure</h3>
              <ul>
                <li>Runs on enterprise Kubernetes (K8s)</li>
                <li>Auto-scaling pods for demand</li>
                <li>Zero-downtime deployments</li>
                <li>Self-healing architecture</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon accent">{Icons.zap}</div>
              <h3>Burst Capacity</h3>
              <ul>
                <li>Handles semester start surges</li>
                <li>IEP deadline peak periods</li>
                <li>Training cohort onboarding</li>
                <li>Scales to meet demand</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon">{Icons.lock}</div>
              <h3>Enterprise Security</h3>
              <ul>
                <li>Multi-tenant data isolation</li>
                <li>FERPA-ready architecture</li>
                <li>Encrypted data at rest</li>
                <li>Role-based access control</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Slide 8: Integration Capabilities */}
        <div className={`slide content-slide ${currentSlide === 8 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Integration &amp; Interoperability</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="content-grid">
            <div className="card">
              <div className="card-icon">{Icons.link}</div>
              <h3>Public REST API</h3>
              <ul>
                <li>API key authentication</li>
                <li>Student roster sync from SIS</li>
                <li>IEP import/export capabilities</li>
                <li>Webhook event notifications</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon accent">{Icons.upload}</div>
              <h3>Export Formats</h3>
              <ul>
                <li>JSON for system integration</li>
                <li>XML for legacy systems</li>
                <li>CSV for reporting</li>
                <li>PDF for documentation</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon">{Icons.school}</div>
              <h3>Platform Integration</h3>
              <ul>
                <li>Student Information Systems</li>
                <li>Learning Management Systems</li>
                <li>Frontline, PowerSchool ready</li>
                <li>District portal embedding</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon accent">{Icons.family}</div>
              <h3>Parent Engagement</h3>
              <ul>
                <li>Secure shareable links</li>
                <li>Time-limited access tokens</li>
                <li>No login required for parents</li>
                <li>Progress visibility</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Slide 9: Technical Stack */}
        <div className={`slide content-slide ${currentSlide === 9 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Enterprise Technology Stack</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="content-grid">
            <div className="card">
              <div className="card-icon">{Icons.building}</div>
              <h3>Modern Architecture</h3>
              <ul>
                <li>Next.js 15 Frontend (React)</li>
                <li>NestJS 11 Backend API</li>
                <li>PostgreSQL with Prisma ORM</li>
                <li>Redis caching layer</li>
                <li>Docker containerization</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon accent">{Icons.cpu}</div>
              <h3>AI Integration</h3>
              <ul>
                <li>OpenAI GPT-4 integration</li>
                <li>Pinecone vector database</li>
                <li>Evidence-based practice search</li>
                <li>Real-time streaming (SSE)</li>
                <li>Multi-agent orchestration</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon">{Icons.folder}</div>
              <h3>Document Processing</h3>
              <ul>
                <li>PDF extraction &amp; analysis</li>
                <li>Word document support</li>
                <li>Image OCR capabilities</li>
                <li>MDT report imports</li>
                <li>Up to 10MB file size</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon accent">{Icons.chart}</div>
              <h3>State Standards</h3>
              <ul>
                <li>All 50 states in database</li>
                <li>Grade-level targeting</li>
                <li>Subject categorization</li>
                <li>Version history tracking</li>
                <li>Automated alignment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Slide 10: Development Timeline */}
        <div className={`slide content-slide ${currentSlide === 10 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Development Journey</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="timeline" style={{ marginTop: '50px' }}>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Apr 2025</div>
              <div className="timeline-title">Project Kickoff</div>
              <div className="timeline-desc">Discovery &amp; Architecture</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Jun 2025</div>
              <div className="timeline-title">Core Platform</div>
              <div className="timeline-desc">Auth, Sessions, UI</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Aug 2025</div>
              <div className="timeline-title">AI Integration</div>
              <div className="timeline-desc">All 9 Agents Deployed</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Oct 2025</div>
              <div className="timeline-title">50-State Support</div>
              <div className="timeline-desc">Standards Database</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot current"></div>
              <div className="timeline-date">Feb 2026</div>
              <div className="timeline-title">Demo Ready</div>
              <div className="timeline-desc">Production Stable</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot future"></div>
              <div className="timeline-date">2026+</div>
              <div className="timeline-title">Expansion</div>
              <div className="timeline-desc">Scale &amp; Features</div>
            </div>
          </div>
          <div style={{ marginTop: '60px', textAlign: 'center' }}>
            <p style={{ color: '#555555', fontSize: '1.1rem' }}>Total Development: <span style={{ color: '#0A3161', fontWeight: 700 }}>300+ hours</span> &bull; Built by <span style={{ color: '#A67C52', fontWeight: 700 }}>Fruition</span> (Denver, CO)</p>
          </div>
        </div>

        {/* Slide 11: Impact & Value */}
        <div className={`slide content-slide ${currentSlide === 11 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Impact &amp; Future</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="impact-grid" style={{ marginBottom: '30px' }}>
            <div className="impact-card">
              <div className="number">50%</div>
              <div className="label">Reduction in IEP creation time</div>
            </div>
            <div className="impact-card">
              <div className="number" style={{ color: '#A67C52', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>{Icons.trending}</div>
              <div className="label">Scalability for growth</div>
            </div>
            <div className="impact-card">
              <div className="number">24/7</div>
              <div className="label">AI assistance availability</div>
            </div>
          </div>
          <div className="two-column">
            <div className="card">
              <h3>For Pre-Service Teachers</h3>
              <ul>
                <li>Practice with realistic anonymous cases</li>
                <li>Receive immediate AI feedback</li>
                <li>Learn from exemplary IEP examples</li>
                <li>Build confidence before classrooms</li>
              </ul>
            </div>
            <div className="card">
              <h3>For In-Service Teachers</h3>
              <ul>
                <li>Evaluate and improve existing IEPs</li>
                <li>Access evidence-based practices</li>
                <li>Share progress with parents easily</li>
                <li>Integrate with existing systems</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Slide 12: Demo & Thank You */}
        <div className={`slide title-slide ${currentSlide === 12 ? 'active' : ''}`}>
          <div className="logo-text">
            <span className="logo-co">Co</span>
            <span className="logo-iep">IEP</span>
          </div>
          <h1 style={{ fontSize: '3rem' }}>Ready for Demonstration</h1>
          <h2>Production-ready and available for live demo</h2>
          <div style={{ marginTop: '30px' }}>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.2rem', marginBottom: '16px' }}>
              Production: <a href="https://app.coiep.com" style={{ color: '#A67C52', fontWeight: 600, textDecoration: 'none' }}>app.coiep.com</a>
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>
              Your investment has built a scalable, AI-powered platform<br />
              that will transform IEP development and educator training.
            </p>
          </div>
          <div className="cta-section" style={{ marginTop: '40px', padding: '36px', maxWidth: '700px', background: 'rgba(255,255,255,0.95)' }}>
            <h3>Thank You for Your Support</h3>
            <p style={{ marginTop: '12px' }}>Your continued investment will help us expand to more states,<br />add advanced features, and impact more students&apos; lives.</p>
          </div>
          <div className="built-by" style={{ marginTop: '40px' }}>
            <span>Built by</span>
            <FruitionLogo width={100} />
            <span style={{ marginLeft: '4px' }}>Denver, Colorado</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="nav-controls">
        <button className="nav-btn" onClick={prevSlide} type="button">&larr; Previous</button>
        <span className="slide-counter">{currentSlide} / {totalSlides}</span>
        <button className="nav-btn" onClick={nextSlide} type="button">Next &rarr;</button>
      </div>
    </>
  );
}
