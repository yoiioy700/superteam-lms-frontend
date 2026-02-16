import Head from 'next/head';
import { Hero, CourseCard } from '../components';
import { useCourses } from '../hooks/useProgram';

export default function Home() {
  const { courses } = useCourses();

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
        <section id="courses" className="relative py-32 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/50 mb-4">
                Learning Paths
              </span>
              <h2 className="text-4xl font-bold text-white mb-4">
                Choose Your Track
              </h2>
              <p className="text-white/40 max-w-lg mx-auto">
                From beginner basics to advanced patterns. Select a track and start building on Solana.
              </p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <CourseCard 
                    key={course.publicKey}
                    course={course}
                  />
                ))
              ) : (
                // Demo Cards
                <>
                  <CourseCard 
                    course={{
                      publicKey: 'demo-1',
                      account: {
                        title: 'Anchor Framework Basics',
                        description: 'Learn to build Solana programs with Anchor. From setup to deployment.',
                        track: 1,
                        difficulty: 0,
                        xpReward: 500,
                        lessonCount: 8,
                        isPublished: true,
                      }
                    }}
                    isEnrolled={false}
                    progress={0}
                  />
                  <CourseCard 
                    course={{
                      publicKey: 'demo-2',
                      account: {
                        title: 'Web3 Community Building',
                        description: 'Build and grow engaged communities in the Web3 space.',
                        track: 2,
                        difficulty: 1,
                        xpReward: 750,
                        lessonCount: 12,
                        isPublished: true,
                      }
                    }}
                    isEnrolled={true}
                    progress={35}
                  />
                  <CourseCard 
                    course={{
                      publicKey: 'demo-3',
                      account: {
                        title: 'Advanced Solana Security',
                        description: 'Deep dive into program security and best practices.',
                        track: 1,
                        difficulty: 2,
                        xpReward: 1000,
                        lessonCount: 15,
                        isPublished: true,
                      }
                    }}
                    isEnrolled={false}
                    progress={0}
                  />
                </>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 px-6">
          <div className="absolute inset-0 bg-gradient-to-t from-violet-900/10 to-transparent" />
          
          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-white/40 mb-8 max-w-xl mx-auto">
              Connect your wallet, choose a course, and start earning verifiable credentials on Solana.
            </p>
            <a 
              href="#courses"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0a0a0f] rounded-full font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105"
            >
              Get Started
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white/60 text-sm">Superteam Academy</span>
            </div>
            <p className="text-white/30 text-sm">
              Built for the Solana ecosystem
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
