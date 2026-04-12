import { getCurrentUser } from "@/lib/api/auth/get-current-user";
import { Heading } from "@/lib/components/ui/heading";
import { Text } from "@/lib/components/ui/text";
import { serverApiFetch } from "@/lib/api/fetch/server-api-fetch";
import { getCurrentLocale } from "@/lib/i18n/get-locale";
import { getMessages } from "@/lib/i18n/messages";
import { MembershipStatus, RestaurantRole } from "@/lib/types/restaurant-membership";
import { getUserRestaurant } from "../(page)/get-user-restaurant";
import { GetRestaurantMembersResult } from "@/lib/types/restaurant";
import MemberCards from "./components/list/list";

type MembersPageProps = {
    params: Promise<{
        restaurantId: string;
    }>;
};

export default async function RestaurantMembersPage({ params }: MembersPageProps) {
    const currentUser = await getCurrentUser();
    const locale = await getCurrentLocale();
    const messages = getMessages(locale);
    const translates = messages.console.restaurant.members;
    const { restaurantId } = await params;
    const restaurant = await getUserRestaurant(restaurantId);
    const members = await serverApiFetch<GetRestaurantMembersResult>(
        `/restaurant/${restaurantId}/members`,
    );
    const isCurrentUserOwner = restaurant.memberships.some((membership) => (
        membership.userId === currentUser.id &&
        membership.role === RestaurantRole.OWNER &&
        membership.status === MembershipStatus.ACTIVE
    ));

    const sortedMembers = [...members].sort((a, b) => {
        const roleOrder = {
            [RestaurantRole.OWNER]: 0,
            [RestaurantRole.EDITOR]: 1,
        };
        const statusOrder = {
            [MembershipStatus.ACTIVE]: 0,
            [MembershipStatus.INVITED]: 1,
            [MembershipStatus.REVOKED]: 2,
        };

        const roleDifference = roleOrder[a.role] - roleOrder[b.role];

        if (roleDifference !== 0) {
            return roleDifference;
        }

        return statusOrder[a.status] - statusOrder[b.status];
    });

    const roleLabels = {
        [RestaurantRole.OWNER]: translates.roles.OWNER,
        [RestaurantRole.EDITOR]: translates.roles.EDITOR,
    };

    const statusLabels = {
        [MembershipStatus.ACTIVE]: translates.statuses.ACTIVE,
        [MembershipStatus.INVITED]: translates.statuses.INVITED,
        [MembershipStatus.REVOKED]: translates.statuses.REVOKED,
    };
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <Heading size="6" weight="bold">
                        {translates.title}
                    </Heading>
                    <div className="bg-muted rounded-sm px-3 py-0.5 text-sm font-medium">
                        <Text size="1" className="text-muted-foreground">
                            {members.length}
                        </Text>
                    </div>
                </div>
                <Text as="p" size="2" className="text-muted-foreground">
                    {translates.description(restaurant.name)}
                </Text>
            </section>

            <MemberCards
                members={sortedMembers}
                isCurrentUserOwner={isCurrentUserOwner}
                roleLabels={roleLabels}
                statusLabels={statusLabels}
                editRoleLabel={translates.actions.editRole}
                removeLabel={translates.actions.remove}
                openMenuLabel={translates.actions.openMenu}
            />
        </div>
    );
}
