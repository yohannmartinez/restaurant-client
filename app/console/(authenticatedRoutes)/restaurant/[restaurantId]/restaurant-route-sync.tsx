"use client";

import { useEffect } from "react";
import { useRestaurant } from "@/app/console/hooks/use-restaurant";

type RestaurantRouteSyncProps = {
    restaurantId: string;
};

export function RestaurantRouteSync({
    restaurantId,
}: RestaurantRouteSyncProps) {
    const { currentRestaurantId, setCurrentRestaurantId } = useRestaurant();

    useEffect(() => {
        if (currentRestaurantId !== restaurantId) {
            setCurrentRestaurantId(restaurantId);
        }
    }, [currentRestaurantId, restaurantId, setCurrentRestaurantId]);

    return null;
}
