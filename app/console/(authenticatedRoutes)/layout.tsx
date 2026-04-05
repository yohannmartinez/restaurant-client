import { getCurrentUser } from '@/lib/api/auth/get-current-user';
import { AuthProvider } from '@/lib/providers/auth-provider';
import { redirect } from 'next/navigation';
import { NavbarProvider } from '../providers/navbar-provider';
import { Navbar } from '../components/navbar';
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

    return (
        <AuthProvider initialUser={user}>
            <NavbarProvider>
                <div className="min-h-screen bg-muted/30">
                    <Navbar user={user} />
                    <main className="mx-auto flex w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </div>
            </NavbarProvider>
        </AuthProvider>
    );
}
