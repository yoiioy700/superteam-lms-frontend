import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { connected } = useWallet();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-slate-950/95 backdrop-blur border-b border-slate-800' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-emerald-400 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-slate-950" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-bold text-white text-lg">Superteam</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden sm:flex items-center gap-6">
          <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
            Courses
          </Link>
          <Link href="/profile" className="text-sm text-slate-400 hover:text-white transition-colors">
            Profile
          </Link>
        </div>

        {/* Wallet */}
        <WalletMultiButton className="!bg-emerald-400 !text-slate-950 !rounded-lg !px-5 !py-2.5 !text-sm !font-semibold hover:!bg-emerald-300" />
      </nav>
    </header>
  );
}
