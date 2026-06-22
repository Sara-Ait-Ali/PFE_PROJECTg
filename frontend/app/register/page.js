// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { registerUser } from '@/lib/api';

// export default function RegisterPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setError('');

//     try {
//       await registerUser(form);

//       alert('Account created successfully!');

//       router.push('/login');
//     } catch (err) {
//       setError(
//         err.response?.data?.error ||
//         'Registration failed'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-blue-800">
//             Create Account
//           </h1>
//           <p className="text-gray-500 mt-2">
//             Register to access TMY Generator
//           </p>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Username
//             </label>
//             <input
//               type="text"
//               required
//               value={form.username}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   username: e.target.value,
//                 })
//               }
//               className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
//               placeholder="Choose a username"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               required
//               value={form.email}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   email: e.target.value,
//                 })
//               }
//               className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
//               placeholder="Enter your email"
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
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   password: e.target.value,
//                 })
//               }
//               className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
//               placeholder="Create a password"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50"
//           >
//             {loading ? 'Creating Account...' : 'Register'}
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-500 mt-6">
//           Already have an account?{' '}
//           <Link
//             href="/login"
//             className="text-blue-700 font-medium hover:underline"
//           >
//             Sign In
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// }

// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { registerUser } from '@/lib/api';
// import Link from 'next/link';
// import { Sun, ArrowRight } from 'lucide-react';

// const GRN  = '#8DC63F';
// const DGRN = '#4E7A1A';

// export default function RegisterPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
//     setLoading(true);
//     setError('');
//     try {
//       await registerUser({ username: form.username, email: form.email, password: form.password });
//       router.push('/login');
//     } catch (err) {
//       setError(err.response?.data?.error || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inp = (extra = {}) => ({
//     borderColor: '#e8e0d0', ...extra
//   });

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white py-12">

//       {/* Top green accent strip */}
//       <div className="w-full h-1 fixed top-0 left-0"
//         style={{ background: `linear-gradient(90deg, ${DGRN}, ${GRN}, #8bc34a)` }} />

//       {/* Logo */}
//       <Link href="/" className="flex items-center gap-2 mb-8">
//         <div className="w-9 h-9 rounded-xl flex items-center justify-center"
//           style={{ background: `linear-gradient(135deg, ${GRN}, ${DGRN})` }}>
//           <Sun className="w-5 h-5 text-white" />
//         </div>
//         <span className="text-xl font-extrabold text-slate-900">
//           Clima<span style={{ color: GRN }}>Sphere</span>
//         </span>
//       </Link>

//       {/* Card */}
//       <div className="w-full max-w-sm rounded-2xl p-8 shadow-sm border"
//         style={{ background: '#faf8f4', borderColor: '#e8e0d0' }}>

//         <h1 className="text-2xl font-black text-slate-800 mb-1">Create account</h1>
//         <p className="text-sm text-slate-400 mb-6">Free access to climate data generation</p>

//         {error && (
//           <div className="border px-4 py-3 rounded-xl mb-5 text-sm"
//             style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#dc2626' }}>
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {[
//             { key: 'username', label: 'Username',         type: 'text',     ph: 'Choose a username' },
//             { key: 'email',    label: 'Email',            type: 'email',    ph: 'your@email.com' },
//             { key: 'password', label: 'Password',         type: 'password', ph: 'Create a password' },
//             { key: 'confirm',  label: 'Confirm password', type: 'password', ph: 'Repeat your password' },
//           ].map(({ key, label, type, ph }) => (
//             <div key={key}>
//               <label className="block text-sm font-semibold text-slate-600 mb-1.5">{label}</label>
//               <input
//                 type={type} required
//                 value={form[key]}
//                 onChange={(e) => setForm({ ...form, [key]: e.target.value })}
//                 className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none bg-white transition"
//                 style={inp(key === 'confirm' && form.confirm && form.confirm !== form.password ? { borderColor: '#fca5a5' } : {})}
//                 onFocus={e => e.target.style.borderColor = GRN}
//                 onBlur={e => e.target.style.borderColor = key === 'confirm' && form.confirm && form.confirm !== form.password ? '#fca5a5' : '#e8e0d0'}
//                 placeholder={ph}
//               />
//               {key === 'confirm' && form.confirm && form.confirm !== form.password && (
//                 <p className="text-xs mt-1" style={{ color: '#ef4444' }}>Passwords don't match</p>
//               )}
//             </div>
//           ))}

//           <button
//             type="submit" disabled={loading}
//             className="w-full flex items-center justify-center gap-2 text-white font-semibold py-2.5 rounded-xl transition mt-1"
//             style={{ background: loading ? '#9ec99e' : GRN }}>
//             {loading ? 'Creating account...' : <> Create Account <ArrowRight className="w-4 h-4" /> </>}
//           </button>
//         </form>

//         <p className="text-center text-sm text-slate-400 mt-5">
//           Already have an account?{' '}
//           <Link href="/login" className="font-semibold hover:underline" style={{ color: GRN }}>
//             Sign in
//           </Link>
//         </p>
//       </div>

//       <Link href="/" className="mt-6 text-xs text-slate-400 hover:text-slate-600 transition">
//         ← Back to homepage
//       </Link>

//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/api';
import Link from 'next/link';
import { Sun, ArrowRight, User, Mail, Lock, ShieldCheck, Eye, EyeOff } from 'lucide-react';

const GRN = '#8DC63F';
const DGRN = '#4E7A1A';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordMismatch = form.confirm && form.confirm !== form.password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    setLoading(true);
    setError('');
    try {
      await registerUser({ username: form.username, email: form.email, password: form.password });
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 44px 12px 40px',
    borderRadius: '12px',
    border: `1px solid ${hasError ? '#FECACA' : '#D1D5DB'}`,
    outline: 'none',
    fontSize: '14px',
    boxShadow: hasError ? '0 0 0 3px rgba(252,165,165,0.2)' : 'none',
  });

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: '#F8FAF5', overflow: 'hidden' }}>

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
      <div style={{ width: '100%', maxWidth: '440px', background: 'white', borderRadius: '24px', padding: '2rem', boxShadow: '0 15px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>

        <span style={{ display: 'inline-block', background: '#EAF3DE', color: DGRN, padding: '5px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: '600', marginBottom: '1rem' }}>
          CREATE ACCOUNT
        </span>

        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>Get started</h2>
        <p style={{ color: '#6B7280', marginBottom: '1.25rem' }}>Free access to climate data generation.</p>

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
                placeholder="Choose a username"
                style={{ ...inputStyle(false), padding: '12px 14px 12px 40px' }}
                onFocus={e => { e.target.style.borderColor = GRN; e.target.style.boxShadow = '0 0 0 3px rgba(141,198,63,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email" required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                style={{ ...inputStyle(false), padding: '12px 14px 12px 40px' }}
                onFocus={e => { e.target.style.borderColor = GRN; e.target.style.boxShadow = '0 0 0 3px rgba(141,198,63,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showPassword ? 'text' : 'password'} required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Create a password"
                style={inputStyle(false)}
                onFocus={e => { e.target.style.borderColor = GRN; e.target.style.boxShadow = '0 0 0 3px rgba(141,198,63,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = 'none'; }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'transparent', cursor: 'pointer', color: '#9CA3AF' }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600' }}>Confirm password</label>
            <div style={{ position: 'relative' }}>
              <ShieldCheck size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showConfirm ? 'text' : 'password'} required
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                placeholder="Repeat your password"
                style={inputStyle(passwordMismatch)}
                onFocus={e => { if (!passwordMismatch) { e.target.style.borderColor = GRN; e.target.style.boxShadow = '0 0 0 3px rgba(141,198,63,0.15)'; }}}
                onBlur={e => { if (!passwordMismatch) { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = 'none'; }}}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'transparent', cursor: 'pointer', color: '#9CA3AF' }}>
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordMismatch && (
              <p style={{ fontSize: '12px', color: '#EF4444', margin: '4px 0 0' }}>Passwords don't match</p>
            )}
          </div>

          <button type="submit" disabled={loading}
            style={{ width: '100%', background: loading ? '#A7D67A' : GRN, color: 'white', border: 'none', borderRadius: '12px', padding: '13px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '15px' }}>
            {loading ? 'Creating account...' : <> Create account <ArrowRight size={16} /> </>}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: GRN, fontWeight: '600', textDecoration: 'none' }}>Sign in</Link>
        </p>

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Link href="/" style={{ color: '#9CA3AF', fontSize: '13px', textDecoration: 'none' }}>← Back to homepage</Link>
        </div>
      </div>
    </div>
  );
}