import { cache } from "react";
import { notFound } from "next/navigation";
import { serverApiFetch } from "@/lib/api/fetch/server-api-fetch";
import type { getUserRestaurantResult } from "@/lib/types/restaurant";

const getUserRestaurants = cache(async () => {
    return serverApiFetch<getUserRestaurantResult[]>("/restaurant/me").catch(() => []);
});

export async function getUserRestaurant(restaurantId: string) {
    const restaurants = await getUserRestaurants();
    const restaurant =
        restaurants.find((r) => r.id === restaurantId) ?? null;

    if (!restaurant) {
        notFound();
    }

    return restaurant;
}
