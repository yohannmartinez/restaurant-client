import { NextResponse, type NextRequest } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL;

if (!API_BASE_URL) {
    throw new Error('Missing API_URL or NEXT_PUBLIC_API_URL environment variable');
}

const ACCESS_TOKEN_COOKIE = 'access_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';

function buildCookieHeader(params: {
    accessToken?: string;
    refreshToken?: string;
}): string {
    const parts: string[] = [];

    if (params.accessToken) {
        parts.push(`${ACCESS_TOKEN_COOKIE}=${params.accessToken}`);
    }

    if (params.refreshToken) {
        parts.push(`${REFRESH_TOKEN_COOKIE}=${params.refreshToken}`);
    }

    return parts.join('; ');
}

function extractCookieValue(
    setCookieHeader: string,
    cookieName: string,
): string | undefined {
    const cookies = setCookieHeader.split(/,(?=\s*\w+=)/);

    for (const cookie of cookies) {
        const trimmed = cookie.trim();

        if (trimmed.startsWith(`${cookieName}=`)) {
            const firstPart = trimmed.split(';')[0];
            return firstPart.substring(`${cookieName}=`.length);
        }
    }

    return undefined;
}

function applyAuthCookies(response: NextResponse, params: {
    accessToken: string;
    refreshToken?: string;
}): void {
    response.cookies.set(ACCESS_TOKEN_COOKIE, params.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15,
    });

    if (params.refreshToken) {
        response.cookies.set(REFRESH_TOKEN_COOKIE, params.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });
    }
}

function clearAuthCookies(response: NextResponse): void {
    response.cookies.set(ACCESS_TOKEN_COOKIE, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
    });

    response.cookies.set(REFRESH_TOKEN_COOKIE, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
    });
}

export async function proxy(request: NextRequest) {
    const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
    const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

    if (accessToken || !refreshToken) {
        return NextResponse.next();
    }

    const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            cookie: buildCookieHeader({ refreshToken }),
        },
        cache: 'no-store',
    });

    if (!refreshResponse.ok) {
        const response = NextResponse.next();
        clearAuthCookies(response);
        return response;
    }

    const setCookie = refreshResponse.headers.get('set-cookie');
    const nextAccessToken = setCookie
        ? extractCookieValue(setCookie, ACCESS_TOKEN_COOKIE)
        : undefined;
    const nextRefreshToken = setCookie
        ? extractCookieValue(setCookie, REFRESH_TOKEN_COOKIE)
        : undefined;

    if (!nextAccessToken) {
        const response = NextResponse.next();
        clearAuthCookies(response);
        return response;
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(
        'cookie',
        buildCookieHeader({
            accessToken: nextAccessToken,
            refreshToken: nextRefreshToken ?? refreshToken,
        }),
    );

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    applyAuthCookies(response, {
        accessToken: nextAccessToken,
        refreshToken: nextRefreshToken,
    });

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\..*$).*)'],
};
