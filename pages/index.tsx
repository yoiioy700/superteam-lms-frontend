import Head from 'next/head';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hero, CourseCard, SkeletonCard } from '../components';

export default function Home() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading for demo effect
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

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

      <div className="min-h-screen bg-[#0a0a0f]">
        <Hero />

        {/* Courses Section */}
        <section id="courses" className="px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.2em] text-violet-400/80 mb-4">CURRICULUM</p>
              <h2 className="text-4xl sm:text-5xl font-light text-white mb-4">
                Explore <span className="font-medium">Courses</span>
              </h2>
              <p className="text-white/40 max-w-md mx-auto">
                Master Solana development with our comprehensive learning paths
              </p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                // Loading skeletons
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : (
                // Actual courses with animation
                courses.map((course, index) => (
                  <motion.div
                    key={course.publicKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CourseCard 
                      course={course}
                      isEnrolled={course.publicKey === '1' || course.publicKey === '2'}
                      progress={course.publicKey === '2' ? 35 : 0}
                    />
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24 border-t border-white/[0.06]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-light text-white mb-4">
              Ready to <span className="font-medium">start?</span>
            </h2>
            <p className="text-white/40 mb-10 max-w-md mx-auto">
              Connect your Solana wallet to track progress and earn on-chain credentials.
            </p>
            <a 
              href="#courses"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#0a0a0f] font-medium rounded-full hover:scale-105 transition-transform"
            >
              Get Started
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-white font-medium">Superteam Academy</span>
            </div>
            <p className="text-sm text-white/20">Built for the Solana ecosystem</p>
          </div>
        </footer>
      </div>
    </>
  );
}
