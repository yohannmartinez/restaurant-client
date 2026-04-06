'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { RestaurantContext, type RestaurantContextValue } from '@/app/console/contexts/restaurant-context';
import type { Restaurant } from '@/lib/types/restaurant';

type RestaurantProviderProps = {
    children: ReactNode;
    initialRestaurants: Restaurant[];
    initialRestaurantId?: string | null;
};

export function RestaurantProvider({
    children,
    initialRestaurants,
    initialRestaurantId,
}: RestaurantProviderProps) {
    const defaultRestaurantId = initialRestaurantId ?? null;
    const [currentRestaurantId, setCurrentRestaurantId] = useState<string | null>(
        defaultRestaurantId,
    );

    const value = useMemo<RestaurantContextValue>(() => {
        const currentRestaurant =
            initialRestaurants.find((restaurant) => restaurant.id === currentRestaurantId) ??
            null;

        return {
            currentRestaurantId,
            currentRestaurant,
            hasRestaurants: initialRestaurants.length > 0,
            restaurants: initialRestaurants,
            setCurrentRestaurantId,
        };
    }, [currentRestaurantId, initialRestaurants]);

    return (
        <RestaurantContext.Provider value={value}>
            {children}
        </RestaurantContext.Provider>
    );
}
