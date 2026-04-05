'use client';

import { type ReactNode, useEffect } from 'react';
import { useNavbar } from '../hooks/use-navbar';

export function PageBreadcrumb({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    const { setBreadcrumb } = useNavbar();

    useEffect(() => {
        setBreadcrumb(children);

        return () => {
            setBreadcrumb(null);
        };
    }, [children, setBreadcrumb]);

    return null;
}
