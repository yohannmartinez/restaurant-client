'use client';

import { useContext } from 'react';
import {
    NavbarContext,
    type NavbarContextValue,
} from '../contexts/navbar-context';

export function useNavbar(): NavbarContextValue {
    const context = useContext(NavbarContext);

    if (!context) {
        throw new Error('useNavbar must be used within a NavbarProvider');
    }

    return context;
}
