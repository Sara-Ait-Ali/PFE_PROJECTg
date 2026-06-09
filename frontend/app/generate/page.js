'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { submitTMYJob } from '@/lib/api';

// Load map only on client side (Leaflet doesn't work on server)
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

  // Redirect if not logged in
  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      router.push('/login');
    }
  }, []);

  // When user clicks on map
  const handleMapClick = async (lat, lon) => {
    setForm({ ...form, latitude: lat.toFixed(6), longitude: lon.toFixed(6) });

    // Auto-fill site name using reverse geocoding
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* Header */}
<div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
  
  {/* Left */}
  <h1 className="text-xl font-bold text-blue-800">
    TMY Generator
  </h1>

  {/* Right */}
  <div className="flex items-center gap-6">
    
    <button
      onClick={() => router.push('/jobs')}
      className="text-sm font-medium text-gray-600 hover:text-blue-700 transition"
    >
      📋 History
    </button>

    <button
      onClick={() => {
        localStorage.clear();
        router.push('/login');
      }}
      className="text-sm font-medium text-red-500 hover:text-red-700 transition"
    >
      Logout
    </button>

  </div>

</div>



      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Generate TMY File</h2>
        <p className="text-gray-500 mb-6">
          Click on the map to select a location, or fill in the coordinates manually.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* MAP */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-700 mb-3"> Select Location</h3>
            <div style={{ height: '420px' }}>
              <MapPicker
                lat={parseFloat(form.latitude) || null}
                lon={parseFloat(form.longitude) || null}
                onLocationSelect={handleMapClick}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Click anywhere on the map to set coordinates
            </p>
          </div>

          {/* FORM */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-700 mb-4">⚙️ Job Parameters</h3>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  required
                  value={form.site_name}
                  onChange={(e) => setForm({ ...form, site_name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Marrakech-Morocco"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={form.latitude}
                    onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="31.6295"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={form.longitude}
                    onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="-7.9811"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Year
                  </label>
                  <input
                    type="number"
                    required
                    min="2000"
                    max="2023"
                    value={form.start_year}
                    onChange={(e) => setForm({ ...form, start_year: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Year
                  </label>
                  <input
                    type="number"
                    required
                    min="2000"
                    max="2024"
                    value={form.end_year}
                    onChange={(e) => setForm({ ...form, end_year: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !form.latitude || !form.longitude}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 rounded-lg transition disabled:opacity-50 mt-2"
              >
                {loading ? ' Submitting...' : ' Generate TMY'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}