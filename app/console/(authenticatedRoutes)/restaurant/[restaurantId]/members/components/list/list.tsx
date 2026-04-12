'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar";
import { Heading } from "@/lib/components/ui/heading";
import { Text } from "@/lib/components/ui/text";
import { MembershipStatus, RestaurantMemberProfile, RestaurantRole } from "@/lib/types/restaurant-membership";
import MemberActionsMenu from "./components/member-actions-menu";
import MemberCardBadges from "./components/member-card-badges";
import { AuthenticatedUser } from "@/lib/types/auth";

type MemberListProps = {
    restaurantId: string;
    members: RestaurantMemberProfile[];
    isCurrentUserOwner: boolean;
    roleLabels: Record<RestaurantRole, string>;
    statusLabels: Record<MembershipStatus, string>;
    setOwnerLabel: string;
    setEditorLabel: string;
    removeLabel: string;
    restoreLabel: string;
    openMenuLabel: string;
    currentUser: AuthenticatedUser;
    emptySearchLabel: string;
};

export default function MemberList({
    restaurantId,
    members,
    isCurrentUserOwner,
    roleLabels,
    statusLabels,
    setOwnerLabel,
    setEditorLabel,
    removeLabel,
    restoreLabel,
    openMenuLabel,
    currentUser,
    emptySearchLabel,
}: MemberListProps) {
    return (
        members.length > 0 ? (
            <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {members.map((member) => {
                    const fullName = `${member.firstName ?? ""} ${member.lastName ?? ""}`.trim();
                    const displayName = fullName || member.email;
                    const initials = `${member.firstName?.charAt(0) ?? ""}${member.lastName?.charAt(0) ?? ""}`.trim().toUpperCase()
                        || member.email.charAt(0).toUpperCase();

                    return (
                        <article
                            key={member.userId}
                            className="flex flex-col gap-10 rounded-2xl border bg-muted/20 p-5"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex min-w-0 flex-1 items-start gap-3">
                                    <Avatar className="size-12 shrink-0 rounded-xl border">
                                        {member.picture ? <AvatarImage src={member.picture} alt={displayName} /> : null}
                                        <AvatarFallback className="rounded-xl text-sm font-semibold text-muted-foreground">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 w-0 flex-1">
                                        <Heading size="4" weight="bold" truncate className="block w-full">
                                            {displayName}
                                        </Heading>
                                        <Text as="p" size="2" className="block w-full truncate text-muted-foreground" truncate>
                                            {member.email}
                                        </Text>
                                    </div>
                                </div>
                                {isCurrentUserOwner && member.userId !== currentUser.id ? (
                                    <div className="shrink-0">
                                        <MemberActionsMenu
                                            restaurantId={restaurantId}
                                            userId={member.userId}
                                            currentRole={member.role}
                                            currentStatus={member.status}
                                            setOwnerLabel={setOwnerLabel}
                                            setEditorLabel={setEditorLabel}
                                            removeLabel={removeLabel}
                                            restoreLabel={restoreLabel}
                                            openMenuLabel={openMenuLabel}
                                        />
                                    </div>
                                ) : null}
                            </div>

                            <MemberCardBadges
                                status={member.status}
                                roleLabel={roleLabels[member.role]}
                                statusLabel={statusLabels[member.status]}
                            />
                        </article>
                    );
                })}
            </section>
        ) : (
            <div className="rounded-xl border border-dashed bg-muted/20 p-5">
                <Text as="p" size="2" className="text-muted-foreground">
                    {emptySearchLabel}
                </Text>
            </div>
        )
    );
}
