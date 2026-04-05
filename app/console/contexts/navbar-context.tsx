'use client';

import { createContext, type ReactNode } from 'react';

export type NavbarContextValue = {
    breadcrumb: ReactNode | null;
    setBreadcrumb: (breadcrumb: ReactNode | null) => void;
};

export const NavbarContext = createContext<NavbarContextValue | null>(null);
