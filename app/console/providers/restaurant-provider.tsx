'use client';

import { useMemo, type ReactNode } from 'react';
import { RestaurantContext, type RestaurantContextValue } from '@/app/console/contexts/restaurant-context';
import type { getUserRestaurantResult } from '@/lib/types/restaurant';

type RestaurantProviderProps = {
    children: ReactNode;
    initialRestaurants: getUserRestaurantResult[];
};

export function RestaurantProvider({
    children,
    initialRestaurants,
}: RestaurantProviderProps) {
    const value = useMemo<RestaurantContextValue>(() => {
        return {
            restaurants: initialRestaurants,
        };
    }, [initialRestaurants]);

    return (
        <RestaurantContext.Provider value={value}>
            {children}
        </RestaurantContext.Provider>
    );
}
