'use client';

import { createContext } from 'react';
import type { Restaurant } from '@/lib/types/restaurant';

export type RestaurantContextValue = {
    currentRestaurantId: string | null;
    currentRestaurant: Restaurant | null;
    hasRestaurants: boolean;
    restaurants: Restaurant[];
    setCurrentRestaurantId: (restaurantId: string | null) => void;
};

export const RestaurantContext = createContext<RestaurantContextValue | null>(null);
