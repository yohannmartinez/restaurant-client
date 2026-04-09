import { serverApiFetch } from "@/lib/api/fetch/server-api-fetch";
import type { RestaurantWithMemberships } from "@/lib/types/restaurant";
import RestaurantsHeader from "./components/header";
import RestaurantsList from "./components/list";
import NoRestaurant from "./components/noRestaurant";

export default async function RestaurantsPage() {
    const restaurants = await serverApiFetch<RestaurantWithMemberships[]>(
        `/restaurant/me`
    );

    if (restaurants.length === 0) {
        return <NoRestaurant />
    }
    return (
        <div className="flex flex-1 flex-col gap-6">
            <RestaurantsHeader />
            <RestaurantsList restaurants={restaurants} />
        </div>
    );
}
