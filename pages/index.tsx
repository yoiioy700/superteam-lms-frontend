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
        <title>Superteam Academy</title>
        <meta name="description" content="Learn to build on Solana. Earn XP and collect verifiable on-chain credentials." />
      </Head>

      <div className="min-h-screen bg-[#0a0e1a]">
        <Hero />

        {/* Courses Section */}
        <section id="courses" className="px-6 py-24 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">All Courses</h2>
                <p className="text-white/40">Choose your learning path</p>
              </div>

              <div className="flex items-center gap-2">
                {['All', 'Developer', 'Community'].map((filter, i) => (
                  <button 
                    key={filter}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      i === 0 
                        ? 'bg-white/10 text-white' 
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* CTA */}
        <section className="px-6 py-24 border-t border-white/5">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to start learning?
            </h2>
            <p className="text-white/40 mb-8">
              Connect your Solana wallet to track progress and earn on-chain credentials.
            </p>
            <a 
              href="#courses"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#14F195] text-[#0a0e1a] font-semibold hover:bg-[#0ed184] transition-colors"
            >
              Get Started
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#14F195] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#0a0e1a]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-semibold text-white">Superteam Academy</span>
            </div>
            <p className="text-sm text-white/20">Built for the Solana ecosystem</p>
          </div>
        </footer>
      </div>
    </>
  );
}
