'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { LocaleContext } from '@/lib/contexts/locale-context';
import { LOCALE_COOKIE_NAME, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';

type LocaleProviderProps = {
    children: ReactNode;
    initialLocale: Locale;
};

function persistLocale(locale: Locale) {
    document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LocaleProvider({
    children,
    initialLocale,
}: LocaleProviderProps) {
    const [locale, setLocaleState] = useState<Locale>(initialLocale);

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    function setLocale(nextLocale: Locale) {
        setLocaleState(nextLocale);
        persistLocale(nextLocale);
    }

    return (
        <LocaleContext.Provider
            value={{
                locale,
                messages: getMessages(locale),
                setLocale,
            }}
        >
            {children}
        </LocaleContext.Provider>
    );
}
