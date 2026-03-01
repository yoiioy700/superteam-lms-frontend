import { LeaderboardEntry } from '@/types';

// Mock DB for user progress to easily swap with on-chain later
class LearningProgressService {
    /**
     * Get progress for a user on a specific course
     */
    async getCourseProgress(walletAddress: string, courseId: string) {
        // Return mock data for MVP
        return {
            walletAddress,
            courseId,
            completedLessonsBitmap: 5, // e.g. binary 101 => lessons 0 and 2 completed
        };
    }

    /**
     * Mark a lesson as completed
     */
    async completeLesson(walletAddress: string, courseId: string, lessonIndex: number) {
        console.log(`[STUB] Marked lesson ${lessonIndex} on course ${courseId} as completed for ${walletAddress}`);
        return true; // Stub
    }

    /**
     * Get the current XP balance from Token-2022 Account (Stub)
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getXPBalance(walletAddress: string): Promise<number> {
        return 1500; // Mock 1500 XP
    }

    /**
     * Derive user level from XP: floor(sqrt(xp / 100))
     */
    async getUserLevel(walletAddress: string): Promise<number> {
        const xp = await this.getXPBalance(walletAddress);
        return Math.floor(Math.sqrt(xp / 100));
    }

    /**
     * Get Leaderboard Data
     */
    async getLeaderboard(): Promise<LeaderboardEntry[]> {
        return [
            { walletAddress: '6Xw...', name: 'Alice Solana', xpBalance: 4500, level: 6 },
            { walletAddress: '9Qw...', name: 'Bob Developer', xpBalance: 3200, level: 5 },
            { walletAddress: '2Aw...', name: 'Charlie Builder', xpBalance: 1200, level: 3 },
        ];
    }

    /**
     * Get user streak data
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getStreakData(walletAddress: string) {
        return {
            currentStreak: 12,
            longestStreak: 15,
            lastActive: new Date().toISOString(),
        };
    }
}

export const learningService = new LearningProgressService();
