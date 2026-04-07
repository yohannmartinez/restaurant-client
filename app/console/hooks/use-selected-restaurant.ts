'use client';

import { usePathname } from 'next/navigation';
import { getRestaurantIdFromPathname } from '@/app/console/helpers/get-restaurant-id-from-pathname';
import { useRestaurant } from '@/app/console/hooks/use-restaurant';

export function useSelectedRestaurant() {
    const pathname = usePathname();
    const { restaurants } = useRestaurant();
    const restaurantIdFromPath = getRestaurantIdFromPathname(pathname);
    const selectedRestaurant =
        restaurants.find((restaurant) => restaurant.id === restaurantIdFromPath) ?? null;

    return {
        restaurantIdFromPath,
        selectedRestaurant,
    };
}
