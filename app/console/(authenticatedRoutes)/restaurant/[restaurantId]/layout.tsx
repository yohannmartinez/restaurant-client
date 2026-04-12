import { getCurrentUser } from "@/lib/api/auth/get-current-user";
import { getCurrentLocale } from "@/lib/i18n/get-locale";
import { getMessages } from "@/lib/i18n/messages";
import { MembershipStatus } from "@/lib/types/restaurant-membership";
import { notFound } from "next/navigation";
import { getUserRestaurant } from "./(page)/get-user-restaurant";
import NotAuthorized from "./not-authorized";
import ShouldAcceptInvitation from "./should-accept-invitation";

type RestaurantLayoutProps = {
    children: React.ReactNode;
    params: Promise<{
        restaurantId: string;
    }>;
};

export default async function RestaurantAccessLayout({
    children,
    params,
}: RestaurantLayoutProps) {
    const currentUser = await getCurrentUser();
    const locale = await getCurrentLocale();
    const messages = getMessages(locale);
    const translates = messages.console.restaurant.access;
    const { restaurantId } = await params;
    const restaurant = await getUserRestaurant(restaurantId);

    const currentMembership = restaurant.memberships.find((membership) => (
        membership.userId === currentUser.id
    ));

    if (!currentMembership) {
        notFound();
    }

    if (currentMembership.status === MembershipStatus.ACTIVE) {
        return children;
    }

    if (currentMembership.status === MembershipStatus.REVOKED) {
        return (
            <NotAuthorized
                title={translates.revoked.title}
                description={translates.revoked.description}
            />
        );
    }

    if (currentMembership.status === MembershipStatus.INVITED) {
        return (
            <ShouldAcceptInvitation
                title={translates.invited.title}
                description={translates.invited.description}
                buttonLabel={translates.invited.actions.viewInvitations}
            />
        );
    }

    notFound();
}
