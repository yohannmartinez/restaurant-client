import { cookies } from 'next/headers';
import { ServerApiFetchOptions, ServerApiFetchResult } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL;

if (!API_BASE_URL) {
    throw new Error('Missing API_URL or NEXT_PUBLIC_API_URL environment variable');
}

function isAuthRoute(path: string): boolean {
    return path === '/auth/refresh';
}

function mergeHeaders(headers?: HeadersInit): Headers {
    const merged = new Headers(headers);
    merged.delete('host');
    merged.delete('content-length');
    merged.delete('cookie');
    return merged;
}

function buildCookieHeader(params: {
    accessToken?: string;
    refreshToken?: string;
}): string {
    const parts: string[] = [];

    if (params.accessToken) {
        parts.push(`access_token=${params.accessToken}`);
    }

    if (params.refreshToken) {
        parts.push(`refresh_token=${params.refreshToken}`);
    }

    return parts.join('; ');
}

function extractCookieValue(setCookieHeader: string, cookieName: string): string | undefined {
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

async function callBackend(
    path: string,
    options: {
        method: string;
        headers?: HeadersInit;
        body?: BodyInit | null;
        accessToken?: string;
        refreshToken?: string;
    }
): Promise<Response> {
    const headers = mergeHeaders(options.headers);

    const cookieHeader = buildCookieHeader({
        accessToken: options.accessToken,
        refreshToken: options.refreshToken,
    });

    if (cookieHeader) {
        headers.set('cookie', cookieHeader);
    }

    const res = await fetch(`${API_BASE_URL}${path}`, {
        method: options.method,
        headers,
        body: options.body,
        cache: 'no-store',
    });



    return res;
}

async function tryRefresh(params: {
    refreshToken: string;
    accessToken?: string;
}) {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            cookie: buildCookieHeader({
                accessToken: params.accessToken,
                refreshToken: params.refreshToken,
            }),
        },
        cache: 'no-store',
    });

    const setCookie = response.headers.get('set-cookie');

    if (!response.ok) {
        return { ok: false as const };
    }

    const nextAccessToken = setCookie
        ? extractCookieValue(setCookie, 'access_token')
        : undefined;

    const nextRefreshToken = setCookie
        ? extractCookieValue(setCookie, 'refresh_token')
        : undefined;

    if (!nextAccessToken) {
        return { ok: false as const };
    }

    return {
        ok: true as const,
        accessToken: nextAccessToken,
        refreshToken: nextRefreshToken,
    };
}

async function serverApiFetchRaw({
    path,
    method = 'GET',
    headers,
    body,
}: ServerApiFetchOptions): Promise<ServerApiFetchResult> {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('access_token')?.value;
    const refreshToken = cookieStore.get('refresh_token')?.value;

    const initialResponse = await callBackend(path, {
        method,
        headers,
        body,
        accessToken,
        refreshToken,
    });


    if (initialResponse.status !== 401) {
        return {
            response: initialResponse,
            cookies: { action: 'none' },
        };
    }

    if (isAuthRoute(path) || !refreshToken) {
        return {
            response: initialResponse,
            cookies: { action: 'clear' },
        };
    }

    const refreshResult = await tryRefresh({
        refreshToken,
        accessToken,
    });

    if (!refreshResult.ok || !refreshResult.accessToken) {
        return {
            response: initialResponse,
            cookies: { action: 'clear' },
        };
    }

    const replayResponse = await callBackend(path, {
        method,
        headers,
        body,
        accessToken: refreshResult.accessToken,
        refreshToken: refreshResult.refreshToken ?? refreshToken,
    });


    if (replayResponse.status === 401) {
        return {
            response: replayResponse,
            cookies: { action: 'clear' },
        };
    }

    return {
        response: replayResponse,
        cookies: {
            action: 'set',
            accessToken: refreshResult.accessToken,
            refreshToken: refreshResult.refreshToken,
        },
    };
}

async function parseResponseBody<T>(response: Response): Promise<T> {
    if (response.status === 204) {
        return undefined as T;
    }

    const contentType = response.headers.get('content-type') ?? '';

    if (contentType.includes('application/json')) {
        return (await response.json()) as T;
    }

    return (await response.text()) as T;
}

export async function serverApiFetch<T = unknown>(path: string): Promise<T>;
export async function serverApiFetch<T = unknown>(
    options: ServerApiFetchOptions,
): Promise<ServerApiFetchResult>;
export async function serverApiFetch<T = unknown>(
    pathOrOptions: string | ServerApiFetchOptions,
): Promise<T | ServerApiFetchResult> {
    if (typeof pathOrOptions !== 'string') {
        return await serverApiFetchRaw(pathOrOptions);
    }

    const { response } = await serverApiFetchRaw({
        path: pathOrOptions,
        method: 'GET',
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Request failed with status ${response.status}`);
    }

    return await parseResponseBody<T>(response);
}
