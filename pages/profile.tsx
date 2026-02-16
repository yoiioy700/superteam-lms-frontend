import Head from 'next/head';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useLearnerProfile, useXpBalance } from '../hooks/useProgram';
import { 
  getLevel, 
  getLevelName, 
  getLevelProgress, 
  getNextLevelXp,
  formatXp,
  STREAK_MILESTONES,
  isStreakMilestone,
} from '../lib/sdk';

const ACHIEVEMENTS_LIST = [
  { id: 1, name: 'First Steps', desc: 'Complete your first lesson', icon: '🎯' },
  { id: 2, name: 'Dedicated Learner', desc: '7 day streak', icon: '🔥' },
  { id: 3, name: 'Course Graduate', desc: 'Complete your first course', icon: '🎓' },
  { id: 4, name: 'Solana Builder', desc: 'Complete Developer track', icon: '⚡' },
];

export default function Profile() {
  const { connected } = useWallet();
  const { profile } = useLearnerProfile();
  const { balance } = useXpBalance();

  if (!connected) {
    return (
      <>
        <Head>
          <title>Profile | Superteam Academy</title>
        </Head>
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
              <svg className="w-10 h-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Wallet Not Connected</h1>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Connect your Solana wallet to view your profile, track XP, and see your achievements
            </p>
            <WalletMultiButton className="!bg-emerald-500 hover:!bg-emerald-400 !rounded-xl" />
          </div>
        </div>
      </>
    );
  }

  const level = getLevel(balance);
  const levelName = getLevelName(level);
  const progress = getLevelProgress(balance);
  const nextLevelXp = getNextLevelXp(level);

  return (
    <>
      <Head>
        <title>Profile | Superteam Academy</title>
      </Head>

      <div className="min-h-screen bg-slate-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 p-6 sm:p-8 mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-purple-500/5" />
            
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-purple-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                    <span className="text-4xl">{profile ? '👨‍🎓' : '👤'}</span>
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm border-2 border-slate-900">
                  {level}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-white">Learner Profile</h1>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium border border-emerald-500/30">
                    {levelName}
                  </span>
                </div>
                
                <p className="text-slate-400">
                  {profile?.track ? `Track: ${profile.track}` : 'No track selected'}
                </p>
              </div>
            </div>

            {/* XP Progress */}
            <div className="relative mt-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Level Progress</span>
                <span className="text-emerald-400 font-medium">{formatXp(balance)} / {nextLevelXp} XP</span>
              </div>
              
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full transition-all duration-500 relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
              
              <p className="mt-2 text-xs text-slate-500 text-right">
                {nextLevelXp - balance} XP to next level
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total XP', value: formatXp(balance), color: 'emerald' },
              { label: 'Current Streak', value: profile?.currentStreak?.toString() || '0', color: 'orange', suffix: ' days' },
              { label: 'Longest Streak', value: profile?.longestStreak?.toString() || '0', color: 'purple', suffix: ' days' },
              { label: 'Courses Complete', value: profile?.completedCourses?.length?.toString() || '0', color: 'blue' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold text-${stat.color}-400`}>
                  {stat.value}<span className="text-sm font-normal text-slate-500">{stat.suffix || ''}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="rounded-2xl bg-slate-800/30 border border-slate-700/50 p-6 mb-6">
            <h2 className="text-lg font-bold text-white mb-4">Achievements</h2>
            
            <div className="grid gap-4">
              {ACHIEVEMENTS_LIST.map((ach, i) => {
                const unlocked = profile?.achievements?.includes(ach.id);
                return (
                  <div 
                    key={i}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      unlocked 
                        ? 'bg-slate-800/50 border-emerald-500/30' 
                        : 'bg-slate-800/20 border-slate-700/30 opacity-50'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center text-2xl">
                      {ach.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${unlocked ? 'text-white' : 'text-slate-400'}`}>
                        {ach.name}
                      </p>
                      <p className="text-sm text-slate-500">{ach.desc}</p>
                    </div>
                    
                    <div>
                      {unlocked ? (
                        <span className="text-emerald-400">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                      ) : (
                        <span className="text-slate-600">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/"
              className="flex-1 min-w-[140px] p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/50 transition-all text-center group"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-slate-300 font-medium">Browse Courses</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
