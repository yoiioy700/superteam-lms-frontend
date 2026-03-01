import { learningService } from '@/services/learning';
import { Card, CardContent } from '@/components/ui/card';

export default async function LeaderboardPage() {
    const leaderboard = await learningService.getLeaderboard();

    return (
        <div className="container max-w-4xl py-10 space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Global Leaderboard</h1>
                <p className="text-muted-foreground text-lg">Top Solana learners by XP. Earn more soulbound XP to climb the ranks!</p>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="rounded-md border">
                        <div className="grid grid-cols-12 bg-muted/50 p-4 text-sm font-medium border-b">
                            <div className="col-span-2 text-center">Rank</div>
                            <div className="col-span-6">Builder</div>
                            <div className="col-span-2 text-center">Level</div>
                            <div className="col-span-2 text-right">XP</div>
                        </div>

                        {leaderboard.map((entry, index) => (
                            <div key={entry.walletAddress} className="grid grid-cols-12 items-center p-4 border-b last:border-0 hover:bg-muted/20 transition-colors">
                                <div className="col-span-2 text-center font-bold text-lg">
                                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                                </div>
                                <div className="col-span-6 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold">{entry.name}</div>
                                        <div className="text-xs text-muted-foreground font-mono">{entry.walletAddress.substring(0, 4)}...{entry.walletAddress.substring(entry.walletAddress.length - 4)}</div>
                                    </div>
                                </div>
                                <div className="col-span-2 text-center font-medium">{entry.level}</div>
                                <div className="col-span-2 text-right font-bold text-yellow-500">{entry.xpBalance.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
