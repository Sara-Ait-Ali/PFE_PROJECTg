'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllJobs } from '@/lib/api';
import Navbar from '@/components/Navbar';
import { ArrowLeft } from 'lucide-react';

const G  = '#8DC63F';
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
      console.log(res.data.jobs);
    } catch (err) {
      setError('Failed to load jobs history');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: GL }}>

      <Navbar page="history" />

      {/* Back arrow */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px 24px 0' }}>
        <button
          onClick={() => router.push('/generate')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: '14px', padding: '4px 0' }}
          onMouseEnter={e => e.currentTarget.style.color = GD}
          onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
        >
          <ArrowLeft size={16} />
          Back to Generate
        </button>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px 24px' }}>

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: '#EAF3DE', color: G, fontSize: '12px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              History
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#14532d', margin: '0 0 4px' }}>Jobs History</h1>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>All your TMY generation requests</p>
          </div>
          <button onClick={fetchJobs} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: G, fontWeight: 500, fontSize: '14px', background: 'white', border: `1px solid ${GB}`, padding: '8px 14px', borderRadius: '10px', cursor: 'pointer' }}>
            Refresh
          </button>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px' }}>{error}</div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', color: '#9ca3af', padding: '60px 0', fontSize: '15px' }}>Loading your jobs...</div>
        )}

        {!loading && jobs.length === 0 && !error && (
          <div style={{ background: 'white', border: `1px solid ${GB}`, borderRadius: '20px', padding: '60px 20px', textAlign: 'center', boxShadow: '0 4px 24px rgba(141,198,63,0.08)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌍</div>
            <p style={{ color: '#9ca3af', fontSize: '16px', marginBottom: '20px' }}>No jobs yet</p>
            <button onClick={() => router.push('/generate')} style={{ background: G, color: 'white', border: 'none', padding: '10px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
              Generate your first TMY
            </button>
          </div>
        )}

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
                {jobs.map((job, i) => (
                  <tr key={job.id}
                    style={{ borderBottom: i < jobs.length - 1 ? `1px solid ${GL}` : 'none' }}
                    onMouseEnter={e => e.currentTarget.style.background = GL}
                    onMouseLeave={e => e.currentTarget.style.background = 'white'}
                  >
                    <td style={{ padding: '14px 18px', color: '#9ca3af', fontFamily: 'monospace', fontWeight: 600 }}>#{job.id}</td>
                    <td style={{ padding: '14px 18px', fontWeight: 600, color: '#1f2937' }}>{job.site_name}</td>
                    <td style={{ padding: '14px 18px', color: '#6b7280', fontFamily: 'monospace', fontSize: '13px' }}>{job.latitude}, {job.longitude}</td>
                    <td style={{ padding: '14px 18px', color: '#6b7280' }}>{job.start_year} → {job.end_year}</td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, background: STATUS_STYLES[job.status]?.bg || '#f3f4f6', color: STATUS_STYLES[job.status]?.color || '#6b7280' }}>
                        {job.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', color: '#6b7280', fontSize: '13px' }}>
                      {new Date(job.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <button onClick={() => {
  if (job.selected_files && job.selected_files.length > 0) {
    router.push(`/download-status?job_id=${job.id}&type=download`);
  } else {
    router.push(`/status?job_id=${job.id}`);
  }
}} style={{ color: G, fontWeight: 600, fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
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