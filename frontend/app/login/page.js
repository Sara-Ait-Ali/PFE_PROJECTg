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
import { Sun, ArrowRight } from 'lucide-react';

const GRN  = '#8DC63F';
const DGRN = '#4E7A1A';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
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
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">

      {/* Top beige accent strip */}
      <div className="w-full h-1 fixed top-0 left-0" style={{ background: `linear-gradient(90deg, ${DGRN}, ${GRN}, #8bc34a)` }} />

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${GRN}, ${DGRN})` }}>
          <Sun className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-extrabold text-slate-900">
          Clima<span style={{ color: GRN }}>Sphere</span>
        </span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-sm rounded-2xl p-8 shadow-sm border"
        style={{ background: '#faf8f4', borderColor: '#e8e0d0' }}>

        <h1 className="text-2xl font-black text-slate-800 mb-1">Welcome back</h1>
        <p className="text-sm text-slate-400 mb-6">Sign in to your account</p>

        {error && (
          <div className="border px-4 py-3 rounded-xl mb-5 text-sm"
            style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#dc2626' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">Username</label>
            <input
              type="text" required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none bg-white transition"
              style={{ borderColor: '#e8e0d0' }}
              onFocus={e => e.target.style.borderColor = GRN}
              onBlur={e => e.target.style.borderColor = '#e8e0d0'}
              placeholder="Your username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">Password</label>
            <input
              type="password" required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none bg-white transition"
              style={{ borderColor: '#e8e0d0' }}
              onFocus={e => e.target.style.borderColor = GRN}
              onBlur={e => e.target.style.borderColor = '#e8e0d0'}
              placeholder="Your password"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 text-white font-semibold py-2.5 rounded-xl transition mt-1"
            style={{ background: loading ? '#9ec99e' : GRN }}>
            {loading ? 'Signing in...' : <> Sign In <ArrowRight className="w-4 h-4" /> </>}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-5">
          No account?{' '}
          <Link href="/register" className="font-semibold hover:underline" style={{ color: GRN }}>
            Register free
          </Link>
        </p>
      </div>

      <Link href="/" className="mt-6 text-xs text-slate-400 hover:text-slate-600 transition">
        ← Back to homepage
      </Link>

    </div>
  );
}