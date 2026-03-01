export type AchievementType = {
    id: string;
    name: string;
    description: string;
    xpReward: number;
    imageUrl: string;
};

export type Course = {
    id: string; // PDA identifier
    title: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    durationHours: number;
    xpReward: number;
    modules: CourseModule[];
    trackId: string;
};

export type CourseModule = {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
};

export type Lesson = {
    id: string; // Used in the 256-bit bitmap
    index: number; // 0-255 bit index
    title: string;
    type: 'content' | 'challenge';
    xpReward: number;
    contentMarkdown?: string;
    challengeData?: ChallengeData;
};

export type ChallengeData = {
    objective: string;
    starterCode: string;
    language: 'rust' | 'typescript' | 'json';
    testCases: TestCase[];
};

export type TestCase = {
    id: string;
    input: string;
    expectedOutput: string;
    isHidden: boolean;
};

export type UserProfile = {
    walletAddress: string;
    name?: string;
    bio?: string;
    avatarUrl?: string;
    githubId?: string;
    googleId?: string;
};

export type LearningProgress = {
    walletAddress: string;
    courseId: string;
    completedLessonsBitmap: number; // Simplified representation of the 256-bit bitmap
    completedAt?: string;
};

export type LeaderboardEntry = {
    walletAddress: string;
    name: string;
    xpBalance: number;
    level: number;
    avatarUrl?: string;
};
