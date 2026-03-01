import Link from 'next/link';

interface CourseCardProps {
    id: string;
    title: string;
    level: string;
    color: string;
    desc: string;
    icon: React.ReactNode;
}

export function CourseCard({ id, title, level, color, desc, icon }: CourseCardProps) {
    return (
        <Link
            href={`/course/${id}`}
            className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg overflow-hidden flex flex-col group cursor-pointer hover:border-[#C9A962]/50 transition"
        >
            <div className="h-40 bg-[#1E1E1E] flex items-center justify-center border-b border-[#1F1F1F] relative overflow-hidden">
                {icon}
            </div>
            <div className="p-6 flex flex-col gap-4">
                <span
                    className="text-[10px] font-bold tracking-wider px-2.5 py-1.5 rounded w-fit"
                    style={{ color: color, backgroundColor: `${color}15` }}
                >
                    {level}
                </span>
                <h3 className="text-xl font-playfair text-[#FAF8F5] group-hover:text-primary transition">{title}</h3>
                <p className="text-[#888888] text-sm font-manrope leading-relaxed line-clamp-2">{desc}</p>
            </div>
        </Link>
    );
}
