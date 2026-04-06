import { cache } from "react";
import { notFound } from "next/navigation";
import { serverApiFetch } from "@/lib/api/fetch/server-api-fetch";
import type { Restaurant } from "@/lib/types/restaurant";

const getUserRestaurants = cache(async () => {
    return serverApiFetch<Restaurant[]>("/restaurant/me").catch(() => []);
});

export async function getUserRestaurant(restaurantId: string) {
    const restaurants = await getUserRestaurants();
    const restaurant =
        restaurants.find((candidate) => candidate.id === restaurantId) ?? null;

    if (!restaurant) {
        notFound();
    }

    return restaurant;
}
