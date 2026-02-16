import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEnrollment, useCourses, useLearnerProfile, useLessonProgress } from '../../hooks/useProgram';
import { getTrackName, getDifficultyName, getProgressPercent } from '../../lib/sdk';
import { useState } from 'react';
import { CourseCard } from '../../components';

const TRACK_COLORS = [
  'from-gray-500 to-gray-600',
  'from-emerald-500 to-emerald-600',
  'from-blue-500 to-blue-600',
  'from-purple-500 to-purple-600',
];

export default function CourseDetail() {
  const router = useRouter();
  const { courseId } = router.query;
  const { connected } = useWallet();
  const { profile } = useLearnerProfile();
  const { enrollment, enroll, loading: enrollLoading } = useEnrollment(courseId as string || '');
  const { completeLesson } = useLessonProgress(courseId as string || '');
  const [selectedLesson, setSelectedLesson] = useState(0);

  const course = {
    id: courseId as string,
    name: 'Anchor Framework',
    description: 'Learn to build Solana programs with Anchor framework. From basics to advanced patterns.',
    trackId: 1,
    difficulty: 1,
    lessonCount: 10,
    xpPerLesson: 30,
    completionBonusXp: 200,
    lessons: [
      { title: 'Introduction to Anchor', duration: '15 min', content: 'Anchor is a framework for Solana...' },
      { title: 'Setting Up Environment', duration: '20 min', content: 'Install Anchor CLI and dependencies...' },
      { title: 'Your First Program', duration: '25 min', content: 'Create a basic Solana program...' },
      { title: 'Accounts and Data', duration: '30 min', content: 'Understanding Solana account model...' },
      { title: 'Instructions', duration: '25 min', content: 'Defining program instructions...' },
      { title: 'Errors and Validation', duration: '20 min', content: 'Handling errors properly...' },
      { title: 'Testing with Mocha', duration: '35 min', content: 'Write tests for your program...' },
      { title: 'Deployment', duration: '20 min', content: 'Deploy to devnet and mainnet...' },
      { title: 'Frontend Integration', duration: '40 min', content: 'Connect your React app...' },
      { title: 'Best Practices', duration: '30 min', content: 'Security and optimization tips...' },
    ],
  };

  const isEnrolled = !!enrollment;
  const progress = isEnrolled ? Math.round((selectedLesson / course.lessons.length) * 100) : 0;

  const handleEnroll = async () => {
    if (!connected) {
      alert('Please connect wallet first');
      return;
    }
    if (!profile) {
      alert('Please initialize your profile first');
      return;
    }
    try {
      await enroll();
    } catch (err) {
      console.error('Failed to enroll:', err);
      alert('Failed to enroll: ' + (err as Error).message);
    }
  };

  return (
    <>
      <Head>
        <title>{course.name} | Superteam Academy</title>
      </Head>

      <div className="min-h-screen bg-slate-900 pb-20">
        {/* Course Header */}
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-700/50">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-purple-500/5" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <Link href="/" className="hover:text-emerald-400 transition-colors">Courses</Link>
              <span>/</span>
              <span className="text-white">{course.name}</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              {/* Left - Course Info */}
              <div className="flex-1">
                {/* Track Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${TRACK_COLORS[course.trackId]} text-white text-sm font-medium mb-4">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2l6 6-6 6-6-6 6-6z" />
                  </svg>
                  {getTrackName(course.trackId)}
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{course.name}</h1>
                <p className="text-slate-400 text-lg mb-6 max-w-2xl">{course.description}</p>

                {/* Stats Row */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {course.lessonCount} Lessons
                  </div>
                  
                  <div className="flex items-center gap-2 text-slate-300">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ~{course.lessonCount * 25} min
                  </div>

                  <div className="flex items-center gap-2 text-emerald-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    +{course.completionBonusXp} XP Bonus
                  </div>
                </div>
              </div>

              {/* Right - Enroll Card */}
              <div className="lg:w-80">
                {!connected ? (
                  <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
                    <p className="text-slate-400 mb-4">Connect wallet to enroll</p>
                    <WalletMultiButton className="!w-full !bg-emerald-500 hover:!bg-emerald-400 !rounded-xl" />
                  </div>
                ) : !isEnrolled ? (
                  <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                    <button
                      onClick={handleEnroll}
                      disabled={enrollLoading}
                      className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/30"
                    >
                      {enrollLoading ? 'Enrolling...' : 'Enroll Now'}
                    </button>
                    <p className="mt-4 text-center text-sm text-slate-400">
                      Free enrollment • Earn {course.completionBonusXp} XP
                    </p>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                    <div className="flex items-center gap-2 text-emerald-400 mb-4">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Enrolled
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-slate-400 mb-2">
                        <span>Progress</span>
                        <span className="text-white">{progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-center text-sm text-slate-400">
                      {selectedLesson} of {course.lessons.length} lessons
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-white mb-8">Course Content</h2>

          <div className="space-y-4">
            {course.lessons.map((lesson, index) => {
              const isCompleted = isEnrolled && index < selectedLesson;
              const isCurrent = isEnrolled && index === selectedLesson;
              
              return (
                <div
                  key={index}
                  onClick={() => isEnrolled && setSelectedLesson(index)}
                  className={`group p-6 rounded-xl border transition-all duration-300 ${
                    isCurrent 
                      ? 'bg-emerald-500/10 border-emerald-500/50' 
                      : isCompleted
                      ? 'bg-slate-800/30 border-slate-700/30'
                      : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
                  } ${!isEnrolled ? 'opacity-50' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Status Icon */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCompleted 
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                    >
                      {isCompleted ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-sm font-semibold">{index + 1}</span>
                      )}
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1">
                      <h3 className={`font-medium ${isCurrent ? 'text-emerald-400' : 'text-white'}`}>
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-slate-400">{lesson.content.substring(0, 60)}...</p>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {lesson.duration}
                    </div>

                    {/* XP */}
                    {isEnrolled && (
                      <div className="text-emerald-400 text-sm font-medium pl-4 border-l border-slate-700">
                        +{course.xpPerLesson} XP
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
