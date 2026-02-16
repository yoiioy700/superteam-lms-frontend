import Head from 'next/head';
import { Hero, CourseCard } from '../components';

export default function Home() {
  const courses = [
    {
      publicKey: '1',
      account: {
        title: 'Anchor Framework Fundamentals',
        description: 'Learn to build Solana programs with Anchor. Covers accounts, instructions, and testing.',
        track: 1,
        difficulty: 0,
        xpReward: 500,
        lessonCount: 12,
        isPublished: true,
      }
    },
    {
      publicKey: '2',
      account: {
        title: 'Web3 Community Building',
        description: 'Build and grow engaged communities. Governance, incentives, and growth strategies.',
        track: 2,
        difficulty: 1,
        xpReward: 400,
        lessonCount: 8,
        isPublished: true,
      }
    },
    {
      publicKey: '3',
      account: {
        title: 'Tokenomics Design',
        description: 'Design sustainable token economies. Supply mechanics, distribution, and incentives.',
        track: 3,
        difficulty: 2,
        xpReward: 600,
        lessonCount: 10,
        isPublished: true,
      }
    },
    {
      publicKey: '4',
      account: {
        title: 'Smart Contract Security',
        description: 'Security best practices for Solana programs. Common vulnerabilities and audits.',
        track: 1,
        difficulty: 2,
        xpReward: 800,
        lessonCount: 15,
        isPublished: true,
      }
    },
    {
      publicKey: '5',
      account: {
        title: 'Solana Pay Integration',
        description: 'Build payment flows with Solana Pay. QR codes, transactions, and point of sale.',
        track: 1,
        difficulty: 1,
        xpReward: 450,
        lessonCount: 6,
        isPublished: true,
      }
    },
    {
      publicKey: '6',
      account: {
        title: 'Content Creation for Web3',
        description: 'Create technical content that resonates. Tutorials, documentation, and video.',
        track: 3,
        difficulty: 0,
        xpReward: 350,
        lessonCount: 8,
        isPublished: true,
      }
    },
  ];

  return (
    <>
      <Head>
        <title>SUPERTEAM ACADEMY</title>
        <meta name="description" content="Learn to build on Solana. Earn XP and collect verifiable on-chain credentials." />
      </Head>

      <div className="min-h-screen bg-black">
        <Hero />

        {/* Courses Section */}
        <section id="courses" className="px-6 py-24 border-t border-white/20 bg-black">
          <div className="max-w-6xl mx-auto">
            {/* Section Header - brutalist */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
              <div>
                <p className="text-[10px] font-bold tracking-[0.3em] text-[#14F195] mb-2">// CURRICULUM</p>
                <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">ALL_COURSES</h2>
              </div>

              <div className="flex items-center gap-0 border border-white/20">
                {['ALL', 'DEV', 'COMM'].map((filter, i) => (
                  <button 
                    key={filter}
                    className={`px-5 py-3 text-[10px] font-bold tracking-widest transition-colors border-l border-white/20 first:border-l-0 ${
                      i === 0 
                        ? 'bg-white text-black' 
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <CourseCard 
                  key={course.publicKey}
                  course={course}
                  isEnrolled={course.publicKey === '2'}
                  progress={course.publicKey === '2' ? 35 : 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-24 border-t border-white/20 bg-black">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[10px] font-bold tracking-[0.3em] text-[#14F195] mb-4">// GET_STARTED</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">
              READY_TO_BUILD?
            </h2>
            <p className="text-white/40 mb-10 max-w-md mx-auto text-sm">
              Connect your Solana wallet to track progress and earn on-chain credentials.
            </p>
            <a 
              href="#courses"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#14F195] text-black font-black text-sm tracking-widest hover:bg-white transition-colors border border-[#14F195] hover:border-white"
            >
              ENROLL_NOW →
            </a>
          </div>
        </section>

        {/* Footer - brutalist */}
        <footer className="px-6 py-8 border-t border-white/20 bg-black">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-[#14F195] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#14F195]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-black text-white tracking-tight">SUPERTEAM</span>
            </div>
            <p className="text-[10px] font-bold tracking-widest text-white/30">BUILT FOR SOLANA</p>
          </div>
        </footer>
      </div>
    </>
  );
}
