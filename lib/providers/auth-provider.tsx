'use client';

import { useState, type ReactNode } from 'react';
import { AuthContext, type AuthContextValue } from '@/lib/contexts/auth-context';
import type { AuthenticatedUser } from '@/lib/types/auth';

type AuthProviderProps = {
    children: ReactNode;
    initialUser: AuthenticatedUser | null;
};

export function AuthProvider({
    children,
    initialUser,
}: AuthProviderProps) {
    const [user, setUser] = useState<AuthenticatedUser | null>(initialUser);

    const value: AuthContextValue = {
        user,
        setUser,
        isAuthenticated: user !== null,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
