import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/api/auth/get-current-user';

const AUTHENTICATED_REDIRECT_PATH = '/console/dashboard';
const AUTH_COOKIE_NAMES = ['access_token', 'refresh_token'] as const;

export default async function UnauthenticatedConsoleLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const hasAuthCookie = AUTH_COOKIE_NAMES.some((cookieName) =>
        Boolean(cookieStore.get(cookieName)?.value),
    );

    const user = hasAuthCookie
        ? await getCurrentUser().catch(() => null)
        : null;

    if (user) {
        redirect(AUTHENTICATED_REDIRECT_PATH);
    }

    return children;
}
