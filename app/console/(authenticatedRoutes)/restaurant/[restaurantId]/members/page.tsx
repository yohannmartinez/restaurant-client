import { getCurrentUser } from "@/lib/api/auth/get-current-user";
import { Heading } from "@/lib/components/ui/heading";
import { Text } from "@/lib/components/ui/text";
import { serverApiFetch } from "@/lib/api/fetch/server-api-fetch";
import { getCurrentLocale } from "@/lib/i18n/get-locale";
import { getMessages } from "@/lib/i18n/messages";
import { MembershipStatus, RestaurantMemberProfile, RestaurantRole } from "@/lib/types/restaurant-membership";
import { getUserRestaurant } from "../(page)/get-user-restaurant";
import { GetRestaurantMembersResult } from "@/lib/types/restaurant";
import MemberAdd from "./components/member-add";
import MemberSearchBar from "./components/list/components/member-search-bar";
import MemberList from "./components/list/list";

type MembersPageProps = {
    params: Promise<{
        restaurantId: string;
    }>;
    searchParams: Promise<{
        search?: string | string[];
    }>;
};

function sortMembers(members: RestaurantMemberProfile[]) {
    return [...members].sort((a, b) => {
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
}

function filterMembers(members: RestaurantMemberProfile[], search: string) {
    if (!search) {
        return members;
    }

    return members.filter((member) => {
        const fullName = `${member.firstName ?? ""} ${member.lastName ?? ""}`.trim().toLowerCase();
        const email = member.email.toLowerCase();

        return fullName.includes(search) || email.includes(search);
    });
}

export default async function RestaurantMembersPage({ params, searchParams }: MembersPageProps) {
    const currentUser = await getCurrentUser();
    const locale = await getCurrentLocale();
    const messages = getMessages(locale);
    const translates = messages.console.restaurant.members;
    const { restaurantId } = await params;
    const resolvedSearchParams = await searchParams;
    const restaurant = await getUserRestaurant(restaurantId);
    const members = await serverApiFetch<GetRestaurantMembersResult>(
        `/restaurant/${restaurantId}/members`,
    );
    const rawSearch = resolvedSearchParams.search;
    const search = (Array.isArray(rawSearch) ? rawSearch[0] : rawSearch ?? "").trim().toLowerCase();
    const isCurrentUserOwner = restaurant.memberships.some((membership) => (
        membership.userId === currentUser.id &&
        membership.role === RestaurantRole.OWNER &&
        membership.status === MembershipStatus.ACTIVE
    ));

    const sortedMembers = sortMembers(members);
    const filteredMembers = filterMembers(sortedMembers, search);

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

            <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center gap-3">
                    <div className="min-w-0 flex-1">
                        <MemberSearchBar initialValue={Array.isArray(rawSearch) ? rawSearch[0] : rawSearch ?? ""} />
                    </div>
                    {isCurrentUserOwner ? <MemberAdd restaurantId={restaurantId} /> : null}
                </div>

                <MemberList
                    restaurantId={restaurantId}
                    members={filteredMembers}
                    isCurrentUserOwner={isCurrentUserOwner}
                    roleLabels={roleLabels}
                    statusLabels={statusLabels}
                    setOwnerLabel={translates.actions.setOwner}
                    setEditorLabel={translates.actions.setEditor}
                    removeLabel={translates.actions.remove}
                    restoreLabel={translates.actions.restore}
                    openMenuLabel={translates.actions.openMenu}
                    currentUser={currentUser}
                    emptySearchLabel={translates.list.emptySearch}
                />
            </div>
        </div>
    );
}
