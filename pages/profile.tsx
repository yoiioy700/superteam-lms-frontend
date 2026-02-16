import Head from 'next/head';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';

// Mock data
const USER_DATA = {
  xp: 1250,
  level: 3,
  streak: 5,
  longestStreak: 12,
  coursesCompleted: 2,
  lessonsCompleted: 24,
  joinedAt: '2025-12-15',
  achievements: [
    { id: 1, name: 'First Steps', desc: 'Complete your first lesson', icon: '🎯', unlocked: true },
    { id: 2, name: 'Dedicated Learner', desc: '7 day streak', icon: '🔥', unlocked: true },
    { id: 3, name: 'Course Graduate', desc: 'Complete your first course', icon: '🎓', unlocked: true },
    { id: 4, name: 'Solana Builder', desc: 'Complete Developer track', icon: '⚡', unlocked: false },
    { id: 5, name: 'Chain Crusher', desc: '30 day streak', icon: '⛓️', unlocked: false },
    { id: 6, name: 'Master Learner', desc: 'Complete 5 courses', icon: '🏆', unlocked: false },
  ],
  enrolledCourses: [
    { id: '1', title: 'Anchor Framework Fundamentals', progress: 35, total: 12, completed: 4, xp: 200 },
    { id: '2', title: 'Web3 Community Building', progress: 75, total: 8, completed: 6, xp: 300 },
  ],
};

export default function Profile() {
  const { connected } = useWallet();
  const [activeTab, setActiveTab] = useState('courses');

  if (!connected) {
    return (
      <>
        <Head>
          <title>Profile | Superteam Academy</title>
        </Head>

        <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#14F195]/10 border border-[#14F195]/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#14F195]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h1>
            <p className="text-white/40 mb-6">Connect your Solana wallet to view your profile and track your progress.</p>
            <WalletMultiButton className="!bg-[#14F195] !text-[#0a0e1a] !rounded-lg !px-6 !py-3" />
          </div>
        </div>
      </>
    );
  }

  const xpToNextLevel = USER_DATA.level * 500;
  const progressPercent = (USER_DATA.xp / xpToNextLevel) * 100;

  return (
    <>
      <Head>
        <title>Profile | Superteam Academy</title>
      </Head>

      <div className="min-h-screen bg-[#0a0e1a]">
        {/* Header */}
        <header className="px-6 border-b border-white/[0.06]">
          <div className="max-w-6xl mx-auto h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#14F195] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#0a0e1a]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-semibold text-white">Superteam Academy</span>
            </Link>
            <WalletMultiButton className="!bg-[#14F195] !text-[#0a0e1a] !rounded-lg !px-4 !py-2 !text-sm !font-medium !border-0" />
          </div>
        </header>

        <div className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="grid lg:grid-cols-[auto_1fr] gap-8 mb-12">
              {/* Avatar */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#14F195] to-[#0ed184] flex items-center justify-center mb-4">
                  <span className="text-4xl">👨‍🎓</span>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-[#14F195]/10 text-[#14F195] text-sm font-medium border border-[#14F195]/20">
                  Level {USER_DATA.level}
                </span>
              </div>

              {/* Stats */}
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Learner Profile</h1>
                <p className="text-white/40 mb-6">Joined December 2025</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                    <p className="text-2xl font-bold text-[#14F195] mb-1">{USER_DATA.xp.toLocaleString()}</p>
                    <p className="text-xs text-white/40">Total XP</p>
                  </div>

                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                    <p className="text-2xl font-bold text-white mb-1">{USER_DATA.streak}</p>
                    <p className="text-xs text-white/40">Day Streak</p>
                  </div>

                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                    <p className="text-2xl font-bold text-white mb-1">{USER_DATA.coursesCompleted}</p>
                    <p className="text-xs text-white/40">Courses Done</p>
                  </div>

                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                    <p className="text-2xl font-bold text-white mb-1">{USER_DATA.lessonsCompleted}</p>
                    <p className="text-xs text-white/40">Lessons Done</p>
                  </div>
                </div>
              </div>
            </div>

            {/* XP Progress */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white font-medium">Level {USER_DATA.level} → Level {USER_DATA.level + 1}</p>
                  <p className="text-sm text-white/40">{xpToNextLevel - USER_DATA.xp} XP to next level</p>
                </div>
                <span className="text-2xl font-bold text-[#14F195]">{USER_DATA.level}</span>
              </div>
              <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#14F195] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 mb-6 border-b border-white/[0.06]">
              {[
                { id: 'courses', label: 'My Courses' },
                { id: 'achievements', label: 'Achievements' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id 
                      ? 'text-[#14F195] border-[#14F195]' 
                      : 'text-white/40 border-transparent hover:text-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === 'courses' ? (
                <div className="space-y-4">
                  {USER_DATA.enrolledCourses.map((course) => (
                    <div key={course.id} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <Link href={`/course/${course.id}`}>
                            <h3 className="text-lg font-medium text-white hover:text-[#14F195] transition-colors">
                              {course.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-white/40 mt-1">{course.completed} of {course.total} lessons completed</p>
                        </div>
                        <span className="text-sm text-[#14F195] font-medium">+{course.xp} XP</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-white/40">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#14F195] rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/[0.04]">
                        <Link 
                          href={`/course/${course.id}`}
                          className="text-sm text-[#14F195] hover:underline"
                        >
                          Continue Learning →
                        </Link>
                      </div>
                    </div>
                  ))}

                  <Link 
                    href="/"
                    className="flex items-center justify-center gap-2 py-4 border border-dashed border-white/[0.1] rounded-xl text-white/40 hover:text-white/60 hover:border-white/[0.2] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Browse More Courses
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {USER_DATA.achievements.map((achievement) => (
                    <div 
                      key={achievement.id}
                      className={`p-5 rounded-xl border transition-all ${
                        achievement.unlocked 
                          ? 'bg-white/[0.02] border-white/[0.06]' 
                          : 'bg-white/[0.01] border-white/[0.04] opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <h4 className={`font-medium ${achievement.unlocked ? 'text-white' : 'text-white/40'}`}>
                            {achievement.name}
                          </h4>
                          <span className="text-xs text-white/30">
                            {achievement.unlocked ? 'Unlocked' : 'Locked'}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-white/40">{achievement.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
