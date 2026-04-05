'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { AuthenticatedUser } from '@/lib/types/auth';
import { cn } from '@/lib/tailwind/utils';
import { useNavbar } from '../hooks/use-navbar';
import { useAuth } from '@/lib/hooks/use-auth';
import { Text } from '@/lib/components/ui/text';
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/components/ui/popover';
import { Button } from '@/lib/components/ui/button';
import { IconLogout } from '@tabler/icons-react';
import { toast } from 'sonner';
import { useLocale } from '@/lib/hooks/use-locale';

type NavbarProps = {
    user: AuthenticatedUser;
};

function getInitials(user: AuthenticatedUser) {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
}

export function Navbar({
    user,
}: NavbarProps) {
    const router = useRouter();
    const { breadcrumb } = useNavbar();
    const { setUser } = useAuth();
    const fullName = `${user.firstName} ${user.lastName}`.trim();
    const [isLogoutLoading, setIsLogoutLoading] = useState(false);
    const [, startTransition] = useTransition();
    const { messages } = useLocale();
    const translates = messages.console.navbar;

    async function handleLogout() {
        try {
            setIsLogoutLoading(true);

            await fetch('/api/auth/logout', {
                method: 'POST',
            });

            setUser(null);
            toast.success('Successfully logged out');
            startTransition(() => {
                router.replace('/console/login');
                router.refresh();
            });
        } finally {
            setIsLogoutLoading(false);
        }
    }

    return (
        <header className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <div className="min-w-0 flex-1">
                    {breadcrumb}
                </div>

                <div className="flex items-center gap-4 bg-background px-3 py-2">
                    <div className="text-right flex flex-col gap-1">
                        <Text as="p" size="2" weight="medium" trim='both'>
                            {fullName}
                        </Text>
                        <Text as="p" size="1" weight="light">
                            {user.email}
                        </Text>
                    </div>

                    <Popover>
                        <PopoverTrigger className="flex items-center" asChild>
                            {user.picture ? (
                                <div
                                    className="size-10 rounded-full bg-cover bg-center bg-no-repeat cursor-pointer"
                                    role="img"
                                    aria-label={fullName}
                                    style={{ backgroundImage: `url("${user.picture}")` }}
                                />
                            ) : (
                                <div
                                    className={cn(
                                        'flex size-10 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background',
                                    )}
                                    aria-hidden="true"
                                >
                                    {getInitials(user)}
                                </div>
                            )}
                        </PopoverTrigger>
                        <PopoverContent align='end' className='mt-2'>
                            <Button
                                variant="destructive"
                                onClick={handleLogout}
                                isLoading={isLogoutLoading}
                            >
                                <IconLogout />
                                {translates.logout}
                            </Button>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </header>
    );
}
