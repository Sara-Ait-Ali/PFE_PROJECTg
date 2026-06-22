// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { loginUser } from '@/lib/api';
// import Link from 'next/link';

// export default function LoginPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       const res = await loginUser(form);
//       localStorage.setItem('access_token', res.data.access);
//       localStorage.setItem('refresh_token', res.data.refresh);
//       router.push('/generate');
//     } catch (err) {
//       setError('Invalid username or password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

//         {/* Logo / Title */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-blue-800">TMY Generator</h1>
//           <p className="text-gray-500 mt-2">Sign in to your account</p>
//         </div>

//         {/* Error message */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
//             {error}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Username
//             </label>
//             <input
//               type="text"
//               required
//               value={form.username}
//               onChange={(e) => setForm({ ...form, username: e.target.value })}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your username"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               required
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your password"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50"
//           >
//             {loading ? 'Signing in...' : 'Sign In'}
//           </button>
//         </form>

//         {/* Register link */}
//         <p className="text-center text-sm text-gray-500 mt-6">
//           Don't have an account?{' '}
//           <Link href="/register" className="text-blue-700 font-medium hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api';
import Link from 'next/link';
import { Sun, ArrowRight, User, Lock, Eye, EyeOff } from 'lucide-react';

const GRN = '#8DC63F';
const DGRN = '#4E7A1A';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await loginUser(form);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      router.push('/generate');
    } catch (err) {
      setError("We couldn't sign you in. Please check your username and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#F8FAF5' }}>

      {/* Top green bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '3px', background: `linear-gradient(90deg, ${DGRN}, ${GRN})` }} />

      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem', textDecoration: 'none' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: GRN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sun size={18} color="#fff" />
        </div>
        <span style={{ fontSize: '17px', fontWeight: '600', color: '#111' }}>
          Clima<span style={{ color: GRN }}>Sphere</span>
        </span>
      </Link>

      {/* Card */}
      <div style={{ width: '100%', maxWidth: '440px', background: 'white', borderRadius: '24px', padding: '3rem', boxShadow: '0 15px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>

        <span style={{ display: 'inline-block', background: '#EAF3DE', color: DGRN, padding: '5px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: '600', marginBottom: '1rem' }}>
          SIGN IN
        </span>

        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>Welcome back</h2>
        <p style={{ color: '#6B7280', marginBottom: '2rem' }}>Sign in to continue to ClimaSphere.</p>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '12px', borderRadius: '10px', marginBottom: '1rem', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Username */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600' }}>Username</label>
            <div style={{ position: 'relative' }}>
              <User size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text" required
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="Enter your username"
                style={{ width: '100%', boxSizing: 'border-box', padding: '12px 14px 12px 40px', borderRadius: '12px', border: '1px solid #D1D5DB', outline: 'none', fontSize: '14px' }}
                onFocus={e => { e.target.style.borderColor = GRN; e.target.style.boxShadow = '0 0 0 3px rgba(141,198,63,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600' }}>Password</label>
              <a href="#" style={{ fontSize: '12px', color: GRN, textDecoration: 'none' }}>Forgot password?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showPassword ? 'text' : 'password'} required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
                style={{ width: '100%', boxSizing: 'border-box', padding: '12px 44px 12px 40px', borderRadius: '12px', border: '1px solid #D1D5DB', outline: 'none', fontSize: '14px' }}
                onFocus={e => { e.target.style.borderColor = GRN; e.target.style.boxShadow = '0 0 0 3px rgba(141,198,63,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = 'none'; }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'transparent', cursor: 'pointer', color: '#9CA3AF' }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            style={{ width: '100%', background: loading ? '#A7D67A' : GRN, color: 'white', border: 'none', borderRadius: '12px', padding: '13px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '15px' }}>
            {loading ? 'Signing in...' : <> Sign In <ArrowRight size={16} /> </>}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>
          Don't have an account?{' '}
          <Link href="/register" style={{ color: GRN, fontWeight: '600', textDecoration: 'none' }}>Create one</Link>
        </p>

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Link href="/" style={{ color: '#9CA3AF', fontSize: '13px', textDecoration: 'none' }}>← Back to homepage</Link>
        </div>
      </div>
    </div>
  );
}