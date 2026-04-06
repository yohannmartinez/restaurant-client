'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { RestaurantContext, type RestaurantContextValue } from '@/app/console/contexts/restaurant-context';
import type { Restaurant } from '@/lib/types/restaurant';

type RestaurantProviderProps = {
    children: ReactNode;
    initialRestaurants: Restaurant[];
};

export function RestaurantProvider({
    children,
    initialRestaurants,
}: RestaurantProviderProps) {
    const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);

    const value = useMemo<RestaurantContextValue>(() => {
        return {
            restaurants: initialRestaurants,
            selectedRestaurantId,
            setSelectedRestaurantId,
        };
    }, [selectedRestaurantId, initialRestaurants]);

    return (
        <RestaurantContext.Provider value={value}>
            {children}
        </RestaurantContext.Provider>
    );
}
