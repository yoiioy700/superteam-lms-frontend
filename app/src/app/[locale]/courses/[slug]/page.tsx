import { notFound } from 'next/navigation';
import Link from 'next/link';
import { contentService } from '@/services/content';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default async function CourseDetailPage({ params }: { params: { slug: string, locale: string } }) {
    const course = await contentService.getCourseById(params.slug);

    if (!course) {
        notFound();
    }

    // Mock Progress (0% since user not fetched in server component yet)
    const progressPercent = 0;

    return (
        <div className="container max-w-5xl py-10">
            <div className="flex flex-col md:flex-row gap-10">

                {/* Main Content (Syllabus) */}
                <div className="flex-1">
                    <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
                    <p className="text-muted-foreground mt-4 text-lg">{course.description}</p>

                    <div className="mt-10 space-y-6">
                        <h2 className="text-2xl font-semibold">Syllabus</h2>
                        {course.modules.length === 0 && <p className="text-muted-foreground">Module content coming soon.</p>}

                        {course.modules.map((mod, idx) => (
                            <Card key={mod.id}>
                                <CardHeader>
                                    <CardTitle>Module {idx + 1}: {mod.title}</CardTitle>
                                    <CardDescription>{mod.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {mod.lessons.map(lesson => (
                                        <Link key={lesson.id} href={`/courses/${course.id}/lessons/${lesson.id}`}>
                                            <div className="flex justify-between items-center p-3 rounded-md border hover:bg-muted/50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-muted-foreground text-sm">{lesson.index + 1}.</span>
                                                    <span className="font-medium">{lesson.title}</span>
                                                    {lesson.type === 'challenge' && <Badge variant="destructive" className="ml-2">Code Challenge</Badge>}
                                                </div>
                                                <span className="text-sm font-semibold text-yellow-500">+{lesson.xpReward} XP</span>
                                            </div>
                                        </Link>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Sidebar (Enrollment / Progress) */}
                <div className="w-full md:w-80 flex flex-col gap-6">
                    <Card className="sticky top-20">
                        <CardHeader>
                            <CardTitle>Course Progress</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Completed</span>
                                    <span className="font-medium">{progressPercent}%</span>
                                </div>
                                <Progress value={progressPercent} />
                            </div>

                            <div className="pt-4 border-t">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-muted-foreground">Difficulty</span>
                                    <span className="font-medium">{course.difficulty}</span>
                                </div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-muted-foreground">Duration</span>
                                    <span className="font-medium">{course.durationHours} Hours</span>
                                </div>
                                <div className="flex justify-between text-sm mb-6">
                                    <span className="text-muted-foreground">Reward</span>
                                    <span className="font-medium text-yellow-500">{course.xpReward} XP</span>
                                </div>

                                <Button className="w-full text-md h-12">Enroll Now</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
