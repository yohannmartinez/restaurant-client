import { serverApiFetch } from '@/lib/api/fetch/server-api-fetch';
import type { AuthenticatedUser } from '@/lib/types/auth';
import { redirect } from 'next/navigation';

const CONSOLE_LOGIN_PATH = '/console/login';
const CONSOLE_DASHBOARD_PATH = '/console/dashboard';

export default async function ConsolePage() {
    const user = await serverApiFetch<AuthenticatedUser>('/auth/me').catch(
        () => null,
    );

    redirect(user ? CONSOLE_DASHBOARD_PATH : CONSOLE_LOGIN_PATH);
}
