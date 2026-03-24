import { getCurrentUser } from '@/lib/api/auth/get-current-user';
import { AuthProvider } from '@/lib/providers/auth-provider';
import { redirect } from 'next/navigation';

const UNAUTHENTICATED_REDIRECT_PATH = '/console/login';

export default async function AuthenticatedConsoleLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getCurrentUser().catch(
        () => null,
    );

    if (!user) {
        redirect(UNAUTHENTICATED_REDIRECT_PATH);
    }

    return <AuthProvider initialUser={user}>{children}</AuthProvider>;
}
