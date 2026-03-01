import { learningService } from '@/services/learning';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { contentService } from '@/services/content';
import Link from 'next/link';

export default async function DashboardPage() {
    // Stub User Identity (Mocking an active session)
    const walletAddress = '6Xwallet...';

    const xp = await learningService.getXPBalance(walletAddress);
    const level = await learningService.getUserLevel(walletAddress);
    const streak = await learningService.getStreakData(walletAddress);
    const courses = await contentService.getCourses();

    return (
        <div className="container max-w-5xl py-10 space-y-10">

            {/* Profile & Stats Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1 md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-3">
                            <span className="text-4xl">👋</span> Welcome Back, Builder!
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4 items-center">
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xl">Lvl {level}</div>
                            <div>
                                <div className="text-sm text-muted-foreground font-mono">{walletAddress}</div>
                                <div className="font-bold text-yellow-500 mt-1">{xp} XP Total</div>
                            </div>
                        </div>

                        <div className="space-y-2 mt-4">
                            <div className="flex justify-between text-sm">
                                <span>Progress to Level {level + 1}</span>
                                <span className="font-mono">{xp} / {Math.pow(level + 1, 2) * 100} XP</span>
                            </div>
                            <Progress value={(xp / (Math.pow(level + 1, 2) * 100)) * 100} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Streak</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-6 text-center">
                        <div className="text-5xl font-black text-orange-500 mb-2 whitespace-nowrap">🔥 {streak.currentStreak} Days</div>
                        <p className="text-sm text-muted-foreground">Keep learning to maintain your streak!</p>
                        <Badge variant="outline" className="mt-4">Best: {streak.longestStreak} days</Badge>
                    </CardContent>
                </Card>
            </div>

            {/* Course Enrollments */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Your Courses</h2>
                <div className="space-y-4">
                    {courses.map(course => (
                        <Card key={course.id}>
                            <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold">{course.title}</h3>
                                    <p className="text-sm text-muted-foreground">{course.description}</p>
                                </div>
                                <div className="w-full md:w-32">
                                    <div className="text-sm text-right mb-1">In Progress</div>
                                    <Progress value={25} />
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <Link href={`/courses/${course.id}`}>
                                        <Button variant="secondary">Resume</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

        </div>
    );
}
