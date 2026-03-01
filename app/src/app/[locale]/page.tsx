import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
    const t = useTranslations('Index');

    return (
        <div className="flex flex-col items-center justify-center space-y-16 py-20 px-4 md:py-32">
            {/* Hero Section */}
            <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] md:block hidden">
                    {t('title')}
                </h1>
                <p className="max-w-[750px] text-center text-lg font-light text-muted-foreground sm:text-xl">
                    {t('description')} The ultimate learning platform for Solana-native developers — an open-source, interactive education hub.
                </p>

                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
                    <Link href="/courses">
                        <Button size="lg">Explore Courses</Button>
                    </Link>
                    <Link href="/api/auth/signin">
                        <Button variant="outline" size="lg">Sign Up</Button>
                    </Link>
                </div>
            </section>

            {/* Feature Highlights Mockup */}
            <section className="container max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    <h3 className="text-xl font-bold">Interactive Coding</h3>
                    <p className="text-sm text-muted-foreground">Browser-based Rust and TypeScript challenges.</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold">Earn XP & Level Up</h3>
                    <p className="text-sm text-muted-foreground">Gamified progression backed by on-chain tokens.</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold">On-Chain Credentials</h3>
                    <p className="text-sm text-muted-foreground">Soulbound NFTs representing your technical mastery.</p>
                </div>
            </section>
        </div>
    );
}
