type ClientApiFetchOptions = Omit<RequestInit, 'body'> & {
    body?: BodyInit | object | null;
};

function normalizePath(path: string): string {
    if (path.startsWith('/')) {
        return `/api/proxy${path}`;
    }

    return `/api/proxy/${path}`;
}

export async function clientApiFetch<T = unknown>(
    path: string,
    options: ClientApiFetchOptions = {},
): Promise<T> {
    const { body, headers, ...rest } = options;

    const finalHeaders = new Headers(headers);
    let finalBody: BodyInit | undefined;

    if (body instanceof FormData) {
        finalBody = body;
    } else if (body && typeof body === 'object') {
        if (!finalHeaders.has('content-type')) {
            finalHeaders.set('content-type', 'application/json');
        }
        finalBody = JSON.stringify(body);
    } else if (typeof body === 'string') {
        finalBody = body;
    }

    const response = await fetch(normalizePath(path), {
        ...rest,
        headers: finalHeaders,
        body: finalBody,
        credentials: 'include',
        cache: 'no-store',
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Request failed with status ${response.status}`);
    }

    const contentType = response.headers.get('content-type') ?? '';

    if (contentType.includes('application/json')) {
        return (await response.json()) as T;
    }

    return (await response.text()) as T;
}