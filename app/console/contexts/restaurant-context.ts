'use client';

import { createContext } from 'react';
import type { RestaurantWithMemberships } from '@/lib/types/restaurant';

export type RestaurantContextValue = {
    restaurants: RestaurantWithMemberships[];
};

export const RestaurantContext = createContext<RestaurantContextValue | null>(null);
