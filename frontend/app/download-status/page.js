'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getJobStatus, downloadJob } from '@/lib/api';
import Navbar from '@/components/Navbar';
import { ArrowLeft } from 'lucide-react';

const G  = '#8DC63F';
const GD = '#5a8a1f';
const GL = '#f4faeb';
const GB = '#c5e08a';

const TMY_STEPS = [
  { key: 'pending',           label: 'Job queued' },
  { key: 'downloading_era5',  label: 'Downloading ERA5 data' },
  { key: 'downloading_cams',  label: 'Downloading CAMS data' },
  { key: 'processing_data',   label: 'Processing datasets' },
  { key: 'generating_tmy',    label: 'Generating TMY' },
  { key: 'generating_report', label: 'Generating report' },
  { key: 'completed',         label: 'Completed' },
];

const DOWNLOAD_STEPS = [
  { key: 'pending',          label: 'Job queued' },
  { key: 'downloading_era5', label: 'Downloading ERA5 dataset' },
  { key: 'downloading_cams', label: 'Downloading CAMS dataset' },
  { key: 'processing_data',  label: 'Preparing selected files' },
  { key: 'completed',        label: 'Download package ready' },
];

export default function DownloadStatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get('job_id');
  const type = 'download';
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');

  const STEPS = type === 'download' ? DOWNLOAD_STEPS : TMY_STEPS;

  useEffect(() => {
    if (!localStorage.getItem('access_token')) { router.push('/login'); return; }
    if (!jobId) return;
    const fetchStatus = async () => {
      try {
        const res = await getJobStatus(jobId);
        setJob(res.data);
      } catch (err) {
        setError('Failed to fetch job status');
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [jobId]);

  const currentStepIndex = STEPS.findIndex((s) => s.key === job?.status);
  const progress = job ? Math.round((currentStepIndex / (STEPS.length - 1)) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', background: GL }}>

      <Navbar page="status" />

      {/* Back arrow */}
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '20px 24px 0' }}>
        <button
          onClick={() => router.push('/jobs')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: '14px', padding: '4px 0' }}
          onMouseEnter={e => e.currentTarget.style.color = GD}
          onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
        >
          <ArrowLeft size={16} />
          Back to History
        </button>
      </div>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Page title */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', background: '#EAF3DE', color: G, fontSize: '12px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Job #{jobId}
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#14532d', margin: '0 0 4px' }}>
            {type === 'download' ? 'Download Status' : 'Processing Status'}
          </h1>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            {type === 'download' ? 'Preparing your selected datasets for download.' : 'This page updates automatically every 5 seconds.'}
          </p>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px' }}>{error}</div>
        )}

        {!job && !error && (
          <div style={{ textAlign: 'center', color: '#9ca3af', padding: '60px 0', fontSize: '15px' }}>Loading...</div>
        )}

        {job && (
          <>
            {/* Site info card */}
            <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, boxShadow: '0 4px 24px rgba(141,198,63,0.08)', padding: '20px 24px', marginBottom: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '14px' }}>
                {[
                  ['Site', job.site_name],
                  ['Status', job.status],
                  ['Latitude', job.latitude],
                  ['Longitude', job.longitude],
                  ['Period', `${job.start_year} → ${job.end_year}`],
                ].map(([label, value]) => (
                  <div key={label}>
                    <span style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
                    <div style={{ color: '#1f2937', fontWeight: 600, marginTop: '2px' }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected files card */}
            {type === 'download' && job.selected_files && (
              <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, boxShadow: '0 4px 24px rgba(141,198,63,0.08)', padding: '20px 24px', marginBottom: '20px' }}>
                <h3 style={{ fontWeight: 700, color: '#14532d', fontSize: '15px', margin: '0 0 12px' }}>Selected Files</h3>
                {job.selected_files.map(file => (
                  <div key={file} style={{ padding: '8px 0', color: '#4E7A1A', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="14" height="14" fill="none" stroke={G} strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                    {file}
                  </div>
                ))}
              </div>
            )}

            {/* Stepper card */}
            <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, boxShadow: '0 4px 24px rgba(141,198,63,0.08)', padding: '24px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontWeight: 700, color: '#14532d', fontSize: '15px', margin: 0 }}>Processing Steps</h3>
                <span style={{ fontSize: '13px', color: G, fontWeight: 600 }}>{progress}%</span>
              </div>

              <div style={{ height: '6px', background: '#EAF3DE', borderRadius: '999px', marginBottom: '20px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${G}, ${GD})`, borderRadius: '999px', transition: 'width 0.5s ease' }} />
              </div>

              {job.message && job.status !== 'completed' && job.status !== 'failed' && (
                <div style={{ background: GL, border: `1px solid ${GB}`, borderRadius: '10px', padding: '10px 14px', marginBottom: '16px', fontSize: '13px', color: GD, fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: G, flexShrink: 0 }} />
                  {job.message}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {STEPS.map((step, index) => {
                  const isDone    = currentStepIndex > index;
                  const isCurrent = currentStepIndex === index;
                  return (
                    <div key={step.key} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDone ? GL : isCurrent ? '#EAF3DE' : '#f9fafb', border: isDone || isCurrent ? `2px solid ${G}` : '2px solid #e5e7eb', transition: 'all 0.3s' }}>
                        {isDone ? (
                          <svg width="14" height="14" fill="none" stroke={G} strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                        ) : isCurrent ? (
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: G }} />
                        ) : (
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d1d5db' }} />
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '14px', fontWeight: isCurrent ? 700 : isDone ? 500 : 400, color: isDone ? GD : isCurrent ? '#1f2937' : '#9ca3af' }}>
                          {step.label}
                        </span>
                      </div>
                      {isDone && <span style={{ fontSize: '11px', fontWeight: 600, color: G, background: GL, padding: '2px 8px', borderRadius: '999px' }}>Done</span>}
                      {isCurrent && job.status !== 'completed' && <span style={{ fontSize: '11px', fontWeight: 600, color: 'white', background: G, padding: '2px 8px', borderRadius: '999px' }}>Running</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Failed */}
            {job.status === 'failed' && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '20px', padding: '20px 24px' }}>
                <p style={{ color: '#dc2626', fontWeight: 700, fontSize: '15px', margin: '0 0 8px' }}>Job Failed</p>
                <p style={{ color: '#ef4444', fontSize: '13px', fontFamily: 'monospace', margin: 0 }}>{job.error}</p>
              </div>
            )}

            {/* Completed */}
            {job.status === 'completed' && (
              <div style={{ background: 'white', border: `2px solid ${G}`, borderRadius: '20px', padding: '28px 24px', textAlign: 'center', boxShadow: `0 8px 32px rgba(141,198,63,0.15)` }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: GL, border: `2px solid ${G}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <svg width="24" height="24" fill="none" stroke={G} strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <p style={{ color: GD, fontWeight: 800, fontSize: '18px', margin: '0 0 6px' }}>
                  {type === 'download' ? 'Download Package Ready' : 'TMY Generation Complete'}
                </p>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 20px' }}>
                  {type === 'download' ? 'Your selected datasets are ready to download.' : 'Your files are ready to download.'}
                </p>
                <button
                  onClick={async () => {
                    try {
                      const res = await downloadJob(jobId);
                      const url = window.URL.createObjectURL(new Blob([res.data]));
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute('download', `TMY_${job.site_name}.zip`);
                      document.body.appendChild(link);
                      link.click();
                      link.remove();
                      window.URL.revokeObjectURL(url);
                    } catch (err) {
                      alert('Download failed. Please try again.');
                    }
                  }}
                  style={{ background: G, color: 'white', border: 'none', padding: '12px 32px', borderRadius: '12px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', boxShadow: `0 4px 14px rgba(141,198,63,0.35)` }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  {type === 'download' ? 'Download Selected Files' : 'Download Results'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}