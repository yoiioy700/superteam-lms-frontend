import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { connected, publicKey } = useWallet();
  const [scrolled, setScrolled] = useState(false);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm group-hover:shadow-lg group-hover:shadow-emerald-400/30 transition-all">
              S
            </div>
            <span className="font-bold text-white text-lg hidden sm:block">Superteam Academy</span>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
              Courses
            </Link>
            <Link href="/profile" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
              Profile
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* XP Display - only when connected */}
            {connected && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-emerald-400 text-sm font-bold">{xp} XP</span>
              </div>
            )}

            {/* Wallet Button */}
            <WalletMultiButton className="!bg-emerald-500 hover:!bg-emerald-400 !rounded-xl !py-2 !px-4 !text-sm !font-medium transition-all" />
          </div>
        </div>
      </div>
    </nav>
  );
}
