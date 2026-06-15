// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import dynamic from 'next/dynamic';
// import { submitTMYJob } from '@/lib/api';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const MapPicker = dynamic(() => import('@/components/MapPicker'), { ssr: false });

// export default function GeneratePage() {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     site_name: '',
//     latitude: '',
//     longitude: '',
//     start_date: new Date('2005-01-01'),
//     end_date: new Date('2024-12-31'),
//     });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!localStorage.getItem('access_token')) {
//       router.push('/login');
//     }
//   }, []);

//   const handleMapClick = async (lat, lon) => {
//     setForm({ ...form, latitude: lat.toFixed(6), longitude: lon.toFixed(6) });
//     try {
//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
//       );
//       const data = await res.json();
//       const city = data.address?.city || data.address?.town || data.address?.village || '';
//       const country = data.address?.country || '';
//       if (city || country) {
//         setForm((prev) => ({
//           ...prev,
//           latitude: lat.toFixed(6),
//           longitude: lon.toFixed(6),
//           site_name: `${city}${city && country ? '-' : ''}${country}`,
//         }));
//       }
//     } catch (e) {}
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       const res = await submitTMYJob({
//         ...form,
//         latitude: parseFloat(form.latitude),
//         longitude: parseFloat(form.longitude),
//         start_year: parseInt(form.start_year),
//         end_year: parseInt(form.end_year),
//       });
//       router.push(`/status?job_id=${res.data.job_id}`);
//     } catch (err) {
//       setError('Failed to submit job. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen" style={{ background: '#F4FAE8'}}>

//       {/* NAVBAR */}
//       <nav style={{background: '#FFFFFF',borderBottom: '2px solid #8DC63F', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 8px rgba(141,198,63,0.10)' }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//           {/* Back arrow */}
//           <button
//             onClick={() => router.back()}
//             style={{ display: 'flex', alignItems: 'center', gap: '6px',color: '#6A9E28', fontWeight: 600, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: '8px', transition: 'background 0.15s' }}
//             onMouseEnter={e => e.currentTarget.style.background = '#EAF5CE'}
//             onMouseLeave={e => e.currentTarget.style.background = 'none'}
//           >
//             <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
//             Back
//           </button>
//           <div style={{ width: '1px', height: '24px', background: '#C8E47A' }}/>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #8DC63F, #6A9E28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               <span style={{ fontSize: '16px' }}>☀️</span>
//             </div>
//             <span style={{ fontWeight: 700, fontSize: '18px', color: '#4E7A1A' }}>TMY Generator</span>
//           </div>
//         </div>
//         <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
//           <button
//             onClick={() => router.push('/jobs')}
//             style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6A9E28', fontWeight: 500, fontSize: '14px', background: '#EAF5CE', border: '1px solid #C8E47A', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer' }}
//           >
//             📋 History
//           </button>
//           <button
//             onClick={() => { localStorage.clear(); router.push('/login'); }}
//             style={{ color: '#9ca3af', fontWeight: 500, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px' }}
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       {/* PAGE HEADER */}
//       <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 0' }}>
//         <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
//           <span style={{ background: '#EAF5CE', color: '#6A9E28', fontSize: '12px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>New Job</span>
//         </div>
//         <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#4E7A1A', margin: '0 0 6px' }}>Generate TMY File</h1>
//         <p style={{ color: '#6b7280', fontSize: '15px', margin: 0 }}>
//           Click on the map to pick a location — coordinates and site name fill automatically.
//         </p>
//       </div>

//       {/* MAIN CONTENT */}
//       <div style={{ maxWidth: '1100px', margin: '24px auto', padding: '0 24px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

//         {/* MAP CARD */}
//         <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 10px 30px rgba(141,198,63,0.08)', overflow: 'hidden' }}>
//           <div style={{ padding: '18px 20px 12px', borderBottom: '1px solid #EAF5CE', display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8DC63F' }}/>
//             <span style={{ fontWeight: 600, color: '#4E7A1A', fontSize: '15px' }}>Select Location</span>
//           </div>
//           <div style={{ height: '420px' }}>
//             <MapPicker
//               lat={parseFloat(form.latitude) || null}
//               lon={parseFloat(form.longitude) || null}
//               onLocationSelect={handleMapClick}
//             />
//           </div>
//           <div style={{ padding: '10px 20px', background: '#F4FAE8', display: 'flex', alignItems: 'center', gap: '6px' }}>
//             <svg width="14" height="14" fill="none" stroke="#8DC63F" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
//             <span style={{ fontSize: '12px', color: '#6b7280' }}>Click anywhere on the map to set coordinates</span>
//           </div>
//         </div>

//         {/* FORM CARD */}
//         <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 10px 30px rgba(141,198,63,0.08)', padding: '24px' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
//             <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8DC63F' }}/>
//             <span style={{ fontWeight: 600, color: '#4E7A1A', fontSize: '15px' }}>Job Parameters</span>
//           </div>

//           {error && (
//             <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px' }}>
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

//             {/* Site name */}
//             <div>
//               <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Site Name</label>
//               <input
//                 type="text"
//                 required
//                 value={form.site_name}
//                 onChange={(e) => setForm({ ...form, site_name: e.target.value })}
//                 placeholder="e.g. Marrakech-Morocco"
//                 style={{ width: '100%', border: '1.5px solid #D1D5DB', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: '#1f2937', outline: 'none', boxSizing: 'border-box', transition: 'border 0.15s' }}
//                 onFocus={e => e.target.style.border = '1.5px solid #8DC63F'}
//                 onBlur={e => e.target.style.border = '1.5px solid #C8E47A'}
//               />
//             </div>

//             {/* Lat / Lon */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
//               <div>
//                 <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Latitude</label>
//                 <input
//                   type="number" step="any" required
//                   value={form.latitude}
//                   onChange={(e) => setForm({ ...form, latitude: e.target.value })}
//                   placeholder="31.6295"
//                   style={{ width: '100%', border: '1.5px solid #D1D5DB', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: '#1f2937', outline: 'none', boxSizing: 'border-box' }}
//                   onFocus={e => e.target.style.border = '1.5px solid #8DC63F'}
//                   onBlur={e => e.target.style.border = '1.5px solid #C8E47A'}
//                 />
//               </div>
//               <div>
//                 <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Longitude</label>
//                 <input
//                   type="number" step="any" required
//                   value={form.longitude}
//                   onChange={(e) => setForm({ ...form, longitude: e.target.value })}
//                   placeholder="-7.9811"
//                   style={{ width: '100%', border: '1.5px solid #D1D5DB', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: '#1f2937', outline: 'none', boxSizing: 'border-box' }}
//                   onFocus={e => e.target.style.border = '1.5px solid #8DC63F'}
//                   onBlur={e => e.target.style.border = '1.5px solid #C8E47A'}
//                 />
//               </div>
//             </div>

//             {/* Years */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
//               <div>
//                 <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Start Year</label>
//                 <input
//                   type="number" required min="2000" max="2023"
//                   value={form.start_year}
//                   onChange={(e) => setForm({ ...form, start_year: e.target.value })}
//                   style={{ width: '100%', border: '1.5px solid #D1D5DB', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: '#1f2937', outline: 'none', boxSizing: 'border-box' }}
//                   onFocus={e => e.target.style.border = '1.5px solid #8DC63F'}
//                   onBlur={e => e.target.style.border = '1.5px solid #C8E47A'}
//                 />
//               </div>
//               <div>
//                 <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>End Year</label>
//                 <input
//                   type="number" required min="2000" max="2024"
//                   value={form.end_year}
//                   onChange={(e) => setForm({ ...form, end_year: e.target.value })}
//                   style={{ width: '100%', border: '1.5px solid #D1D5DB', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: '#1f2937', outline: 'none', boxSizing: 'border-box' }}
//                   onFocus={e => e.target.style.border = '1.5px solid #8DC63F'}
//                   onBlur={e => e.target.style.border = '1.5px solid #C8E47A'}
//                 />
//               </div>
//             </div>

//             {/* Selected location preview */}
//             {form.latitude && form.longitude && (
//               <div style={{ background: '#F4FAE8', border: '1px solid #C8E47A', borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 <span style={{ fontSize: '16px' }}>📍</span>
//                 <div>
//                   <div style={{ fontSize: '12px', color: '#6b7280' }}>Selected coordinates</div>
//                   <div style={{ fontSize: '13px', fontWeight: 600, color: '#4E7A1A', fontFamily: 'monospace' }}>{form.latitude}, {form.longitude}</div>
//                 </div>
//               </div>
//             )}

//             {/* Submit button */}
//             <button
//               type="submit"
//               disabled={loading || !form.latitude || !form.longitude}
//               style={{
//                 width: '100%',
//                 padding: '13px',
//                 borderRadius: '12px',
//                 border: 'none',
//                 cursor: loading || !form.latitude || !form.longitude ? 'not-allowed' : 'pointer',
//                 fontSize: '15px',
//                 fontWeight: 700,
//                 color: 'white',
//                 background: loading || !form.latitude || !form.longitude
//                   ? '#C8E47A'
//                   : 'linear-gradient(135deg, #8DC63F, #6A9E28)',
//                 boxShadow: loading || !form.latitude || !form.longitude ? 'none' : '0 4px 14px rgba(141,198,63,0.40)',
//                 transition: 'all 0.2s',
//                 marginTop: '4px',
//                 letterSpacing: '0.01em'
//               }}
//             >
//               {loading ? '⏳ Submitting...' : ' Generate TMY File'}
//             </button>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { submitTMYJob } from '@/lib/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MapPicker = dynamic(() => import('@/components/MapPicker'), { ssr: false });

export default function GeneratePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    site_name: '',
    latitude: '',
    longitude: '',
    start_date: new Date('2005-01-01'),
    end_date: new Date('2024-12-31'),
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

  const yearDiff = form.start_date && form.end_date
    ? (form.end_date - form.start_date) / (1000 * 60 * 60 * 24 * 365.25)
    : 0;

  const isFormValid =
    form.latitude &&
    form.longitude &&
    form.start_date &&
    form.end_date &&
    yearDiff >= 9;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await submitTMYJob({
        site_name: form.site_name,
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
        start_year: form.start_date.getFullYear(),
        end_year: form.end_date.getFullYear(),
        start_date: form.start_date.toISOString().split('T')[0],
        end_date: form.end_date.toISOString().split('T')[0],
      });
      router.push(`/status?job_id=${res.data.job_id}`);
    } catch (err) {
      setError('Failed to submit job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    border: '1.5px solid #D1D5DB',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '14px',
    color: '#1f2937',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border 0.15s',
    background: 'white',
  };

  return (
    <>
      {/* Green datepicker styles */}
      <style>{`
        .react-datepicker__header {
          background-color: #8DC63F !important;
          border-bottom: none !important;
        }
        .react-datepicker__current-month,
        .react-datepicker__day-name,
        .react-datepicker-year-header {
          color: white !important;
          font-weight: 600 !important;
        }
        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected,
        .react-datepicker__month-text--selected,
        .react-datepicker__year-text--selected {
          background-color: #8DC63F !important;
          color: white !important;
          border-radius: 6px !important;
        }
        .react-datepicker__day:hover {
          background-color: #EAF5CE !important;
          color: #4E7A1A !important;
          border-radius: 6px !important;
        }
        .react-datepicker__navigation-icon::before {
          border-color: white !important;
        }
        .react-datepicker__year-read-view--down-arrow,
        .react-datepicker__month-read-view--down-arrow {
          border-color: white !important;
        }
        .react-datepicker__year-dropdown,
        .react-datepicker__month-dropdown {
          background: white !important;
          border: 1px solid #C8E47A !important;
          border-radius: 8px !important;
        }
        .react-datepicker__year-option:hover,
        .react-datepicker__month-option:hover {
          background-color: #EAF5CE !important;
          color: #4E7A1A !important;
        }
        .react-datepicker__today-button {
          background: #8DC63F !important;
          color: white !important;
          border-top: none !important;
          border-radius: 0 0 8px 8px !important;
        }
        .react-datepicker-wrapper {
          width: 100% !important;
        }
        .react-datepicker__input-container {
          width: 100% !important;
        }
      `}</style>

      <div className="min-h-screen" style={{ background: '#F4FAE8' }}>

        {/* NAVBAR */}
        <nav style={{ background: '#FFFFFF', borderBottom: '2px solid #8DC63F', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 8px rgba(141,198,63,0.10)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => router.back()}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6A9E28', fontWeight: 600, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: '8px' }}
              onMouseEnter={e => e.currentTarget.style.background = '#EAF5CE'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Back
            </button>
            <div style={{ width: '1px', height: '24px', background: '#C8E47A' }}/>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #8DC63F, #6A9E28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '16px' }}>☀️</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: '18px', color: '#4E7A1A' }}>TMY Generator</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => router.push('/jobs')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6A9E28', fontWeight: 500, fontSize: '14px', background: '#EAF5CE', border: '1px solid #C8E47A', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer' }}
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
          <div style={{ marginBottom: '8px' }}>
            <span style={{ background: '#EAF5CE', color: '#6A9E28', fontSize: '12px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>New Job</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#4E7A1A', margin: '0 0 6px' }}>Generate TMY File</h1>
          <p style={{ color: '#6b7280', fontSize: '15px', margin: 0 }}>
            Click on the map to pick a location — coordinates and site name fill automatically.
          </p>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ maxWidth: '1100px', margin: '24px auto', padding: '0 24px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* MAP CARD */}
          <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 10px 30px rgba(141,198,63,0.08)', overflow: 'hidden' }}>
            <div style={{ padding: '18px 20px 12px', borderBottom: '1px solid #EAF5CE', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8DC63F' }}/>
              <span style={{ fontWeight: 600, color: '#4E7A1A', fontSize: '15px' }}>Select Location</span>
            </div>
            <div style={{ height: '420px' }}>
              <MapPicker
                lat={parseFloat(form.latitude) || null}
                lon={parseFloat(form.longitude) || null}
                onLocationSelect={handleMapClick}
              />
            </div>
            <div style={{ padding: '10px 20px', background: '#F4FAE8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" fill="none" stroke="#8DC63F" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Click anywhere on the map to set coordinates</span>
            </div>
          </div>

          {/* FORM CARD */}
          <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 10px 30px rgba(141,198,63,0.08)', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8DC63F' }}/>
              <span style={{ fontWeight: 600, color: '#4E7A1A', fontSize: '15px' }}>Job Parameters</span>
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
                  style={inputStyle}
                  onFocus={e => e.target.style.border = '1.5px solid #8DC63F'}
                  onBlur={e => e.target.style.border = '1.5px solid #D1D5DB'}
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
                    style={inputStyle}
                    onFocus={e => e.target.style.border = '1.5px solid #8DC63F'}
                    onBlur={e => e.target.style.border = '1.5px solid #D1D5DB'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Longitude</label>
                  <input
                    type="number" step="any" required
                    value={form.longitude}
                    onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                    placeholder="-7.9811"
                    style={inputStyle}
                    onFocus={e => e.target.style.border = '1.5px solid #8DC63F'}
                    onBlur={e => e.target.style.border = '1.5px solid #D1D5DB'}
                  />
                </div>
              </div>

              {/* Date pickers */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Start Date</label>
                  <DatePicker
                    selected={form.start_date}
                    onChange={(date) => setForm({ ...form, start_date: date })}
                    dateFormat="dd/MM/yyyy"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    todayButton="Today"
                    customInput={
                      <input
                        style={{ ...inputStyle, cursor: 'pointer' }}
                        onFocus={e => e.target.style.border = '1.5px solid #8DC63F'}
                        onBlur={e => e.target.style.border = '1.5px solid #D1D5DB'}
                      />
                    }
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>End Date</label>
                  <DatePicker
                    selected={form.end_date}
                    onChange={(date) => setForm({ ...form, end_date: date })}
                    dateFormat="dd/MM/yyyy"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    todayButton="Today"
                    minDate={
                      form.start_date
                        ? new Date(new Date(form.start_date).setFullYear(form.start_date.getFullYear() + 9))
                        : null
                    }
                    customInput={
                      <input
                        style={{ ...inputStyle, cursor: 'pointer' }}
                        onFocus={e => e.target.style.border = '1.5px solid #8DC63F'}
                        onBlur={e => e.target.style.border = '1.5px solid #D1D5DB'}
                      />
                    }
                  />
                </div>
              </div>

              {/* Date gap feedback */}
              {form.start_date && form.end_date && (
                yearDiff < 9 ? (
                  <div style={{ background: '#fef9c3', border: '1px solid #fde047', color: '#854d0e', padding: '10px 14px', borderRadius: '10px', fontSize: '13px' }}>
                    ⚠️ Minimum period is 9 years. Currently: {Math.floor(yearDiff)} years.
                  </div>
                ) : (
                  <div style={{ background: '#F4FAE8', border: '1px solid #C8E47A', color: '#4E7A1A', padding: '10px 14px', borderRadius: '10px', fontSize: '13px' }}>
                    ✓ Period: {Math.floor(yearDiff)} years selected.
                  </div>
                )
              )}

              {/* Selected location preview */}
              {form.latitude && form.longitude && (
                <div style={{ background: '#F4FAE8', border: '1px solid #C8E47A', borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>📍</span>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Selected coordinates</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#4E7A1A', fontFamily: 'monospace' }}>{form.latitude}, {form.longitude}</div>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || !isFormValid}
                style={{
                  width: '100%',
                  padding: '13px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: loading || !isFormValid ? 'not-allowed' : 'pointer',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'white',
                  background: loading || !isFormValid
                    ? '#C8E47A'
                    : 'linear-gradient(135deg, #8DC63F, #6A9E28)',
                  boxShadow: loading || !isFormValid ? 'none' : '0 4px 14px rgba(141,198,63,0.40)',
                  transition: 'all 0.2s',
                  marginTop: '4px',
                }}
              >
                {loading ? 'Submitting...' : 'Generate TMY File'}
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}