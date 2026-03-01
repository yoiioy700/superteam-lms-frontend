"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        // Basic implementation for NextIntl.
        // E.g., /en/courses -> /es/courses
        const segments = pathname.split('/');
        if (segments.length > 1 && ['en', 'es', 'pt-BR'].includes(segments[1])) {
            segments[1] = newLocale;
        } else {
            segments.splice(1, 0, newLocale);
        }
        router.push(segments.join('/') || `/${newLocale}`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    {locale.toUpperCase()}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => switchLocale('en')}>
                    English (EN)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLocale('pt-BR')}>
                    Português (PT-BR)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLocale('es')}>
                    Español (ES)
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
