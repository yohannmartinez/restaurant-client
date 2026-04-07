'use client';

import { createContext } from 'react';
import type { Restaurant } from '@/lib/types/restaurant';

export type RestaurantContextValue = {
    restaurants: Restaurant[];
};

export const RestaurantContext = createContext<RestaurantContextValue | null>(null);
