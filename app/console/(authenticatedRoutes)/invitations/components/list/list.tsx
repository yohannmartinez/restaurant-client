'use client'

import { IconMail } from "@tabler/icons-react";
import { Heading } from "@/lib/components/ui/heading";
import { Text } from "@/lib/components/ui/text";
import { useLocale } from "@/lib/hooks/use-locale";
import type { RestaurantWithMemberships } from "@/lib/types/restaurant";
import AcceptInvitationButton from "./components/accept-invitation-button";
import DeclineInvitationButton from "./components/decline-invitation-button";

export default function InvitationsList({ restaurants }: { restaurants: RestaurantWithMemberships[] }) {
    const { messages } = useLocale();
    const translates = messages.console.invitations;

    return (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {restaurants.map((restaurant) => (
                <article
                    key={restaurant.id}
                    className="flex min-h-[200px] flex-col gap-3 rounded-2xl border bg-muted/20 p-5"
                >
                    <Heading size="4" weight="bold">
                        {restaurant.name}
                    </Heading>

                    <div className="flex flex-wrap gap-2">
                        <div className="flex w-fit items-center gap-2 rounded-md border border-blue-200 bg-blue-500/10 px-3 py-1 dark:border-blue-500/30 dark:bg-blue-500/15">
                            <IconMail className="size-3.5 text-blue-600 dark:text-blue-400" />
                            <Text size="1" className="text-blue-700 dark:text-blue-300">
                                {translates.badges.invited}
                            </Text>
                        </div>
                        <div className="flex w-fit items-center gap-2 rounded-md border px-3 py-1">
                            <div className="size-2 rounded-full bg-foreground/60" />
                            <Text size="1" className="text-muted-foreground">
                                {restaurant.memberships.length} {translates.members(restaurant.memberships.length)}
                            </Text>
                        </div>
                    </div>

                    <Text as="p" size="2" className="mt-auto text-muted-foreground">
                        {translates.cardDescription}
                    </Text>

                    <div className="mt-auto flex w-full gap-2 flex-wrap">
                        <DeclineInvitationButton restaurantId={restaurant.id} />
                        <AcceptInvitationButton restaurantId={restaurant.id} />
                    </div>
                </article>
            ))}
        </div>
    );
}
