'use client';

import { createContext } from 'react';
import type { getUserRestaurantResult } from '@/lib/types/restaurant';

export type RestaurantContextValue = {
    restaurants: getUserRestaurantResult[];
};

export const RestaurantContext = createContext<RestaurantContextValue | null>(null);
