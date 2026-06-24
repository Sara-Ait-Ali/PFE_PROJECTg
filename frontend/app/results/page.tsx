// 'use client';
// import { useState, useEffect } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { getJobStatus, downloadJob } from '@/lib/api';

// const G   = '#8DC63F';
// const GD  = '#5a8a1f';
// const GL  = '#f4faeb';
// const GB  = '#c5e08a';
// const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// /* ── small helpers ── */
// const token = () => (typeof window !== 'undefined' ? localStorage.getItem('access_token') : '');

// async function apiFetch(path: string) {
//   const res = await fetch(`${BASE}${path}`, {
//     headers: { Authorization: `Bearer ${token()}` },
//   });
//   if (!res.ok) throw new Error(`${res.status}`);
//   return res.json();
// }

// /* ── tabs ── */
// type Tab = 'summary' | 'plots' | 'months' | 'download';

// export default function ResultsPage() {
//   const searchParams = useSearchParams();
//   const router       = useRouter();
//   const jobId        = searchParams.get('job_id');

//   const [job,     setJob]     = useState<any>(null);
//   const [results, setResults] = useState<any>(null);
//   const [tab,     setTab]     = useState<Tab>('summary');
//   const [loading, setLoading] = useState(true);
//   const [error,   setError]   = useState('');
//   const [dlLoading, setDlLoading] = useState(false);

//   useEffect(() => {
//     if (!localStorage.getItem('access_token')) { router.push('/login'); return; }
//     if (!jobId) return;

//     Promise.all([
//       apiFetch(`/api/tmy/status/${jobId}/`),
//       apiFetch(`/api/tmy/results/${jobId}/`),
//     ])
//       .then(([jobData, resData]) => {
//         setJob(jobData);
//         setResults(resData);
//       })
//       .catch(() => setError('Failed to load results.'))
//       .finally(() => setLoading(false));
//   }, [jobId]);

//   /* ── download zip ── */
//   const handleDownload = async () => {
//     setDlLoading(true);
//     try {
//       const res = await downloadJob(jobId);
//       const url  = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement('a');
//       link.href  = url;
//       link.setAttribute('download', `TMY_${job?.site_name ?? jobId}.zip`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch {
//       alert('Download failed. Please try again.');
//     } finally {
//       setDlLoading(false);
//     }
//   };

//   /* ────────────────────────────────── UI ── */
//   return (
//     <div style={{ minHeight: '100vh', background: GL, fontFamily: 'sans-serif' }}>

//       {/* NAVBAR */}
//       <nav style={{ background: 'white', borderBottom: `2px solid ${G}`, padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 8px rgba(141,198,63,0.10)' }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//           <button onClick={() => router.back()}
//             style={{ display: 'flex', alignItems: 'center', gap: '6px', color: G, fontWeight: 600, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: '8px' }}
//             onMouseEnter={e => (e.currentTarget.style.background = GL)}
//             onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
//             <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
//             Back
//           </button>
//           <div style={{ width: '1px', height: '24px', background: GB }}/>
//           <span style={{ fontWeight: 700, fontSize: '18px', color: GD }}>TMY Results</span>
//         </div>
//         <div style={{ display: 'flex', gap: '8px' }}>
//           <button onClick={() => router.push('/jobs')}
//             style={{ color: G, fontWeight: 500, fontSize: '14px', background: GL, border: `1px solid ${GB}`, padding: '6px 14px', borderRadius: '8px', cursor: 'pointer' }}>
//             📋 History
//           </button>
//           <button onClick={() => router.push('/generate')}
//             style={{ color: 'white', fontWeight: 600, fontSize: '14px', background: `linear-gradient(135deg, ${G}, ${GD})`, border: 'none', padding: '6px 16px', borderRadius: '8px', cursor: 'pointer' }}>
//             + New Job
//           </button>
//         </div>
//       </nav>

//       <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px 60px' }}>

//         {/* Loading / Error */}
//         {loading && <div style={{ textAlign: 'center', color: '#9ca3af', padding: '80px 0', fontSize: '15px' }}>Loading results…</div>}
//         {error   && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '16px', borderRadius: '12px', fontSize: '14px' }}>{error}</div>}

//         {!loading && !error && job && results && (
//           <>
//             {/* ── Header ── */}
//             <div style={{ marginBottom: '24px' }}>
//               <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#eaf5d0', color: G, fontSize: '12px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
//                 Job #{jobId} · Completed
//               </div>
//               <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#14532d', margin: '0 0 4px' }}>
//                 {job.site_name}
//               </h1>
//               <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
//                 {job.latitude}, {job.longitude} &nbsp;·&nbsp; {job.start_year} – {job.end_year}
//               </p>
//             </div>

//             {/* ── Quick stats banner ── */}
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
//               {[
//                 { label: 'Annual GHI',      value: results.stats?.annual_ghi    ? `${results.stats.annual_ghi} kWh/m²`  : '—' },
//                 { label: 'Annual DNI',      value: results.stats?.annual_dni    ? `${results.stats.annual_dni} kWh/m²`  : '—' },
//                 { label: 'Mean Temp',       value: results.stats?.mean_temp     ? `${results.stats.mean_temp} °C`        : '—' },
//                 { label: 'Mean Wind',       value: results.stats?.mean_wind     ? `${results.stats.mean_wind} m/s`       : '—' },
//               ].map(s => (
//                 <div key={s.label} style={{ background: 'white', borderRadius: '16px', border: `1px solid ${GB}`, padding: '16px 20px', boxShadow: '0 2px 12px rgba(141,198,63,0.07)' }}>
//                   <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{s.label}</div>
//                   <div style={{ fontSize: '22px', fontWeight: 800, color: GD }}>{s.value}</div>
//                 </div>
//               ))}
//             </div>

//             {/* ── Tabs ── */}
//             <div style={{ display: 'flex', gap: '4px', background: 'white', border: `1px solid ${GB}`, borderRadius: '14px', padding: '5px', marginBottom: '20px', width: 'fit-content' }}>
//               {([
//                 { id: 'summary',  label: '📋 Summary'   },
//                 { id: 'plots',    label: '📊 Plots'      },
//                 { id: 'months',   label: '📅 Best Months'},
//                 { id: 'download', label: '📥 Download'   },
//               ] as { id: Tab; label: string }[]).map(t => (
//                 <button key={t.id} onClick={() => setTab(t.id)}
//                   style={{
//                     padding: '8px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer',
//                     fontSize: '13px', fontWeight: 600, transition: 'all 0.15s',
//                     background: tab === t.id ? `linear-gradient(135deg, ${G}, ${GD})` : 'transparent',
//                     color:      tab === t.id ? 'white' : '#6b7280',
//                   }}>
//                   {t.label}
//                 </button>
//               ))}
//             </div>

//             {/* ══════ TAB: SUMMARY ══════ */}
//             {tab === 'summary' && (
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

//                 {/* Site info */}
//                 <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '24px', boxShadow: '0 4px 24px rgba(141,198,63,0.07)' }}>
//                   <h3 style={{ fontWeight: 700, color: '#14532d', fontSize: '15px', margin: '0 0 16px' }}>Site Information</h3>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', fontSize: '14px' }}>
//                     {[
//                       ['Site Name',  job.site_name],
//                       ['Latitude',   job.latitude],
//                       ['Longitude',  job.longitude],
//                       ['Period',     `${job.start_year} → ${job.end_year}`],
//                       ['Years',      `${(job.end_year - job.start_year) + 1} years`],
//                       ['Method',     'Sandia / NREL'],
//                     ].map(([label, value]) => (
//                       <div key={label}>
//                         <div style={{ color: '#9ca3af', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
//                         <div style={{ color: '#1f2937', fontWeight: 600, marginTop: '4px' }}>{value}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Monthly GHI summary */}
//                 {results.monthly_ghi && (
//                   <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '24px', boxShadow: '0 4px 24px rgba(141,198,63,0.07)' }}>
//                     <h3 style={{ fontWeight: 700, color: '#14532d', fontSize: '15px', margin: '0 0 16px' }}>Monthly GHI — TMY vs Long-term Average (kWh/m²)</h3>
//                     <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '120px' }}>
//                       {MONTHS.map((m, i) => {
//                         const tmy = results.monthly_ghi?.tmy?.[i]  ?? 0;
//                         const avg = results.monthly_ghi?.avg?.[i]  ?? 0;
//                         const max = Math.max(...(results.monthly_ghi?.tmy ?? [1]), ...(results.monthly_ghi?.avg ?? [1]));
//                         return (
//                           <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
//                             <div style={{ width: '100%', display: 'flex', gap: '2px', alignItems: 'flex-end', height: '90px' }}>
//                               <div title={`TMY: ${tmy}`} style={{ flex: 1, background: G, borderRadius: '4px 4px 0 0', height: `${(tmy / max) * 90}px`, opacity: 0.9 }}/>
//                               <div title={`Avg: ${avg}`} style={{ flex: 1, background: GB, borderRadius: '4px 4px 0 0', height: `${(avg / max) * 90}px` }}/>
//                             </div>
//                             <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600 }}>{m}</div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                     <div style={{ display: 'flex', gap: '16px', marginTop: '10px', fontSize: '12px' }}>
//                       <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '10px', height: '10px', background: G, borderRadius: '2px', display: 'inline-block' }}/> TMY</span>
//                       <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '10px', height: '10px', background: GB, borderRadius: '2px', display: 'inline-block' }}/> Long-term avg</span>
//                     </div>
//                   </div>
//                 )}

//                 {/* Monthly temperature */}
//                 {results.monthly_temp && (
//                   <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '24px', boxShadow: '0 4px 24px rgba(141,198,63,0.07)' }}>
//                     <h3 style={{ fontWeight: 700, color: '#14532d', fontSize: '15px', margin: '0 0 16px' }}>Monthly Mean Temperature — TMY (°C)</h3>
//                     <div style={{ display: 'flex', gap: '0', alignItems: 'flex-end', height: '100px', position: 'relative' }}>
//                       {MONTHS.map((m, i) => {
//                         const val = results.monthly_temp?.[i] ?? 0;
//                         const vals = results.monthly_temp ?? [];
//                         const mn = Math.min(...vals);
//                         const mx = Math.max(...vals);
//                         const norm = mx === mn ? 0.5 : (val - mn) / (mx - mn);
//                         return (
//                           <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
//                             <div style={{ fontSize: '10px', color: GD, fontWeight: 700 }}>{val.toFixed(1)}</div>
//                             <div style={{ width: '80%', background: `rgba(141,198,63,${0.3 + norm * 0.7})`, borderRadius: '6px 6px 0 0', height: `${40 + norm * 50}px`, border: `1px solid ${GB}` }}/>
//                             <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600 }}>{m}</div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//               </div>
//             )}

//             {/* ══════ TAB: PLOTS ══════ */}
//             {tab === 'plots' && (
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//                 {results.plots && results.plots.length > 0 ? (
//                   results.plots.map((plot: { name: string; url: string }, idx: number) => (
//                     <div key={idx} style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '20px', boxShadow: '0 4px 24px rgba(141,198,63,0.07)' }}>
//                       <h3 style={{ fontWeight: 600, color: '#14532d', fontSize: '14px', margin: '0 0 12px', textTransform: 'capitalize' }}>
//                         {plot.name.replace(/_/g, ' ').replace('.png', '')}
//                       </h3>
//                       <img
//                         src={`${BASE}${plot.url}`}
//                         alt={plot.name}
//                         style={{ width: '100%', borderRadius: '12px', border: `1px solid ${GB}` }}
//                         onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
//                       />
//                     </div>
//                   ))
//                 ) : (
//                   <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '40px', textAlign: 'center', color: '#9ca3af' }}>
//                     No plots available for this job.
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* ══════ TAB: BEST MONTHS ══════ */}
//             {tab === 'months' && (
//               <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '24px', boxShadow: '0 4px 24px rgba(141,198,63,0.07)' }}>
//                 <h3 style={{ fontWeight: 700, color: '#14532d', fontSize: '15px', margin: '0 0 4px' }}>Selected Best Year per Month</h3>
//                 <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 20px' }}>Sandia/NREL method — Finkelstein-Schafer statistic</p>

//                 {results.best_months ? (
//                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
//                     {MONTHS.map((m, i) => {
//                       const entry = results.best_months[i + 1];
//                       return (
//                         <div key={m} style={{ background: GL, borderRadius: '14px', padding: '14px 18px', border: `1px solid ${GB}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                           <div>
//                             <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{m}</div>
//                             <div style={{ fontSize: '22px', fontWeight: 800, color: GD, marginTop: '2px' }}>
//                               {entry?.best_year ?? '—'}
//                             </div>
//                           </div>
//                           {entry?.fs_score != null && (
//                             <div style={{ textAlign: 'right' }}>
//                               <div style={{ fontSize: '10px', color: '#9ca3af' }}>FS score</div>
//                               <div style={{ fontSize: '13px', fontWeight: 700, color: G }}>{entry.fs_score.toFixed(4)}</div>
//                             </div>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <div style={{ textAlign: 'center', color: '#9ca3af', padding: '40px 0' }}>
//                     Best months data not available.
//                   </div>
//                 )}

//                 {/* Top 5 candidates note */}
//                 {results.top5_months && (
//                   <div style={{ marginTop: '20px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '14px 18px' }}>
//                     <p style={{ fontWeight: 700, color: '#92400e', fontSize: '13px', margin: '0 0 8px' }}>ℹ️ Top 5 candidate years were evaluated per month before final selection.</p>
//                     <p style={{ color: '#78350f', fontSize: '12px', margin: 0 }}>The Sandia method picks the final year based on persistence statistics among the top-5 FS-ranked candidates.</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* ══════ TAB: DOWNLOAD ══════ */}
//             {tab === 'download' && (
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

//                 {/* Main zip */}
//                 <div style={{ background: 'white', borderRadius: '20px', border: `2px solid ${G}`, padding: '28px 24px', boxShadow: `0 8px 32px rgba(141,198,63,0.12)` }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//                     <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: GL, border: `2px solid ${G}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
//                       📦
//                     </div>
//                     <div style={{ flex: 1 }}>
//                       <div style={{ fontWeight: 700, color: '#14532d', fontSize: '16px' }}>Complete TMY Package</div>
//                       <div style={{ color: '#6b7280', fontSize: '13px', marginTop: '3px' }}>ZIP containing all files below</div>
//                     </div>
//                     <button
//                       onClick={handleDownload}
//                       disabled={dlLoading}
//                       style={{ background: `linear-gradient(135deg, ${G}, ${GD})`, color: 'white', border: 'none', padding: '12px 28px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: dlLoading ? 'not-allowed' : 'pointer', opacity: dlLoading ? 0.7 : 1, boxShadow: `0 4px 14px rgba(141,198,63,0.35)`, whiteSpace: 'nowrap' }}>
//                       {dlLoading ? 'Preparing…' : '⬇ Download ZIP'}
//                     </button>
//                   </div>
//                 </div>

//                 {/* File list */}
//                 <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '24px', boxShadow: '0 4px 24px rgba(141,198,63,0.07)' }}>
//                   <h3 style={{ fontWeight: 700, color: '#14532d', fontSize: '15px', margin: '0 0 16px' }}>Files included in the package</h3>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//                     {[
//                       { icon: '📄', name: `${job.site_name}_Report.docx`,                    desc: 'Full TMY report (English)' },
//                       { icon: '📄', name: `${job.site_name}_Report_français.docx`,           desc: 'Full TMY report (French)' },
//                       { icon: '📄', name: `${job.site_name}_Uncertainty_Report_français.docx`, desc: 'Uncertainty analysis report' },
//                       { icon: '📊', name: `dataset_${job.site_name}.csv`,                    desc: 'Full ERA5 + CAMS merged dataset' },
//                       { icon: '🌤', name: `tmy_files/TMY_P50.csv`,                           desc: 'TMY P50 — median year' },
//                       { icon: '🌤', name: `tmy_files/TMY_P75.csv`,                           desc: 'TMY P75' },
//                       { icon: '🌤', name: `tmy_files/TMY_P90.csv`,                           desc: 'TMY P90' },
//                       { icon: '🌤', name: `tmy_files/TMY_P99.csv`,                           desc: 'TMY P99 — pessimistic year' },
//                       { icon: '🖼', name: `plot/`,                                            desc: 'All generated charts (PNG)' },
//                     ].map(f => (
//                       <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: GL, borderRadius: '10px', border: `1px solid ${GB}` }}>
//                         <span style={{ fontSize: '18px' }}>{f.icon}</span>
//                         <div style={{ flex: 1 }}>
//                           <div style={{ fontSize: '13px', fontWeight: 600, color: '#1f2937', fontFamily: 'monospace' }}>{f.name}</div>
//                           <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '1px' }}>{f.desc}</div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//               </div>
//             )}

//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// 'use client';
// import { useState, useEffect } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { downloadJob } from '@/lib/api';

// const G    = '#8DC63F';
// const GD   = '#5a8a1f';
// const GL   = '#f4faeb';
// const GB   = '#c5e08a';
// const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// const MONTHS     = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
// const MONTH_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// type Tab = 'summary' | 'plots' | 'months' | 'download';

// /* ── fetch with auth token ── */
// async function authFetch(path: string) {
//   const token = localStorage.getItem('access_token') || '';
//   const res   = await fetch(`${BASE}${path}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error(`${res.status}`);
//   return res.json();
// }

// /* ── fetch image as blob URL (so <img> gets auth header) ── */
// async function fetchImageBlob(url: string): Promise<string> {
//   const token = localStorage.getItem('access_token') || '';
//   const res   = await fetch(`${BASE}${url}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error('image fetch failed');
//   const blob  = await res.blob();
//   return URL.createObjectURL(blob);
// }

// /* ── single plot card that loads its own image ── */
// function PlotCard({ plot }: { plot: { name: string; url: string } }) {
//   const [src,    setSrc]    = useState<string | null>(null);
//   const [failed, setFailed] = useState(false);

//   useEffect(() => {
//     fetchImageBlob(plot.url)
//       .then(setSrc)
//       .catch(() => setFailed(true));
//   }, [plot.url]);

//   const title = plot.name
//     .replace(/\.(jpeg|jpg|png)$/i, '')
//     .replace(/_/g, ' ');

//   return (
//     <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '20px', boxShadow: '0 4px 24px rgba(141,198,63,0.07)' }}>
//       <h3 style={{ fontWeight: 600, color: '#14532d', fontSize: '14px', margin: '0 0 14px', textTransform: 'capitalize' }}>
//         {title}
//       </h3>
//       {failed ? (
//         <div style={{ color: '#9ca3af', fontSize: '13px', padding: '20px', textAlign: 'center', background: GL, borderRadius: '10px' }}>
//           Could not load image
//         </div>
//       ) : src ? (
//         <img
//           src={src}
//           alt={title}
//           style={{ width: '100%', borderRadius: '12px', border: `1px solid ${GB}`, display: 'block' }}
//         />
//       ) : (
//         <div style={{ height: '160px', background: GL, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '13px' }}>
//           Loading…
//         </div>
//       )}
//     </div>
//   );
// }

// export default function ResultsPage() {
//   const searchParams = useSearchParams();
//   const router       = useRouter();
//   const jobId        = searchParams.get('job_id');

//   const [job,      setJob]      = useState<any>(null);
//   const [results,  setResults]  = useState<any>(null);
//   const [tab,      setTab]      = useState<Tab>('summary');
//   const [loading,  setLoading]  = useState(true);
//   const [error,    setError]    = useState('');
//   const [dlLoading,setDlLoading]= useState(false);

//   useEffect(() => {
//     if (!localStorage.getItem('access_token')) { router.push('/login'); return; }
//     if (!jobId) return;
//     Promise.all([
//       authFetch(`/api/tmy/status/${jobId}/`),
//       authFetch(`/api/tmy/results/${jobId}/`),
//     ])
//       .then(([jobData, resData]) => { setJob(jobData); setResults(resData); })
//       .catch(e => setError(`Failed to load results: ${e.message}`))
//       .finally(() => setLoading(false));
//   }, [jobId]);

//   const handleDownload = async () => {
//     setDlLoading(true);
//     try {
//       const res  = await downloadJob(jobId);
//       const url  = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement('a');
//       link.href  = url;
//       link.setAttribute('download', `TMY_${job?.site_name ?? jobId}.zip`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch { alert('Download failed. Please try again.'); }
//     finally  { setDlLoading(false); }
//   };

//   return (
//     <div style={{ minHeight: '100vh', background: GL, fontFamily: 'sans-serif' }}>

//       {/* NAVBAR */}
//       <nav style={{ background: 'white', borderBottom: `2px solid ${G}`, padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 8px rgba(141,198,63,0.10)' }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//           <button onClick={() => router.back()}
//             style={{ display: 'flex', alignItems: 'center', gap: '6px', color: G, fontWeight: 600, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: '8px' }}
//             onMouseEnter={e => (e.currentTarget.style.background = GL)}
//             onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
//             <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
//             Back
//           </button>
//           <div style={{ width: '1px', height: '24px', background: GB }}/>
//           <span style={{ fontWeight: 700, fontSize: '18px', color: GD }}>TMY Results</span>
//         </div>
//         <div style={{ display: 'flex', gap: '8px' }}>
//           <button onClick={() => router.push('/jobs')}
//             style={{ color: G, fontWeight: 500, fontSize: '14px', background: GL, border: `1px solid ${GB}`, padding: '6px 14px', borderRadius: '8px', cursor: 'pointer' }}>
//             📋 History
//           </button>
//           <button onClick={() => router.push('/generate')}
//             style={{ color: 'white', fontWeight: 600, fontSize: '14px', background: `linear-gradient(135deg, ${G}, ${GD})`, border: 'none', padding: '6px 16px', borderRadius: '8px', cursor: 'pointer' }}>
//             + New Job
//           </button>
//         </div>
//       </nav>

//       <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px 60px' }}>

//         {loading && <div style={{ textAlign: 'center', color: '#9ca3af', padding: '80px 0', fontSize: '15px' }}>Loading results…</div>}
//         {error   && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '16px', borderRadius: '12px', fontSize: '14px' }}>{error}</div>}

//         {!loading && !error && job && results && (
//           <>
//             {/* Header */}
//             <div style={{ marginBottom: '24px' }}>
//               <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#eaf5d0', color: G, fontSize: '12px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
//                 Job #{jobId} · Completed
//               </div>
//               <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#14532d', margin: '0 0 4px' }}>{job.site_name}</h1>
//               <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
//                 {job.latitude}, {job.longitude} &nbsp;·&nbsp; {job.start_year} – {job.end_year}
//               </p>
//             </div>

//             {/* Stats banner */}
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '24px' }}>
//               {[
//                 { label: 'Annual GHI', value: results.stats?.annual_ghi ? `${results.stats.annual_ghi} kWh/m²` : '—' },
//                 { label: 'Annual DNI', value: results.stats?.annual_dni ? `${results.stats.annual_dni} kWh/m²` : '—' },
//                 { label: 'Mean Temp',  value: results.stats?.mean_temp  ? `${results.stats.mean_temp} °C`      : '—' },
//                 { label: 'Mean Wind',  value: results.stats?.mean_wind  ? `${results.stats.mean_wind} m/s`     : '—' },
//               ].map(s => (
//                 <div key={s.label} style={{ background: 'white', borderRadius: '16px', border: `1px solid ${GB}`, padding: '16px 20px', boxShadow: '0 2px 12px rgba(141,198,63,0.07)' }}>
//                   <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{s.label}</div>
//                   <div style={{ fontSize: '22px', fontWeight: 800, color: GD }}>{s.value}</div>
//                 </div>
//               ))}
//             </div>

//             {/* Tabs */}
//             <div style={{ display: 'flex', gap: '4px', background: 'white', border: `1px solid ${GB}`, borderRadius: '14px', padding: '5px', marginBottom: '20px', width: 'fit-content' }}>
//               {([
//                 { id: 'summary',  label: '📋 Summary'    },
//                 { id: 'plots',    label: '📊 Plots'       },
//                 { id: 'months',   label: '📅 Best Months' },
//                 { id: 'download', label: '📥 Download'    },
//               ] as { id: Tab; label: string }[]).map(t => (
//                 <button key={t.id} onClick={() => setTab(t.id)}
//                   style={{
//                     padding: '8px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer',
//                     fontSize: '13px', fontWeight: 600, transition: 'all 0.15s',
//                     background: tab === t.id ? `linear-gradient(135deg, ${G}, ${GD})` : 'transparent',
//                     color:      tab === t.id ? 'white' : '#6b7280',
//                   }}>
//                   {t.label}
//                 </button>
//               ))}
//             </div>

//             {/* ══ SUMMARY ══ */}
//             {tab === 'summary' && (
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

//                 <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '24px', boxShadow: '0 4px 24px rgba(141,198,63,0.07)' }}>
//                   <h3 style={{ fontWeight: 700, color: '#14532d', fontSize: '15px', margin: '0 0 16px' }}>Site Information</h3>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', fontSize: '14px' }}>
//                     {[
//                       ['Site Name',  job.site_name],
//                       ['Latitude',   job.latitude],
//                       ['Longitude',  job.longitude],
//                       ['Period',     `${job.start_year} → ${job.end_year}`],
//                       ['Years',      `${(job.end_year - job.start_year) + 1} years`],
//                       ['Method',     'Sandia / NREL'],
//                     ].map(([label, value]) => (
//                       <div key={label}>
//                         <div style={{ color: '#9ca3af', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
//                         <div style={{ color: '#1f2937', fontWeight: 600, marginTop: '4px' }}>{value}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Monthly GHI bar chart */}
//                 {results.monthly_ghi && (
//                   <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '24px', boxShadow: '0 4px 24px rgba(141,198,63,0.07)' }}>
//                     <h3 style={{ fontWeight: 700, color: '#14532d', fontSize: '15px', margin: '0 0 16px' }}>Monthly GHI — TMY vs Long-term Average (kWh/m²)</h3>
//                     <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '140px' }}>
//                       {MONTHS.map((m, i) => {
//                         const tmy = results.monthly_ghi?.tmy?.[i] ?? 0;
//                         const avg = results.monthly_ghi?.avg?.[i] ?? 0;
//                         const max = Math.max(...(results.monthly_ghi?.tmy ?? [1]), ...(results.monthly_ghi?.avg ?? [1]));
//                         return (
//                           <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
//                             <div style={{ width: '100%', display: 'flex', gap: '2px', alignItems: 'flex-end', height: '110px' }}>
//                               <div title={`TMY: ${tmy}`} style={{ flex: 1, background: G, borderRadius: '4px 4px 0 0', height: `${(tmy / max) * 110}px` }}/>
//                               <div title={`Avg: ${avg}`} style={{ flex: 1, background: GB, borderRadius: '4px 4px 0 0', height: `${(avg / max) * 110}px` }}/>
//                             </div>
//                             <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600 }}>{m}</div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                     <div style={{ display: 'flex', gap: '16px', marginTop: '10px', fontSize: '12px' }}>
//                       <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '10px', height: '10px', background: G,  borderRadius: '2px', display: 'inline-block' }}/> TMY</span>
//                       <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '10px', height: '10px', background: GB, borderRadius: '2px', display: 'inline-block' }}/> Long-term avg</span>
//                     </div>
//                   </div>
//                 )}

//                 {/* Monthly temperature */}
//                 {results.monthly_temp && (
//                   <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '24px', boxShadow: '0 4px 24px rgba(141,198,63,0.07)' }}>
//                     <h3 style={{ fontWeight: 700, color: '#14532d', fontSize: '15px', margin: '0 0 16px' }}>Monthly Mean Temperature — TMY (°C)</h3>
//                     <div style={{ display: 'flex', gap: '0', alignItems: 'flex-end', height: '120px' }}>
//                       {MONTHS.map((m, i) => {
//                         const val  = results.monthly_temp?.[i] ?? 0;
//                         const vals = results.monthly_temp ?? [];
//                         const mn   = Math.min(...vals);
//                         const mx   = Math.max(...vals);
//                         const norm = mx === mn ? 0.5 : (val - mn) / (mx - mn);
//                         return (
//                           <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
//                             <div style={{ fontSize: '10px', color: GD, fontWeight: 700 }}>{val.toFixed(1)}</div>
//                             <div style={{ width: '80%', background: `rgba(141,198,63,${0.3 + norm * 0.7})`, borderRadius: '6px 6px 0 0', height: `${40 + norm * 60}px`, border: `1px solid ${GB}` }}/>
//                             <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600 }}>{m}</div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* ══ PLOTS — each image loads via blob fetch with auth ══ */}
//             {tab === 'plots' && (
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//                 {results.plots && results.plots.length > 0 ? (
//                   results.plots.map((plot: { name: string; url: string }, idx: number) => (
//                     <PlotCard key={idx} plot={plot} />
//                   ))
//                 ) : (
//                   <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '40px', textAlign: 'center', color: '#9ca3af' }}>
//                     No plots available for this job.
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* ══ BEST MONTHS ══ */}
//             {tab === 'months' && (
//               <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '24px', boxShadow: '0 4px 24px rgba(141,198,63,0.07)' }}>
//                 <h3 style={{ fontWeight: 700, color: '#14532d', fontSize: '15px', margin: '0 0 4px' }}>Selected Best Year per Month</h3>
//                 <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 20px' }}>Sandia/NREL method — Finkelstein-Schafer statistic</p>

//                 {results.best_months && Object.keys(results.best_months).length > 0 ? (
//                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
//                     {MONTH_FULL.map((mName, i) => {
//                       const entry = results.best_months[i + 1];
//                       return (
//                         <div key={mName} style={{ background: GL, borderRadius: '14px', padding: '16px 18px', border: `1px solid ${GB}` }}>
//                           <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
//                             {mName}
//                           </div>
//                           {entry ? (
//                             <>
//                               <div style={{ fontSize: '28px', fontWeight: 800, color: GD }}>{entry.best_year}</div>
//                               <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Selected year</div>
//                             </>
//                           ) : (
//                             <div style={{ fontSize: '22px', color: '#d1d5db', fontWeight: 700 }}>—</div>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <div style={{ textAlign: 'center', color: '#9ca3af', padding: '40px 0', fontSize: '14px' }}>
//                     Best months data not found.<br/>
//                     <span style={{ fontSize: '12px' }}>
//                       Expected file: <code>{job.site_name}_tmy_Months.csv</code> in the job folder.
//                     </span>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* ══ DOWNLOAD ══ */}
//             {tab === 'download' && (
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

//                 <div style={{ background: 'white', borderRadius: '20px', border: `2px solid ${G}`, padding: '28px 24px', boxShadow: `0 8px 32px rgba(141,198,63,0.12)` }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//                     <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: GL, border: `2px solid ${G}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>📦</div>
//                     <div style={{ flex: 1 }}>
//                       <div style={{ fontWeight: 700, color: '#14532d', fontSize: '16px' }}>Complete TMY Package</div>
//                       <div style={{ color: '#6b7280', fontSize: '13px', marginTop: '3px' }}>ZIP containing all files below</div>
//                     </div>
//                     <button onClick={handleDownload} disabled={dlLoading}
//                       style={{ background: `linear-gradient(135deg, ${G}, ${GD})`, color: 'white', border: 'none', padding: '12px 28px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: dlLoading ? 'not-allowed' : 'pointer', opacity: dlLoading ? 0.7 : 1, boxShadow: `0 4px 14px rgba(141,198,63,0.35)`, whiteSpace: 'nowrap' }}>
//                       {dlLoading ? 'Preparing…' : '⬇ Download ZIP'}
//                     </button>
//                   </div>
//                 </div>

//                 <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '24px', boxShadow: '0 4px 24px rgba(141,198,63,0.07)' }}>
//                   <h3 style={{ fontWeight: 700, color: '#14532d', fontSize: '15px', margin: '0 0 16px' }}>Files included in the package</h3>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//                     {[
//                       { icon: '📄', name: `${job.site_name}_Report.docx`,                       desc: 'Full TMY report (English)' },
//                       { icon: '📄', name: `${job.site_name}_Report_français.docx`,              desc: 'Full TMY report (French)' },
//                       { icon: '📄', name: `${job.site_name}_Uncertainty_Report_français.docx`,  desc: 'Uncertainty analysis report' },
//                       { icon: '📊', name: `dataset_${job.site_name}.csv`,                       desc: 'Full ERA5 + CAMS merged dataset' },
//                       { icon: '📅', name: `${job.site_name}_tmy_Months.csv`,                   desc: 'Selected best year per month' },
//                       { icon: '🌤', name: `tmy_files/TMY_P50_pvgis_{lat}_{lon}.csv`,           desc: 'TMY P50 — median year (PVGIS format)' },
//                       { icon: '🌤', name: `tmy_files/TMY_P50_PVsyst_{lat}_{lon}.csv`,          desc: 'TMY P50 (PVsyst format)' },
//                       { icon: '🌤', name: `tmy_files/TMY_P50_SAM_{lat}_{lon}.csv`,             desc: 'TMY P50 (SAM format)' },
//                       { icon: '🌤', name: `tmy_files/TMY_P75 / P90 / P99 …`,                   desc: 'Pessimistic scenarios (same 3 formats each)' },
//                       { icon: '🖼', name: `plot/`,                                              desc: 'All generated charts (JPEG + PNG)' },
//                     ].map(f => (
//                       <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: GL, borderRadius: '10px', border: `1px solid ${GB}` }}>
//                         <span style={{ fontSize: '18px' }}>{f.icon}</span>
//                         <div style={{ flex: 1 }}>
//                           <div style={{ fontSize: '12px', fontWeight: 600, color: '#1f2937', fontFamily: 'monospace' }}>{f.name}</div>
//                           <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '1px' }}>{f.desc}</div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//           </>
//         )}
//       </div>
//     </div>
//   );
// }



'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { downloadJob } from '@/lib/api';
import React from 'react';

const G    = '#8DC63F';
const GD   = '#5a8a1f';
const GL   = '#f4faeb';
const GB   = '#c5e08a';
const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const MONTHS     = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];

type Tab = 'summary' | 'plots' | 'months' | 'download';

async function authFetch(path: string) {
  const token = localStorage.getItem('access_token') || '';
  const res   = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

async function fetchImageBlob(url: string): Promise<string> {
  const token = localStorage.getItem('access_token') || '';
  const res   = await fetch(`${BASE}${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('image fetch failed');
  return URL.createObjectURL(await res.blob());
}

/* ── SVG icons ── */
const Icon = {
  back:     <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>,
  summary:  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  plots:    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 4-6"/></svg>,
  months:   <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  download: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>,
  file:     <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>,
  zip:      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>,
  csv:      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18"/></svg>,
  image:    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>,
  sun:      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
};

/* ── Plot card — smaller size ── */
function PlotCard({ plot }: { plot: { name: string; url: string } }) {
  const [src,    setSrc]    = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchImageBlob(plot.url).then(setSrc).catch(() => setFailed(true));
  }, [plot.url]);

  const title = plot.name.replace(/\.(jpeg|jpg|png)$/i, '').replace(/_/g, ' ');

  return (
    <div style={{ background: 'white', borderRadius: '16px', border: `1px solid ${GB}`, padding: '16px', boxShadow: '0 2px 12px rgba(141,198,63,0.07)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h3 style={{ fontWeight: 600, color: '#14532d', fontSize: '13px', margin: 0, textTransform: 'capitalize' }}>{title}</h3>
        {src && (
          <button onClick={() => setExpanded(!expanded)}
            style={{ fontSize: '11px', color: G, background: GL, border: `1px solid ${GB}`, borderRadius: '6px', padding: '3px 8px', cursor: 'pointer', fontWeight: 600 }}>
            {expanded ? 'Shrink' : 'Expand'}
          </button>
        )}
      </div>
      {failed ? (
        <div style={{ color: '#9ca3af', fontSize: '13px', padding: '16px', textAlign: 'center', background: GL, borderRadius: '8px' }}>Could not load image</div>
      ) : src ? (
        <img src={src} alt={title}
          style={{ width: expanded ? '100%' : '60%', maxWidth: expanded ? '100%' : '480px', display: 'block', margin: '0 auto', borderRadius: '10px', border: `1px solid ${GB}`, cursor: 'pointer', transition: 'width 0.3s ease' }}
          onClick={() => setExpanded(!expanded)}
        />
      ) : (
        <div style={{ height: '120px', background: GL, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '13px' }}>Loading…</div>
      )}
    </div>
  );
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const jobId        = searchParams.get('job_id');

  const [job,       setJob]       = useState<any>(null);
  const [results,   setResults]   = useState<any>(null);
  const [tab,       setTab]       = useState<Tab>('summary');
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');
  const [dlLoading, setDlLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('access_token')) { router.push('/login'); return; }
    if (!jobId) return;
    Promise.all([
      authFetch(`/api/tmy/status/${jobId}/`),
      authFetch(`/api/tmy/results/${jobId}/`),
    ])
      .then(([jobData, resData]) => { setJob(jobData); setResults(resData); })
      .catch(e => setError(`Failed to load results: ${e.message}`))
      .finally(() => setLoading(false));
  }, [jobId]);

  const handleDownload = async () => {
    setDlLoading(true);
    try {
      const res  = await downloadJob(jobId);
      const url  = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href  = url;
      link.setAttribute('download', `TMY_${job?.site_name ?? jobId}.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch { alert('Download failed. Please try again.'); }
    finally  { setDlLoading(false); }
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'summary',  label: 'Summary',     icon: Icon.summary  },
    { id: 'plots',    label: 'Plots',       icon: Icon.plots    },
    { id: 'months',   label: 'Best Months', icon: Icon.months   },
    { id: 'download', label: 'Download',    icon: Icon.download },
  ];

  return (
    <div style={{ minHeight: '100vh', background: GL, fontFamily: 'sans-serif' }}>

      {/* NAVBAR */}
      <nav style={{ background: 'white', borderBottom: `2px solid ${G}`, padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 8px rgba(141,198,63,0.10)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => router.back()}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: G, fontWeight: 600, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: '8px' }}
            onMouseEnter={e => (e.currentTarget.style.background = GL)}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
            {Icon.back} Back
          </button>
          <div style={{ width: '1px', height: '24px', background: GB }}/>
          <span style={{ fontWeight: 700, fontSize: '18px', color: GD }}>TMY Results</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => router.push('/jobs')}
            style={{ color: G, fontWeight: 500, fontSize: '14px', background: GL, border: `1px solid ${GB}`, padding: '6px 14px', borderRadius: '8px', cursor: 'pointer' }}>
            History
          </button>
          <button onClick={() => router.push('/generate')}
            style={{ color: 'white', fontWeight: 600, fontSize: '14px', background: `linear-gradient(135deg, ${G}, ${GD})`, border: 'none', padding: '6px 16px', borderRadius: '8px', cursor: 'pointer' }}>
            + New Job
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px 60px' }}>

        {loading && <div style={{ textAlign: 'center', color: '#9ca3af', padding: '80px 0', fontSize: '15px' }}>Loading results…</div>}
        {error   && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '16px', borderRadius: '12px', fontSize: '14px' }}>{error}</div>}

        {!loading && !error && job && results && (
          <>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#eaf5d0', color: G, fontSize: '12px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Job #{jobId} · Completed
              </div>
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#14532d', margin: '0 0 4px' }}>{job.site_name}</h1>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                {job.latitude}, {job.longitude} &nbsp;·&nbsp; {job.start_year} – {job.end_year}
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '24px' }}>
              {[
                { label: 'Annual GHI', value: results.stats?.annual_ghi ? `${results.stats.annual_ghi} kWh/m²` : '—' },
                { label: 'Annual DNI', value: results.stats?.annual_dni ? `${results.stats.annual_dni} kWh/m²` : '—' },
                { label: 'Mean Temp',  value: results.stats?.mean_temp  ? `${results.stats.mean_temp} °C`      : '—' },
                { label: 'Mean Wind',  value: results.stats?.mean_wind  ? `${results.stats.mean_wind} m/s`     : '—' },
              ].map(s => (
                <div key={s.label} style={{ background: 'white', borderRadius: '16px', border: `1px solid ${GB}`, padding: '16px 20px', boxShadow: '0 2px 12px rgba(141,198,63,0.07)' }}>
                  <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{s.label}</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: GD }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Tabs — icons only, no emojis */}
            <div style={{ display: 'flex', gap: '4px', background: 'white', border: `1px solid ${GB}`, borderRadius: '14px', padding: '5px', marginBottom: '20px', width: 'fit-content' }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                    fontSize: '13px', fontWeight: 600, transition: 'all 0.15s',
                    background: tab === t.id ? `linear-gradient(135deg, ${G}, ${GD})` : 'transparent',
                    color:      tab === t.id ? 'white' : '#6b7280',
                  }}>
                  {t.icon} {t.label}
                </button>
              ))}
            </div>

            {/* ══ SUMMARY ══ */}
            {tab === 'summary' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '24px', boxShadow: '0 4px 24px rgba(141,198,63,0.07)' }}>
                  <h3 style={{ fontWeight: 700, color: '#14532d', fontSize: '15px', margin: '0 0 16px' }}>Site Information</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', fontSize: '14px' }}>
                    {[
                      ['Site Name', job.site_name],
                      ['Latitude',  job.latitude],
                      ['Longitude', job.longitude],
                      ['Period',    `${job.start_year} → ${job.end_year}`],
                      ['Years',     `${(job.end_year - job.start_year) + 1} years`],
                      ['Method',    'Sandia / NREL'],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <div style={{ color: '#9ca3af', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                        <div style={{ color: '#1f2937', fontWeight: 600, marginTop: '4px' }}>{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {results.monthly_ghi && (
                  <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '24px', boxShadow: '0 4px 24px rgba(141,198,63,0.07)' }}>
                    <h3 style={{ fontWeight: 700, color: '#14532d', fontSize: '15px', margin: '0 0 16px' }}>Monthly GHI — TMY vs Long-term Average (kWh/m²)</h3>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '140px' }}>
                      {MONTHS.map((m, i) => {
                        const tmy = results.monthly_ghi?.tmy?.[i] ?? 0;
                        const avg = results.monthly_ghi?.avg?.[i] ?? 0;
                        const max = Math.max(...(results.monthly_ghi?.tmy ?? [1]), ...(results.monthly_ghi?.avg ?? [1]));
                        return (
                          <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                            <div style={{ width: '100%', display: 'flex', gap: '2px', alignItems: 'flex-end', height: '110px' }}>
                              <div title={`TMY: ${tmy}`} style={{ flex: 1, background: G,  borderRadius: '4px 4px 0 0', height: `${(tmy/max)*110}px` }}/>
                              <div title={`Avg: ${avg}`} style={{ flex: 1, background: GB, borderRadius: '4px 4px 0 0', height: `${(avg/max)*110}px` }}/>
                            </div>
                            <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600 }}>{m}</div>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '10px', fontSize: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '10px', height: '10px', background: G,  borderRadius: '2px', display: 'inline-block' }}/> TMY</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '10px', height: '10px', background: GB, borderRadius: '2px', display: 'inline-block' }}/> Long-term avg</span>
                    </div>
                  </div>
                )}

                {results.monthly_temp && (
                  <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '24px', boxShadow: '0 4px 24px rgba(141,198,63,0.07)' }}>
                    <h3 style={{ fontWeight: 700, color: '#14532d', fontSize: '15px', margin: '0 0 16px' }}>Monthly Mean Temperature — TMY (°C)</h3>
                    <div style={{ display: 'flex', gap: '0', alignItems: 'flex-end', height: '120px' }}>
                      {MONTHS.map((m, i) => {
                        const val  = results.monthly_temp?.[i] ?? 0;
                        const vals = results.monthly_temp ?? [];
                        const mn   = Math.min(...vals);
                        const mx   = Math.max(...vals);
                        const norm = mx === mn ? 0.5 : (val - mn) / (mx - mn);
                        return (
                          <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <div style={{ fontSize: '10px', color: GD, fontWeight: 700 }}>{val.toFixed(1)}</div>
                            <div style={{ width: '80%', background: `rgba(141,198,63,${0.3 + norm * 0.7})`, borderRadius: '6px 6px 0 0', height: `${40 + norm * 60}px`, border: `1px solid ${GB}` }}/>
                            <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600 }}>{m}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ══ PLOTS — smaller size with expand ══ */}
            {tab === 'plots' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {results.plots && results.plots.length > 0 ? (
                  results.plots.map((plot: { name: string; url: string }, idx: number) => (
                    <PlotCard key={idx} plot={plot} />
                  ))
                ) : (
                  <div style={{ gridColumn: '1/-1', background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '40px', textAlign: 'center', color: '#9ca3af' }}>
                    No plots available for this job.
                  </div>
                )}
              </div>
            )}

            {/* ══ BEST MONTHS — reads best_months from API ══ */}
            {tab === 'months' && (
              <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '24px', boxShadow: '0 4px 24px rgba(141,198,63,0.07)' }}>
                <h3 style={{ fontWeight: 700, color: '#14532d', fontSize: '15px', margin: '0 0 4px' }}>Selected Best Year per Month</h3>
                <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 20px' }}>Sandia/NREL method — Finkelstein-Schafer statistic</p>

                {results.best_months && Object.keys(results.best_months).length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
                    {MONTH_FULL.map((mName, i) => {
                      /* API returns keys as strings "1".."12" */
                      const entry = results.best_months[String(i + 1)]
                                 ?? results.best_months[i + 1];
                      return (
                        <div key={mName} style={{ background: GL, borderRadius: '14px', padding: '16px 18px', border: `1px solid ${GB}` }}>
                          <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                            {mName}
                          </div>
                          {entry ? (
                            <>
                              <div style={{ fontSize: '28px', fontWeight: 800, color: GD }}>
                                {entry.best_year ?? entry.year ?? entry}
                              </div>
                              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Selected year</div>
                              {entry.fs_score != null && (
                                <div style={{ fontSize: '11px', color: G, marginTop: '2px', fontWeight: 600 }}>
                                  FS: {Number(entry.fs_score).toFixed(4)}
                                </div>
                              )}
                            </>
                          ) : (
                            <div style={{ fontSize: '22px', color: '#d1d5db', fontWeight: 700 }}>—</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* ── Debug info so you can fix the backend ── */
                  <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '20px' }}>
                    <p style={{ color: '#92400e', fontWeight: 700, fontSize: '14px', margin: '0 0 8px' }}>
                      Best months data not found in API response.
                    </p>
                    <p style={{ color: '#78350f', fontSize: '13px', margin: '0 0 8px' }}>
                      The <code>/api/tmy/results/{jobId}/</code> endpoint returned:
                    </p>
                    <pre style={{ background: '#fef3c7', padding: '10px', borderRadius: '8px', fontSize: '11px', color: '#78350f', overflow: 'auto', maxHeight: '200px' }}>
                      {JSON.stringify({ best_months: results.best_months }, null, 2)}
                    </pre>
                    <p style={{ color: '#78350f', fontSize: '12px', margin: '8px 0 0' }}>
                      Expected: <code>{`{ "best_months": { "1": { "best_year": 2018 }, "2": ... } }`}</code>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ══ DOWNLOAD ══ */}
            {tab === 'download' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'white', borderRadius: '20px', border: `2px solid ${G}`, padding: '28px 24px', boxShadow: `0 8px 32px rgba(141,198,63,0.12)` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: GL, border: `2px solid ${G}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: G, flexShrink: 0 }}>
                      {Icon.zip}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: '#14532d', fontSize: '16px' }}>Complete TMY Package</div>
                      <div style={{ color: '#6b7280', fontSize: '13px', marginTop: '3px' }}>ZIP containing all files below</div>
                    </div>
                    <button onClick={handleDownload} disabled={dlLoading}
                      style={{ background: `linear-gradient(135deg, ${G}, ${GD})`, color: 'white', border: 'none', padding: '12px 28px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: dlLoading ? 'not-allowed' : 'pointer', opacity: dlLoading ? 0.7 : 1, whiteSpace: 'nowrap' }}>
                      {dlLoading ? 'Preparing…' : 'Download ZIP'}
                    </button>
                  </div>
                </div>

                <div style={{ background: 'white', borderRadius: '20px', border: `1px solid ${GB}`, padding: '24px', boxShadow: '0 4px 24px rgba(141,198,63,0.07)' }}>
                  <h3 style={{ fontWeight: 700, color: '#14532d', fontSize: '15px', margin: '0 0 16px' }}>Files included in the package</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { icon: Icon.file, name: `${job.site_name}_Report.docx`,                      desc: 'Full TMY report (English)' },
                      { icon: Icon.file, name: `${job.site_name}_Report_français.docx`,             desc: 'Full TMY report (French)' },
                      { icon: Icon.file, name: `${job.site_name}_Uncertainty_Report_français.docx`, desc: 'Uncertainty analysis report' },
                      { icon: Icon.csv,  name: `dataset_${job.site_name}.csv`,                      desc: 'Full ERA5 + CAMS merged dataset' },
                      { icon: Icon.csv,  name: `${job.site_name}_tmy_Months.csv`,                   desc: 'Selected best year per month' },
                      { icon: Icon.sun,  name: `tmy_files/TMY_P50_pvgis_*.csv`,                     desc: 'TMY P50 — median year (PVGIS format)' },
                      { icon: Icon.sun,  name: `tmy_files/TMY_P50_PVsyst_*.csv`,                    desc: 'TMY P50 (PVsyst format)' },
                      { icon: Icon.sun,  name: `tmy_files/TMY_P50_SAM_*.csv`,                       desc: 'TMY P50 (SAM format)' },
                      { icon: Icon.sun,  name: `tmy_files/TMY_P75 / P90 / P99 …`,                  desc: 'Pessimistic scenarios (3 formats each)' },
                      { icon: Icon.image,name: `plot/`,                                             desc: 'All generated charts (JPEG + PNG)' },
                    ].map(f => (
                      <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: GL, borderRadius: '10px', border: `1px solid ${GB}` }}>
                        <span style={{ color: GD, flexShrink: 0 }}>{f.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: '#1f2937', fontFamily: 'monospace' }}>{f.name}</div>
                          <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '1px' }}>{f.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}