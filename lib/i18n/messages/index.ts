import type { Locale } from '@/lib/i18n/config';
import { enMessages } from '@/lib/i18n/messages/en';
import { frMessages } from '@/lib/i18n/messages/fr';

export const messages = {
    fr: frMessages,
    en: enMessages,
} as const;

export type LocaleMessages = (typeof messages)[Locale];

export function getMessages(locale: Locale): LocaleMessages {
    return messages[locale];
}
