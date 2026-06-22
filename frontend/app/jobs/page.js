'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllJobs } from '@/lib/api';

const G = '#8DC63F';
const GD = '#5a8a1f';
const GL = '#f4faeb';
const GB = '#c5e08a';

const STATUS_STYLES = {
  pending:           { bg: '#fefce8', color: '#a16207' },
  downloading_era5:  { bg: '#eff6ff', color: '#1d4ed8' },
  downloading_cams:  { bg: '#eff6ff', color: '#1d4ed8' },
  processing_data:   { bg: '#faf5ff', color: '#7c3aed' },
  generating_tmy:    { bg: '#eef2ff', color: '#4338ca' },
  generating_report: { bg: '#eef2ff', color: '#4338ca' },
  completed:         { bg: '#f4faeb', color: GD },
  failed:            { bg: '#fef2f2', color: '#dc2626' },
};

const STATUS_EMOJI = {
  pending: '⏳', downloading_era5: '📡', downloading_cams: '☀️',
  processing_data: '⚙️', generating_tmy: '📊', generating_report: '📝',
  completed: '', failed: '',
};

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('access_token')) { router.push('/login'); return; }
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllJobs();
      setJobs(res.data.jobs);
    } catch (err) {
      setError('Failed to load jobs history');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${GL} 0%, #eaf5d0 50%, ${GL} 100%)` }}>

      {/* NAVBAR */}
      <nav style={{ background: 'white', borderBottom: `1px solid ${GB}`, padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 8px rgba(141,198,63,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => router.back()}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: G, fontWeight: 600, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: '8px' }}
            onMouseEnter={e => e.currentTarget.style.background = GL}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </button>
          <div style={{ width: '1px', height: '24px', background: GB }}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `linear-gradient(135deg, ${G}, #a8d85a)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '16px' }}></span>
            </div>
            <span style={{ fontWeight: 700, fontSize: '18px', color: GD }}>TMY Generator</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => router.push('/generate')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'white', fontWeight: 600, fontSize: '14px', background: `linear-gradient(135deg, ${G}, ${GD})`, border: 'none', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(141,198,63,0.3)' }}
          >
            + New Job
          </button>
          <button
            onClick={() => { localStorage.clear(); router.push('/login'); }}
            style={{ color: '#9ca3af', fontWeight: 500, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px' }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#eaf5d0', color: G, fontSize: '12px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
               History
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#14532d', margin: '0 0 4px' }}>Jobs History</h1>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>All your TMY generation requests</p>
          </div>
          <button
            onClick={fetchJobs}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: G, fontWeight: 500, fontSize: '14px', background: 'white', border: `1px solid ${GB}`, padding: '8px 14px', borderRadius: '10px', cursor: 'pointer' }}
          >
             Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', color: '#9ca3af', padding: '60px 0', fontSize: '15px' }}>
            Loading your jobs...
          </div>
        )}

        {/* Empty state */}
        {!loading && jobs.length === 0 && !error && (
          <div style={{ background: 'white', border: `1px solid ${GB}`, borderRadius: '20px', padding: '60px 20px', textAlign: 'center', boxShadow: '0 4px 24px rgba(141,198,63,0.08)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌍</div>
            <p style={{ color: '#9ca3af', fontSize: '16px', marginBottom: '20px' }}>No jobs yet</p>
            <button
              onClick={() => router.push('/generate')}
              style={{ background: `linear-gradient(135deg, ${G}, ${GD})`, color: 'white', border: 'none', padding: '10px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 14px rgba(141,198,63,0.35)' }}
            >
               Generate your first TMY
            </button>
          </div>
        )}

        {/* Table */}
        {!loading && jobs.length > 0 && (
          <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, boxShadow: '0 4px 24px rgba(141,198,63,0.08)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: GL, borderBottom: `1px solid ${GB}` }}>
                  {['ID', 'Site', 'Coordinates', 'Period', 'Status', 'Date', 'Action'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '12px 18px', color: GD, fontWeight: 700, fontSize: '13px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jobs.slice(0, 3).map((job, i) => (
                  <tr key={job.id} style={{ borderBottom: i < Math.min(jobs.length, 3) - 1 ? `1px solid ${GL}` : 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = GL}
                    onMouseLeave={e => e.currentTarget.style.background = 'white'}
                  >
                    <td style={{ padding: '14px 18px', color: '#9ca3af', fontFamily: 'monospace', fontWeight: 600 }}>#{job.id}</td>
                    <td style={{ padding: '14px 18px', fontWeight: 600, color: '#1f2937' }}>{job.site_name}</td>
                    <td style={{ padding: '14px 18px', color: '#6b7280', fontFamily: 'monospace', fontSize: '13px' }}>{job.latitude}, {job.longitude}</td>
                    <td style={{ padding: '14px 18px', color: '#6b7280' }}>{job.start_year} → {job.end_year}</td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, background: STATUS_STYLES[job.status]?.bg || '#f3f4f6', color: STATUS_STYLES[job.status]?.color || '#6b7280' }}>
                        {STATUS_EMOJI[job.status]} {job.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', color: '#6b7280', fontSize: '13px' }}>
                      {new Date(job.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <button
                        onClick={() => router.push(`/status?job_id=${job.id}`)}
                        style={{ color: G, fontWeight: 600, fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        View →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}