'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getJobStatus } from '@/lib/api';

const STEPS = [
  { key: 'pending',           label: 'Job queued',              emoji: '⏳' },
  { key: 'downloading_era5',  label: 'Downloading ERA5 data',   emoji: '📡' },
  { key: 'downloading_cams',  label: 'Downloading CAMS data',   emoji: '☀️' },
  { key: 'processing_data',   label: 'Processing datasets',     emoji: '⚙️' },
  { key: 'generating_tmy',    label: 'Generating TMY',          emoji: '📊' },
  { key: 'generating_report', label: 'Generating report',       emoji: '📝' },
  { key: 'completed',         label: 'Completed',               emoji: '✅' },
  { key: 'failed',            label: 'Failed',                  emoji: '❌' },
];

export default function StatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get('job_id');
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      router.push('/login');
      return;
    }
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

    // Poll every 5 seconds until completed or failed
    const interval = setInterval(() => {
      fetchStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [jobId]);

  const currentStepIndex = STEPS.findIndex((s) => s.key === job?.status);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-800">TMY Generator</h1>
        <button
          onClick={() => router.push('/generate')}
          className="text-sm text-blue-600 hover:underline"
        >
          ← New Job
        </button>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Status</h2>
        <p className="text-gray-500 mb-6">Job ID: <span className="font-mono text-blue-700">#{jobId}</span></p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {job && (
          <>
            {/* Site info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-500">Site:</span> <span className="font-medium text-gray-800">{job.site_name}</span></div>
                <div><span className="text-gray-500">Status:</span> <span className="font-medium text-gray-800">{job.status}</span></div>
                <div><span className="text-gray-500">Latitude:</span> <span className="font-medium text-gray-800">{job.latitude}</span></div>
                <div><span className="text-gray-500">Longitude:</span> <span className="font-medium text-gray-800">{job.longitude}</span></div>
                <div><span className="text-gray-500">Period:</span> <span className="font-medium text-gray-800">{job.start_year} → {job.end_year}</span></div>
              </div>
            </div>

            {/* Stepper */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-700 mb-4">Processing Steps</h3>
              <div className="space-y-3">
                {STEPS.filter(s => s.key !== 'failed').map((step, index) => {
                  const isDone = currentStepIndex > index;
                  const isCurrent = currentStepIndex === index;
                  const isPending = currentStepIndex < index;

                  return (
                    <div key={step.key} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
                        ${isDone ? 'bg-green-100 text-green-600' :
                          isCurrent ? 'bg-blue-100 text-blue-600 animate-pulse' :
                          'bg-gray-100 text-gray-400'}`}>
                        {isDone ? '✓' : step.emoji}
                      </div>
                      <span className={`text-sm ${isDone ? 'text-green-600 font-medium' : isCurrent ? 'text-blue-700 font-semibold' : 'text-gray-400'}`}>
                        {step.label}
                      </span>
                      {isCurrent && job.status !== 'completed' && job.status !== 'failed' && (
                        <span className="text-xs text-blue-500 animate-pulse">Running...</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Failed message */}
            {job.status === 'failed' && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6">
                <p className="text-red-700 font-semibold mb-2">❌ Job Failed</p>
                <p className="text-red-600 text-sm font-mono">{job.error}</p>
              </div>
            )}

            {/* Completed */}
            {job.status === 'completed' && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
                <p className="text-green-700 font-bold text-lg mb-2">✅ TMY Generation Complete!</p>
                <p className="text-green-600 text-sm mb-4">Your files are ready.</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium">
                  📥 Download Results
                </button>
              </div>
            )}
          </>
        )}

        {!job && !error && (
          <div className="text-center text-gray-400 py-12">Loading job status...</div>
        )}
      </div>
    </div>
  );
}