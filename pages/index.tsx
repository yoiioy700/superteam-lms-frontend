import Head from 'next/head';
import { useWallet } from '@solana/wallet-adapter-react';
import { Hero, CourseCard } from '../components';
import { useLearnerProfile, useXpBalance, useCourses } from '../hooks/useProgram';
import { getLevel, getLevelName, getLevelProgress } from '../lib/sdk';

export default function Home() {
  const { connected } = useWallet();
  const { profile } = useLearnerProfile();
  const { balance } = useXpBalance();
  const { courses } = useCourses();

  const level = getLevel(balance);
  const levelName = getLevelName(level);
  const progress = getLevelProgress(balance);

  return (
    <>
      <Head>
        <title>Superteam Academy</title>
        <meta name="description" content="Learn Solana development, earn XP, and collect verifiable credentials" />
      </Head>

      <div className="relative">
        {/* Hero Section */}
        <Hero />

        {/* Courses Section */}
        <section id="courses" className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Explore Learning Tracks
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Choose from developer, community, or creative tracks. 
                Complete lessons, earn XP, and build your on-chain resume.
              </p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {connected && courses.length > 0 ? (
                courses.map((course) => (
                  <CourseCard 
                    key={course.publicKey}
                    course={course}
                    isEnrolled={profile?.enrolledCourses?.includes(course.publicKey)}
                  />
                ))
              ) : (
                // Demo cards when not connected or no courses
                <>
                  <div className="col-span-full text-center text-slate-500 py-12">
                    <div className="mb-4">
                      <svg className="w-16 h-16 mx-auto text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 4.168 6.253c0 0 .53 2.608.53 2.608M19.832 6.253c0 0-.53 2.608-.53 2.608M12 14c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z" />
                      </svg>
                    </div>
                    <p className="text-lg mb-2">Connect your wallet to explore courses</p>
                    <p className="text-sm opacity-75">Solana Devnet • Earn XP • Collect Credentials</p>
                  </div>
                  
                  {/* Preview Cards */}
                  {[
                    { title: 'Anchor Framework Basics', track: 1, difficulty: 0, xpReward: 500, lessonCount: 8 },
                    { title: 'Web3 Community Building', track: 2, difficulty: 1, xpReward: 750, lessonCount: 12 },
                    { title: 'Solana NFT Development', track: 3, difficulty: 2, xpReward: 1000, lessonCount: 15 },
                  ].map((course, i) => (
                    <div key={i} className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-6 opacity-50 hover:opacity-100 transition-all">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="rounded-full bg-slate-700/50 px-3 py-1 text-xs font-medium text-slate-300">
                          {[0, 'Developer', 'Community', 'Creative'][course.track] || 'General'}
                        </span>
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                          course.difficulty === 0 ? 'bg-green-500/20 text-green-400' :
                          course.difficulty === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {['Beginner', 'Intermediate', 'Advanced'][course.difficulty]}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <span>{course.lessonCount} lessons</span>
                        <span className="text-emerald-400">+{course.xpReward} XP</span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
