'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllJobs } from '@/lib/api';

const STATUS_COLORS = {
  pending:           'bg-yellow-100 text-yellow-700',
  downloading_era5:  'bg-blue-100 text-blue-700',
  downloading_cams:  'bg-blue-100 text-blue-700',
  processing_data:   'bg-purple-100 text-purple-700',
  generating_tmy:    'bg-indigo-100 text-indigo-700',
  generating_report: 'bg-indigo-100 text-indigo-700',
  completed:         'bg-green-100 text-green-700',
  failed:            'bg-red-100 text-red-700',
};

const STATUS_EMOJI = {
  pending:           '⏳',
  downloading_era5:  '📡',
  downloading_cams:  '☀️',
  processing_data:   '⚙️',
  generating_tmy:    '📊',
  generating_report: '📝',
  completed:         '✅',
  failed:            '❌',
};

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      router.push('/login');
      return;
    }
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-800">TMY Generator</h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => router.push('/generate')}
            className="text-sm bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg"
          >
            + New Job
          </button>
          <button
            onClick={() => { localStorage.clear(); router.push('/login'); }}
            className="text-sm text-gray-500 hover:text-red-500"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Jobs History</h2>
            <p className="text-gray-500 text-sm mt-1">All your TMY generation requests</p>
          </div>
          <button
            onClick={fetchJobs}
            className="text-sm text-blue-600 hover:underline"
          >
            🔄 Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center text-gray-400 py-12">Loading...</div>
        )}

        {!loading && jobs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-400 text-lg mb-4">No jobs yet</p>
            <button
              onClick={() => router.push('/generate')}
              className="bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium"
            >
              Generate your first TMY
            </button>
          </div>
        )}

        {!loading && jobs.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-3 text-gray-600 font-semibold">ID</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-semibold">Site</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-semibold">Coordinates</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-semibold">Period</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-semibold">Status</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-semibold">Date</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-4 text-gray-500 font-mono">#{job.id}</td>
                    <td className="px-5 py-4 font-medium text-gray-800">{job.site_name}</td>
                    <td className="px-5 py-4 text-gray-500">
                      {job.latitude}, {job.longitude}
                    </td>
                    <td className="px-5 py-4 text-gray-500">
                      {job.start_year} → {job.end_year}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[job.status] || 'bg-gray-100 text-gray-600'}`}>
                        {STATUS_EMOJI[job.status]} {job.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500">
                      {new Date(job.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => router.push(`/status?job_id=${job.id}`)}
                        className="text-blue-600 hover:underline text-sm"
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