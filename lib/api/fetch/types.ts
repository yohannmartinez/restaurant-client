export type AuthCookiePatch =
    | {
        action: 'set';
        accessToken: string;
        refreshToken?: string;
    }
    | {
        action: 'clear';
    }
    | {
        action: 'none';
    };

export type ServerApiFetchResult = {
    response: Response;
    cookies: AuthCookiePatch;
};

export type ServerApiFetchOptions = {
    path: string;
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
};
