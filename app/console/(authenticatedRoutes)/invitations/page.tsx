import { getCurrentUser } from "@/lib/api/auth/get-current-user";
import { serverApiFetch } from "@/lib/api/fetch/server-api-fetch";
import { MembershipStatus } from "@/lib/types/restaurant-membership";
import type { RestaurantWithMemberships } from "@/lib/types/restaurant";
import InvitationsHeader from "./components/header";
import InvitationsList from "./components/list/list";
import NoInvitation from "./components/noInvitation";

export default async function InvitationsPage() {
    const user = await getCurrentUser();
    const restaurants = await serverApiFetch<RestaurantWithMemberships[]>("/restaurant/me");
    const invitedRestaurants = restaurants.filter((restaurant) => {
        return restaurant.memberships.some((membership) => (
            membership.userId === user.id &&
            membership.status === MembershipStatus.INVITED
        ));
    });

    if (invitedRestaurants.length === 0) {
        return <NoInvitation />
    }

    return (
        <div className="flex flex-1 flex-col gap-6">
            <InvitationsHeader />
            <InvitationsList restaurants={invitedRestaurants} />
        </div>
    );
}
