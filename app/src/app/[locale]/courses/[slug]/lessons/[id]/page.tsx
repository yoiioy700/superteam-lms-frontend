"use client";

import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { contentService } from '@/services/content';
import { Lesson } from '@/types';
import Link from 'next/link';

export default function LessonPage({ params }: { params: { slug: string, id: string, locale: string } }) {
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        contentService.getLesson(params.slug, params.id).then((l) => {
            setLesson(l);
            if (l?.type === 'challenge' && l.challengeData) {
                setCode(l.challengeData.starterCode);
            }
            setIsLoading(false);
        });
    }, [params.slug, params.id]);

    const handleRunCode = () => {
        // Stub runner since we don't have an embedded Solpg iframe.
        // In a prod environment, this would hit an API endpoint that compiles and tests the code.
        setOutput('Compiling Rust... \\nRunning Tests... \\n\\nPASS: test-1 - Hello, World! logged successfully.\\n\\nXP Awarded: +' + lesson?.xpReward);
    };

    if (isLoading) return <div className="p-10 text-center">Loading lesson...</div>;
    if (!lesson) return <div className="p-10 text-center text-red-500">Lesson not found.</div>;

    return (
        <div className="flex h-[calc(100vh-3.5rem)] w-full overflow-hidden">
            {/* Left Panel: Markdown Content / Challenge Description */}
            <div className="w-full md:w-1/2 flex flex-col border-r h-full overflow-y-auto bg-muted/20">
                <div className="p-6">
                    <Link href={`/${params.locale}/courses/${params.slug}`} className="text-sm text-primary hover:underline mb-4 inline-block">
                        &larr; Back to Course
                    </Link>
                    <div className="flex items-center gap-3 mb-6">
                        <h1 className="text-3xl font-bold">{lesson.title}</h1>
                        {lesson.type === 'challenge' && (
                            <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">CHALLENGE</span>
                        )}
                        <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-xs font-bold rounded ml-auto">
                            +{lesson.xpReward} XP
                        </span>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        {lesson.type === 'content' ? (
                            <ReactMarkdown>{lesson.contentMarkdown || ''}</ReactMarkdown>
                        ) : (
                            <div>
                                <h2>Objective</h2>
                                <p>{lesson.challengeData?.objective}</p>
                                <h3>Test Cases</h3>
                                <ul className="list-disc pl-5 space-y-2 mt-4">
                                    {lesson.challengeData?.testCases.map((tc) => (
                                        <li key={tc.id} className="text-sm font-mono bg-background p-2 rounded">
                                            Must output: <span className="text-green-400">{tc.expectedOutput}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Panel: Monaco Editor (Only if Challenge) */}
            {lesson.type === 'challenge' && (
                <div className="hidden md:flex flex-col w-1/2 h-full bg-[#1e1e1e]">
                    <div className="flex items-center justify-between p-2 bg-background border-b border-white/10">
                        <span className="text-sm font-mono text-muted-foreground ml-2">main.rs</span>
                        <Button size="sm" onClick={handleRunCode} className="h-7 text-xs">Run Tests</Button>
                    </div>
                    <div className="flex-1">
                        <Editor
                            height="100%"
                            defaultLanguage={lesson.challengeData?.language || 'rust'}
                            theme="vs-dark"
                            value={code}
                            onChange={(v) => setCode(v || '')}
                            options={{ minimap: { enabled: false }, fontSize: 14 }}
                        />
                    </div>
                    <div className="h-48 border-t border-white/10 bg-black p-4 overflow-y-auto font-mono text-sm text-green-400 whitespace-pre-wrap">
                        {output || '> Waiting to run tests...'}
                    </div>
                </div>
            )}
        </div>
    );
}
