import { getCurrentUser } from '@/lib/api/auth/get-current-user';
import { serverApiFetch } from '@/lib/api/fetch/server-api-fetch';
import { AuthProvider } from '@/lib/providers/auth-provider';
import type { Restaurant } from '@/lib/types/restaurant';
import { redirect } from 'next/navigation';
import { SidebarInset, SidebarProvider } from '@/lib/components/ui/sidebar';
import { RestaurantProvider } from '../providers/restaurant-provider';
import { ConsoleSidebar } from '../components/sidebar/sidebar';
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

    const restaurants = await serverApiFetch<Restaurant[]>('/restaurant/me').catch(
        () => [],
    );

    return (
        <AuthProvider initialUser={user}>
            <RestaurantProvider initialRestaurants={restaurants}>
                <SidebarProvider>
                    <ConsoleSidebar />
                    <SidebarInset >
                        <main className="flex w-full flex-1 flex-col p-6">
                            {children}
                        </main>
                    </SidebarInset>
                </SidebarProvider>
            </RestaurantProvider>
        </AuthProvider>
    );
}
