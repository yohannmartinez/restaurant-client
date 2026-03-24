'use client';

import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { AuthenticatedUser } from '@/lib/types/auth';

export type AuthContextValue = {
    isAuthenticated: boolean;
    setUser: Dispatch<SetStateAction<AuthenticatedUser | null>>;
    user: AuthenticatedUser | null;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
