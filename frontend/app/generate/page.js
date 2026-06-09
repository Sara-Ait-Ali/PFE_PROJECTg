'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { submitTMYJob } from '@/lib/api';

const MapPicker = dynamic(() => import('@/components/MapPicker'), { ssr: false });

export default function GeneratePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    site_name: '',
    latitude: '',
    longitude: '',
    start_year: 2005,
    end_year: 2024,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      router.push('/login');
    }
  }, []);

  const handleMapClick = async (lat, lon) => {
    setForm({ ...form, latitude: lat.toFixed(6), longitude: lon.toFixed(6) });
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await res.json();
      const city = data.address?.city || data.address?.town || data.address?.village || '';
      const country = data.address?.country || '';
      if (city || country) {
        setForm((prev) => ({
          ...prev,
          latitude: lat.toFixed(6),
          longitude: lon.toFixed(6),
          site_name: `${city}${city && country ? '-' : ''}${country}`,
        }));
      }
    } catch (e) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await submitTMYJob({
        ...form,
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
        start_year: parseInt(form.start_year),
        end_year: parseInt(form.end_year),
      });
      router.push(`/status?job_id=${res.data.job_id}`);
    } catch (err) {
      setError('Failed to submit job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)' }}>

      {/* NAVBAR */}
      <nav style={{ background: 'white', borderBottom: '1px solid #bbf7d0', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 8px rgba(22,163,74,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Back arrow */}
          <button
            onClick={() => router.back()}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontWeight: 600, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: '8px', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#f0fdf4'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </button>
          <div style={{ width: '1px', height: '24px', background: '#bbf7d0' }}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #16a34a, #4ade80)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '16px' }}>☀️</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: '18px', color: '#15803d' }}>TMY Generator</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => router.push('/jobs')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontWeight: 500, fontSize: '14px', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer' }}
          >
            📋 History
          </button>
          <button
            onClick={() => { localStorage.clear(); router.push('/login'); }}
            style={{ color: '#9ca3af', fontWeight: 500, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px' }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* PAGE HEADER */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 0' }}>
        <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: '12px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>New Job</span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#14532d', margin: '0 0 6px' }}>Generate TMY File</h1>
        <p style={{ color: '#6b7280', fontSize: '15px', margin: 0 }}>
          Click on the map to pick a location — coordinates and site name fill automatically.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: '1100px', margin: '24px auto', padding: '0 24px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

        {/* MAP CARD */}
        <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #bbf7d0', boxShadow: '0 4px 24px rgba(22,163,74,0.08)', overflow: 'hidden' }}>
          <div style={{ padding: '18px 20px 12px', borderBottom: '1px solid #f0fdf4', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }}/>
            <span style={{ fontWeight: 600, color: '#15803d', fontSize: '15px' }}>Select Location</span>
          </div>
          <div style={{ height: '420px' }}>
            <MapPicker
              lat={parseFloat(form.latitude) || null}
              lon={parseFloat(form.longitude) || null}
              onLocationSelect={handleMapClick}
            />
          </div>
          <div style={{ padding: '10px 20px', background: '#f0fdf4', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" fill="none" stroke="#4ade80" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>Click anywhere on the map to set coordinates</span>
          </div>
        </div>

        {/* FORM CARD */}
        <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #bbf7d0', boxShadow: '0 4px 24px rgba(22,163,74,0.08)', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }}/>
            <span style={{ fontWeight: 600, color: '#15803d', fontSize: '15px' }}>Job Parameters</span>
          </div>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Site name */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Site Name</label>
              <input
                type="text"
                required
                value={form.site_name}
                onChange={(e) => setForm({ ...form, site_name: e.target.value })}
                placeholder="e.g. Marrakech-Morocco"
                style={{ width: '100%', border: '1.5px solid #bbf7d0', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: '#1f2937', outline: 'none', boxSizing: 'border-box', transition: 'border 0.15s' }}
                onFocus={e => e.target.style.border = '1.5px solid #16a34a'}
                onBlur={e => e.target.style.border = '1.5px solid #bbf7d0'}
              />
            </div>

            {/* Lat / Lon */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Latitude</label>
                <input
                  type="number" step="any" required
                  value={form.latitude}
                  onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                  placeholder="31.6295"
                  style={{ width: '100%', border: '1.5px solid #bbf7d0', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: '#1f2937', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.border = '1.5px solid #16a34a'}
                  onBlur={e => e.target.style.border = '1.5px solid #bbf7d0'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Longitude</label>
                <input
                  type="number" step="any" required
                  value={form.longitude}
                  onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                  placeholder="-7.9811"
                  style={{ width: '100%', border: '1.5px solid #bbf7d0', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: '#1f2937', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.border = '1.5px solid #16a34a'}
                  onBlur={e => e.target.style.border = '1.5px solid #bbf7d0'}
                />
              </div>
            </div>

            {/* Years */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Start Year</label>
                <input
                  type="number" required min="2000" max="2023"
                  value={form.start_year}
                  onChange={(e) => setForm({ ...form, start_year: e.target.value })}
                  style={{ width: '100%', border: '1.5px solid #bbf7d0', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: '#1f2937', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.border = '1.5px solid #16a34a'}
                  onBlur={e => e.target.style.border = '1.5px solid #bbf7d0'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>End Year</label>
                <input
                  type="number" required min="2000" max="2024"
                  value={form.end_year}
                  onChange={(e) => setForm({ ...form, end_year: e.target.value })}
                  style={{ width: '100%', border: '1.5px solid #bbf7d0', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: '#1f2937', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.border = '1.5px solid #16a34a'}
                  onBlur={e => e.target.style.border = '1.5px solid #bbf7d0'}
                />
              </div>
            </div>

            {/* Selected location preview */}
            {form.latitude && form.longitude && (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>📍</span>
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Selected coordinates</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#15803d', fontFamily: 'monospace' }}>{form.latitude}, {form.longitude}</div>
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !form.latitude || !form.longitude}
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '12px',
                border: 'none',
                cursor: loading || !form.latitude || !form.longitude ? 'not-allowed' : 'pointer',
                fontSize: '15px',
                fontWeight: 700,
                color: 'white',
                background: loading || !form.latitude || !form.longitude
                  ? '#86efac'
                  : 'linear-gradient(135deg, #16a34a, #15803d)',
                boxShadow: loading || !form.latitude || !form.longitude ? 'none' : '0 4px 14px rgba(22,163,74,0.35)',
                transition: 'all 0.2s',
                marginTop: '4px',
                letterSpacing: '0.01em'
              }}
            >
              {loading ? '⏳ Submitting...' : '🚀 Generate TMY File'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}