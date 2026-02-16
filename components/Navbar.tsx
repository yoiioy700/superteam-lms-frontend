import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { connected } = useWallet();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-white font-medium text-lg tracking-tight">Superteam</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden sm:flex items-center gap-8">
          <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
            Courses
          </Link>
          <Link href="/profile" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
            Profile
          </Link>
        </div>

        {/* Wallet */}
        <WalletMultiButton className="!bg-white !text-[#0a0a0f] !rounded-full !px-6 !py-2.5 !text-sm !font-medium hover:!bg-white/90 !transition-all" />
      </nav>
    </header>
  );
}
