import Head from 'next/head';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';

const USER_DATA = {
  xp: 1250,
  level: 3,
  streak: 5,
  coursesCompleted: 2,
  lessonsCompleted: 24,
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

        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center">
              <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h1>
            <p className="text-slate-400 mb-6">Connect your Solana wallet to view your profile and track your progress.</p>
            <WalletMultiButton className="!bg-emerald-400 !text-slate-950 !rounded-lg !px-8 !py-3 !font-semibold hover:!bg-emerald-300" />
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

      <div className="min-h-screen bg-slate-950">
        {/* Header */}
        <header className="px-6 border-b border-slate-800">
          <div className="max-w-6xl mx-auto h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-emerald-400 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5 text-slate-950" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-bold text-white text-lg">Superteam Academy</span>
            </Link>
            <WalletMultiButton className="!bg-emerald-400 !text-slate-950 !rounded-lg !px-5 !py-2.5 !text-sm !font-semibold hover:!bg-emerald-300" />
          </div>
        </header>

        <div className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-10">
              {/* Avatar */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-4xl">👨‍🎓</span>
                </div>
                <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-full border border-emerald-500/20">
                  Level {USER_DATA.level}
                </span>
              </div>

              {/* Stats */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">Learner Profile</h1>
                <p className="text-slate-400 mb-6">Joined December 2025</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { value: USER_DATA.xp.toLocaleString(), label: 'Total XP', color: 'text-emerald-400' },
                    { value: USER_DATA.streak, label: 'Day Streak', color: 'text-white' },
                    { value: USER_DATA.coursesCompleted, label: 'Courses Done', color: 'text-white' },
                    { value: USER_DATA.lessonsCompleted, label: 'Lessons Done', color: 'text-white' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                      <p className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
                      <p className="text-xs text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* XP Progress */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white font-medium">Level {USER_DATA.level} → Level {USER_DATA.level + 1}</p>
                  <p className="text-sm text-slate-400">{xpToNextLevel - USER_DATA.xp} XP to next level</p>
                </div>
                <span className="text-2xl font-bold text-emerald-400">{USER_DATA.level}</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-8 mb-6 border-b border-slate-800">
              {[
                { id: 'courses', label: 'My Courses' },
                { id: 'achievements', label: 'Achievements' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id 
                      ? 'text-emerald-400 border-emerald-400' 
                      : 'text-slate-400 border-transparent hover:text-slate-300'
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
                    <div key={course.id} className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <Link href={`/course/${course.id}`}>
                            <h3 className="text-lg font-medium text-white hover:text-emerald-400 transition-colors">
                              {course.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-slate-400 mt-1">{course.completed} of {course.total} lessons completed</p>
                        </div>
                        <span className="text-sm text-emerald-400 font-medium">+{course.xp} XP</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-800">
                        <Link 
                          href={`/course/${course.id}`}
                          className="text-sm text-emerald-400 hover:underline"
                        >
                          Continue Learning →
                        </Link>
                      </div>
                    </div>
                  ))}

                  <Link 
                    href="/"
                    className="flex items-center justify-center gap-2 py-4 border border-dashed border-slate-700 rounded-xl text-slate-400 hover:text-slate-300 hover:border-slate-600 transition-colors"
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
                          ? 'bg-slate-900 border-slate-800' 
                          : 'bg-slate-900/50 border-slate-800/50 opacity-40'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <h4 className={`font-medium ${achievement.unlocked ? 'text-white' : 'text-slate-400'}`}>
                            {achievement.name}
                          </h4>
                          <span className="text-xs text-slate-500">
                            {achievement.unlocked ? 'Unlocked' : 'Locked'}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400">{achievement.desc}</p>
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
