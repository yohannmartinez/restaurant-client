import { getCurrentUser } from "@/lib/api/auth/get-current-user";
import { serverApiFetch } from "@/lib/api/fetch/server-api-fetch";
import { MembershipStatus } from "@/lib/types/restaurant-membership";
import type { RestaurantWithMemberships } from "@/lib/types/restaurant";
import RestaurantsHeader from "./components/header";
import RestaurantsList from "./components/list";
import NoRestaurant from "./components/noRestaurant";

export default async function RestaurantsPage() {
    const user = await getCurrentUser();
    const restaurants = await serverApiFetch<RestaurantWithMemberships[]>(
        `/restaurant/me`
    );

    const userActiveRestaurants = restaurants.filter((restaurant) => {
        return (
            restaurant.memberships.some((membership) => (
                membership.userId === user.id &&
                membership.status === MembershipStatus.ACTIVE
            ))
        );
    });

    if (userActiveRestaurants.length === 0) {
        return <NoRestaurant />
    }
    return (
        <div className="flex flex-1 flex-col gap-6">
            <RestaurantsHeader />
            <RestaurantsList restaurants={userActiveRestaurants} />
        </div>
    );
}
