import { NextRequest, NextResponse } from 'next/server';
import { serverApiFetch } from '@/lib/api/fetch/server-api-fetch';
import type { AuthCookiePatch } from '@/lib/api/fetch/types';

type RouteContext = {
    params: Promise<{
        slug: string[];
    }>;
};

function buildBackendPath(request: NextRequest, slug: string[]): string {
    const joinedPath = slug.join('/');
    const search = request.nextUrl.search;

    return `/${joinedPath}${search}`;
}

function shouldHaveBody(method: string): boolean {
    return !['GET', 'HEAD'].includes(method.toUpperCase());
}

async function extractRequestBody(
    request: NextRequest,
): Promise<BodyInit | null | undefined> {
    const contentType = request.headers.get('content-type') ?? '';

    if (contentType.includes('application/json')) {
        return await request.text();
    }

    if (
        contentType.includes('multipart/form-data') ||
        contentType.includes('application/x-www-form-urlencoded') ||
        contentType.includes('text/plain')
    ) {
        return await request.text();
    }

    return await request.text();
}

function applyCookiePatch(response: NextResponse, patch: AuthCookiePatch): void {

    if (patch.action === 'set') {
        response.cookies.set('access_token', patch.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 15,
        });

        if (patch.refreshToken) {
            response.cookies.set('refresh_token', patch.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });
        }

        return;
    }

    if (patch.action === 'clear') {
        response.cookies.set('access_token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 0,
        });

        response.cookies.set('refresh_token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 0,
        });
    }
}

async function handle(
    request: NextRequest,
    context: RouteContext,
): Promise<NextResponse> {
    const { slug } = await context.params;
    const path = buildBackendPath(request, slug);

    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.delete('cookie');
    headers.delete('content-length');

    const body = shouldHaveBody(request.method)
        ? await extractRequestBody(request)
        : undefined;

    const { response: backendResponse, cookies } = await serverApiFetch({
        path,
        method: request.method,
        headers,
        body,
    });

    const responseHeaders = new Headers();

    const contentType = backendResponse.headers.get('content-type');
    if (contentType) {
        responseHeaders.set('content-type', contentType);
    }

    const contentDisposition = backendResponse.headers.get('content-disposition');
    if (contentDisposition) {
        responseHeaders.set('content-disposition', contentDisposition);
    }

    let nextResponse: NextResponse;

    if (request.method.toUpperCase() === 'HEAD') {
        nextResponse = new NextResponse(null, {
            status: backendResponse.status,
            headers: responseHeaders,
        });
    } else {
        const text = await backendResponse.text();

        nextResponse = new NextResponse(text, {
            status: backendResponse.status,
            headers: responseHeaders,
        });
    }

    applyCookiePatch(nextResponse, cookies);

    return nextResponse;
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
export const HEAD = handle;
