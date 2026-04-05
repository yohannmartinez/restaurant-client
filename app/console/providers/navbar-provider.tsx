'use client';

import {
    type ReactNode,
    useMemo,
    useState,
} from 'react';
import { NavbarContext } from '../contexts/navbar-context';

export function NavbarProvider({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    const [breadcrumb, setBreadcrumb] = useState<ReactNode | null>(null);

    const value = useMemo(
        () => ({
            breadcrumb,
            setBreadcrumb,
        }),
        [breadcrumb],
    );

    return (
        <NavbarContext.Provider value={value}>
            {children}
        </NavbarContext.Provider>
    );
}
