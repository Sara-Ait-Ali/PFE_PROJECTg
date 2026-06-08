const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// ── AUTH ──────────────────────────────────────────
export async function registerUser(username, email, password) {
  const res = await fetch(`${BASE_URL}/api/auth/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
}

export async function loginUser(username, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

// ── TMY JOBS ──────────────────────────────────────
export async function submitTMYJob(data, token) {
  const res = await fetch(`${BASE_URL}/api/tmy/submit/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getJobStatus(jobId, token) {
  const res = await fetch(`${BASE_URL}/api/tmy/status/${jobId}/`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
}

export async function getAllJobs(token) {
  const res = await fetch(`${BASE_URL}/api/tmy/all/`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
}