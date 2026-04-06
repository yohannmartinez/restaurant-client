'use client';

import { useContext } from 'react';
import { RestaurantContext, type RestaurantContextValue } from '@/app/console/contexts/restaurant-context';

export function useRestaurant(): RestaurantContextValue {
    const context = useContext(RestaurantContext);

    if (!context) {
        throw new Error('useRestaurant must be used within a RestaurantProvider');
    }

    return context;
}
