import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';

// Mock course data
const COURSES: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Anchor Framework Fundamentals',
    description: 'Learn to build Solana programs with Anchor. From basics to advanced patterns including testing and deployment.',
    track: 'Developer',
    difficulty: 'Beginner',
    xpReward: 500,
    lessonCount: 12,
    duration: '~4 hours',
    lessons: [
      { id: 1, title: 'Introduction to Anchor', duration: '15 min', completed: true },
      { id: 2, title: 'Setting Up Environment', duration: '20 min', completed: true },
      { id: 3, title: 'Your First Program', duration: '25 min', completed: false },
      { id: 4, title: 'Accounts and Data', duration: '30 min', completed: false },
      { id: 5, title: 'Instructions', duration: '25 min', completed: false },
      { id: 6, title: 'Errors and Validation', duration: '20 min', completed: false },
      { id: 7, title: 'Testing with Mocha', duration: '35 min', completed: false },
      { id: 8, title: 'Deployment', duration: '20 min', completed: false },
      { id: 9, title: 'Frontend Integration', duration: '40 min', completed: false },
      { id: 10, title: 'Best Practices', duration: '30 min', completed: false },
      { id: 11, title: 'Security Patterns', duration: '35 min', completed: false },
      { id: 12, title: 'Final Project', duration: '45 min', completed: false },
    ],
  },
  '2': {
    id: '2',
    title: 'Web3 Community Building',
    description: 'Build and grow engaged communities. Learn governance, incentives, and sustainable growth strategies.',
    track: 'Community',
    difficulty: 'Intermediate',
    xpReward: 400,
    lessonCount: 8,
    duration: '~3 hours',
    lessons: [
      { id: 1, title: 'Community Foundations', duration: '20 min', completed: true },
      { id: 2, title: 'Engagement Strategies', duration: '25 min', completed: false },
      { id: 3, title: 'Governance Models', duration: '30 min', completed: false },
      { id: 4, title: 'Incentive Design', duration: '25 min', completed: false },
      { id: 5, title: 'Content Strategy', duration: '20 min', completed: false },
      { id: 6, title: 'Moderation Tools', duration: '15 min', completed: false },
      { id: 7, title: 'Analytics', duration: '20 min', completed: false },
      { id: 8, title: 'Growth Tactics', duration: '25 min', completed: false },
    ],
  },
  '3': {
    id: '3',
    title: 'Tokenomics Design',
    description: 'Design sustainable token economies. Supply mechanics, distribution models, and incentive alignment.',
    track: 'Creative',
    difficulty: 'Advanced',
    xpReward: 600,
    lessonCount: 10,
    duration: '~5 hours',
    lessons: [
      { id: 1, title: 'Token Basics', duration: '25 min', completed: false },
      { id: 2, title: 'Supply Mechanics', duration: '30 min', completed: false },
      { id: 3, title: 'Distribution Models', duration: '35 min', completed: false },
      { id: 4, title: 'Vesting Schedules', duration: '25 min', completed: false },
      { id: 5, title: 'Staking Design', duration: '30 min', completed: false },
      { id: 6, title: 'Governance Tokens', duration: '35 min', completed: false },
      { id: 7, title: 'Utility Design', duration: '30 min', completed: false },
      { id: 8, title: 'Economic Attacks', duration: '40 min', completed: false },
      { id: 9, title: 'Simulation Tools', duration: '35 min', completed: false },
      { id: 10, title: 'Case Studies', duration: '45 min', completed: false },
    ],
  },
};

export default function CourseDetail() {
  const router = useRouter();
  const { courseId } = router.query;
  const { connected } = useWallet();
  const [isEnrolled, setIsEnrolled] = useState(courseId === '1' || courseId === '2');
  const [activeLesson, setActiveLesson] = useState<number | null>(null);

  const course = COURSES[courseId as string] || COURSES['1'];
  const completedLessons = course.lessons.filter((l: any) => l.completed).length;
  const progress = Math.round((completedLessons / course.lessons.length) * 100);

  const handleEnroll = () => {
    if (!connected) return;
    setIsEnrolled(true);
  };

  const handleLessonClick = (lessonId: number) => {
    if (!isEnrolled) return;
    setActiveLesson(activeLesson === lessonId ? null : lessonId);
  };

  return (
    <>
      <Head>
        <title>{course.title} | Superteam Academy</title>
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

        {/* Hero */}
        <div className="px-6 py-12 border-b border-white/[0.06]">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Courses</Link>
              <span>/</span>
              <span className="text-white">{course.title}</span>
            </div>

            <div className="grid lg:grid-cols-[1fr_340px] gap-8">
              {/* Main Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#14F195]/10 text-[#14F195] text-xs font-medium">
                    {course.track}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                    course.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {course.difficulty}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-white mb-4">{course.title}</h1>
                <p className="text-white/60 mb-6 max-w-2xl">{course.description}</p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-white/40">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {course.lessonCount} lessons
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-2 text-[#14F195]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    +{course.xpReward} XP
                  </span>
                </div>
              </div>

              {/* Enroll Card */}
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
                {isEnrolled ? (
                  <>
                    <div className="flex items-center gap-2 text-[#14F195] mb-4">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Enrolled</span>
                    </div>
                    <p className="text-sm text-white/40 mb-4">{completedLessons} of {course.lessons.length} lessons completed</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-white/40">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                        <div className="h-full bg-[#14F195] rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                    <button className="w-full mt-4 py-2.5 bg-[#14F195] text-[#0a0e1a] rounded-lg font-medium hover:bg-[#0ed184] transition-colors">
                      Continue Learning
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-white font-medium mb-2">Start Learning</h3>
                    <p className="text-sm text-white/40 mb-4">Get full access to all lessons and earn {course.xpReward} XP upon completion.</p>
                    {!connected ? (
                      <WalletMultiButton className="!w-full !bg-[#14F195] !text-[#0a0e1a] !rounded-lg !py-2.5" />
                    ) : (
                      <button 
                        onClick={handleEnroll}
                        className="w-full py-2.5 bg-[#14F195] text-[#0a0e1a] rounded-lg font-medium hover:bg-[#0ed184] transition-colors"
                      >
                        Enroll Now (Free)
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_340px] gap-8">
              {/* Lesson List */}
              <div>
                <h2 className="text-lg font-semibold text-white mb-6">Course Content</h2>
                <div className="space-y-3">
                  {course.lessons.map((lesson: any, index: number) => (
                    <div
                      key={lesson.id}
                      onClick={() => handleLessonClick(lesson.id)}
                      className={`p-4 rounded-lg border transition-all cursor-pointer ${
                        lesson.completed 
                          ? 'bg-[#14F195]/5 border-[#14F195]/20' 
                          : isEnrolled 
                            ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1]'
                            : 'bg-white/[0.02] border-white/[0.06] opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                          lesson.completed 
                            ? 'bg-[#14F195] text-[#0a0e1a]' 
                            : 'bg-white/[0.04] text-white/40'
                        }`}>
                          {lesson.completed ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-medium ${lesson.completed ? 'text-white' : 'text-white/60'}`}>
                            {lesson.title}
                          </h3>
                          <p className="text-xs text-white/30">{lesson.duration}</p>
                        </div>
                        {isEnrolled && !lesson.completed && (
                          <span className="text-xs text-[#14F195]">Start →</span>
                        )}
                      </div>

                      {/* Lesson Content (expandable) */}
                      {activeLesson === lesson.id && (
                        <div className="mt-4 pt-4 border-t border-white/[0.06]">
                          <p className="text-sm text-white/50 mb-4">This lesson covers the fundamentals...</p>
                          <button className="px-4 py-2 bg-[#14F195] text-[#0a0e1a] rounded-lg text-sm font-medium hover:bg-[#0ed184] transition-colors">
                            Mark as Complete (+50 XP)
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                  <h3 className="text-white font-medium mb-4">Your Progress</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full border-2 border-[#14F195] flex items-center justify-center">
                      <span className="text-xl font-bold text-[#14F195]">{progress}%</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{completedLessons}/{course.lessons.length} lessons</p>
                      <p className="text-sm text-white/40">Keep it up!</p>
                    </div>
                  </div>
                  <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                    <div className="h-full bg-[#14F195] rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                  <h3 className="text-white font-medium mb-3">What you'll learn</h3>
                  <ul className="space-y-2 text-sm text-white/50">
                    <li className="flex items-start gap-2">
                      <span className="text-[#14F195] mt-0.5">→</span>
                      Build Solana programs with Anchor
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#14F195] mt-0.5">→</span>
                      Understand Solana account model
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#14F195] mt-0.5">→</span>
                      Write and deploy smart contracts
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
