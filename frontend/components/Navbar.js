'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sun, Plus, History, LogOut } from 'lucide-react';

const GRN  = '#8DC63F';

export default function Navbar({ page }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/login');
  };

  return (
    <nav style={{
      width: '100%',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      height: '60px',
      boxSizing: 'border-box',
      borderBottom: '0.5px solid #E5E7EB',
      boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>

      {/* Left — Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: GRN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sun size={16} color="#fff" />
        </div>
        <span style={{ fontSize: '16px', fontWeight: '600', color: '#111' }}>
          Clima<span style={{ color: GRN }}>Sphere</span>
        </span>
      </Link>

      {/* Right — Contextual buttons + Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

        {/* New Job — shown on history and status pages */}
        {(page === 'history' || page === 'status') && (
          <Link href="/generate" style={{
            fontSize: '13px', color: '#fff', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '6px 12px', borderRadius: '8px',
            background: GRN, fontWeight: '500',
          }}>
            <Plus size={15} /> New job
          </Link>
        )}

        {/* History — shown on generate and status pages */}
        {(page === 'generate' || page === 'status') && (
          <Link href="/jobs" style={{
            fontSize: '13px', color: '#374151', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '6px 12px', borderRadius: '8px',
            border: '0.5px solid #E5E7EB',
            background: '#F9FAFB',
          }}>
            <History size={15} /> History
          </Link>
        )}

        {/* Divider */}
        <div style={{ width: '0.5px', height: '22px', background: '#E5E7EB', margin: '0 4px' }} />

        {/* Logout — always visible */}
        <button onClick={handleLogout} style={{
          fontSize: '13px', color: '#9CA3AF',
          display: 'flex', alignItems: 'center', gap: '5px',
          padding: '6px 10px', borderRadius: '8px',
          background: 'transparent', border: 'none', cursor: 'pointer',
        }}>
          <LogOut size={15} /> Log out
        </button>

      </div>
    </nav>
  );
}