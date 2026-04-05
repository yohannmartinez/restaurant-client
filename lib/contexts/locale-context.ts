import { createContext } from 'react';
import type { Locale } from '@/lib/i18n/config';
import type { LocaleMessages } from '@/lib/i18n/messages';

export type LocaleContextValue = {
    locale: Locale;
    messages: LocaleMessages;
    setLocale: (locale: Locale) => void;
};

export const LocaleContext = createContext<LocaleContextValue | null>(null);
