'use client'

import { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar";
import { Heading } from "@/lib/components/ui/heading";
import { Text } from "@/lib/components/ui/text";
import { MembershipStatus, RestaurantMemberProfile, RestaurantRole } from "@/lib/types/restaurant-membership";
import MemberActionsMenu from "./components/member-actions-menu";
import MemberCardBadges from "./components/member-card-badges";
import MemberSearchBar from "./components/member-search-bar";

type MemberCardsProps = {
    members: RestaurantMemberProfile[];
    isCurrentUserOwner: boolean;
    roleLabels: Record<RestaurantRole, string>;
    statusLabels: Record<MembershipStatus, string>;
    editRoleLabel: string;
    removeLabel: string;
    openMenuLabel: string;
};

export default function MemberCards({
    members,
    isCurrentUserOwner,
    roleLabels,
    statusLabels,
    editRoleLabel,
    removeLabel,
    openMenuLabel,
}: MemberCardsProps) {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const isSearching = search.trim().toLowerCase() !== debouncedSearch;

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            setDebouncedSearch(search.trim().toLowerCase());
        }, 500);

        return () => window.clearTimeout(timeout);
    }, [search]);

    const filteredMembers = useMemo(() => {
        if (!debouncedSearch) {
            return members;
        }

        return members.filter((member) => {
            const fullName = `${member.firstName ?? ""} ${member.lastName ?? ""}`.trim().toLowerCase();
            const email = member.email.toLowerCase();

            return fullName.includes(debouncedSearch) || email.includes(debouncedSearch);
        });
    }, [debouncedSearch, members]);

    return (
        <div className="flex flex-col gap-4">
            <MemberSearchBar isSearching={isSearching} value={search} onChange={setSearch} />

            {filteredMembers.length > 0 ? (
                <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    {filteredMembers.map((member) => {
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
                                    {isCurrentUserOwner ? (
                                        <div className="shrink-0">
                                            <MemberActionsMenu
                                                editRoleLabel={editRoleLabel}
                                                removeLabel={removeLabel}
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
                        Aucun utilisateur ne correspond à cette recherche.
                    </Text>
                </div>
            )}
        </div>
    );
}
