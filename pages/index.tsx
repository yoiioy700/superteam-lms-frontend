import Head from 'next/head';
import { Hero, CourseCard } from '../components';

export default function Home() {
  // Demo courses
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
        <meta name="description" content="Learn to build on Solana. Earn XP and collect verifiable credentials." />
      </Head>

      <div className="min-h-screen bg-[#0a0e1a]">
        <Hero />

        {/* Courses Section */}
        <section id="courses" className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-1">All Courses</h2>
                <p className="text-sm text-white/40">Choose your learning path</p>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm text-white/60 hover:text-white border border-white/[0.08] rounded-lg hover:bg-white/[0.02] transition-colors">
                  All Tracks
                </button>
                <button className="px-3 py-1.5 text-sm text-white/40 border border-transparent rounded-lg hover:bg-white/[0.02] transition-colors">
                  Developer
                </button>
                <button className="px-3 py-1.5 text-sm text-white/40 border border-transparent rounded-lg hover:bg-white/[0.02] transition-colors">
                  Community
                </button>
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

        {/* CTA */}
        <section className="px-6 py-20 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-white mb-4">
              Ready to start learning?
            </h2>
            <p className="text-white/40 mb-6 max-w-md mx-auto">
              Connect your Solana wallet to track progress and earn on-chain credentials.
            </p>
            <a 
              href="#courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#14F195] text-[#0a0e1a] rounded-lg font-medium hover:bg-[#0ed184] transition-colors"
            >
              Get Started
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#14F195] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#0a0e1a]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-sm text-white/40">Superteam Academy</span>
            </div>
            <p className="text-sm text-white/20">Built for the Solana ecosystem</p>
          </div>
        </footer>
      </div>
    </>
  );
}
