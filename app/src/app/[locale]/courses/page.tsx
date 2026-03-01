import Link from 'next/link';
import { contentService } from '@/services/content';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default async function CoursesPage() {
    const courses = await contentService.getCourses();

    return (
        <div className="container max-w-7xl py-10">
            <div className="flex flex-col mb-8">
                <h1 className="text-4xl font-bold tracking-tight">Course Catalog</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Master Solana with interactive learning paths.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <Card key={course.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                                <Badge variant={course.difficulty === 'Beginner' ? 'default' : 'secondary'}>
                                    {course.difficulty}
                                </Badge>
                                <span className="text-sm font-medium text-muted-foreground">{course.durationHours}h</span>
                            </div>
                            <CardTitle className="text-xl">{course.title}</CardTitle>
                            <CardDescription>{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="flex items-center text-sm text-yellow-500 font-semibold">
                                <span className="mr-1">⚡</span> {course.xpReward} XP Reward
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Link href={`/courses/${course.id}`} className="w-full">
                                <Button className="w-full">View Course</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
