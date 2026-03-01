import { Course } from '@/types';

export const MOCK_COURSES: Course[] = [
    {
        id: 'course-1-solana-fundamentals',
        title: 'Solana Fundamentals',
        description: 'Learn the core concepts of Solana: Accounts, PDAs, and basic Rust smart contract development.',
        difficulty: 'Beginner',
        durationHours: 6,
        xpReward: 500,
        trackId: 'track-1-core',
        modules: [
            {
                id: 'mod-1-intro',
                title: 'Introduction to Solana',
                description: 'Understand the Solana architecture.',
                lessons: [
                    {
                        id: 'lesson-0',
                        index: 0,
                        title: 'What is Solana?',
                        type: 'content',
                        xpReward: 25,
                        contentMarkdown: '# Welcome to Solana\n\nSolana is a high-performance blockchain...'
                    },
                    {
                        id: 'lesson-1',
                        index: 1,
                        title: 'The Account Model',
                        type: 'content',
                        xpReward: 25,
                        contentMarkdown: '# The Account Model\n\nEverything in Solana is an Account...'
                    }
                ]
            },
            {
                id: 'mod-2-rust',
                title: 'Rust Basics',
                description: 'Write your first Solana program in Rust.',
                lessons: [
                    {
                        id: 'lesson-2',
                        index: 2,
                        title: 'Hello World',
                        type: 'challenge',
                        xpReward: 100,
                        challengeData: {
                            objective: 'Log "Hello, World!" to the Solana program console.',
                            language: 'rust',
                            starterCode: 'use anchor_lang::prelude::*;\n\n#[program]\npub mod hello_world {\n    use super::*;\n    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {\n        // Your code here\n        Ok(())\n    }\n}',
                            testCases: [
                                { id: 'test-1', input: '', expectedOutput: 'Hello, World!', isHidden: false }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'course-2-defi-dev',
        title: 'DeFi Developer',
        description: 'Build your own AMM and Token Swaps.',
        difficulty: 'Intermediate',
        durationHours: 12,
        xpReward: 1500,
        trackId: 'track-2-defi',
        modules: []
    }
];
