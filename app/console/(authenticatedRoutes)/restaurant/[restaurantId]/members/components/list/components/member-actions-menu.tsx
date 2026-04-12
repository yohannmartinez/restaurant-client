'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconCrown, IconDots, IconUserMinus, IconUserPlus } from "@tabler/icons-react";
import { Button } from "@/lib/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/components/ui/popover";
import { Text } from "@/lib/components/ui/text";
import { clientApiFetch } from "@/lib/api/fetch/client-api-fetch";
import { useLocale } from "@/lib/hooks/use-locale";
import { MembershipStatus, RestaurantRole } from "@/lib/types/restaurant-membership";
import { toast } from "sonner";

type MemberActionsMenuProps = {
    restaurantId: string;
    userId: string;
    currentRole: RestaurantRole;
    currentStatus: MembershipStatus;
    setOwnerLabel: string;
    setEditorLabel: string;
    removeLabel: string;
    restoreLabel: string;
    openMenuLabel: string;
};

export default function MemberActionsMenu({
    restaurantId,
    userId,
    currentRole,
    currentStatus,
    setOwnerLabel,
    setEditorLabel,
    removeLabel,
    restoreLabel,
    openMenuLabel,
}: MemberActionsMenuProps) {
    const router = useRouter();
    const { messages } = useLocale();
    const translates = messages.console.restaurant.members;
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdatingRole, setIsUpdatingRole] = useState(false);
    const [isRevokingMember, setIsRevokingMember] = useState(false);
    const isRevokedMember = currentStatus === MembershipStatus.REVOKED;

    const nextRole = currentRole === RestaurantRole.OWNER
        ? RestaurantRole.EDITOR
        : RestaurantRole.OWNER;
    const roleActionLabel = currentRole === RestaurantRole.OWNER
        ? setEditorLabel
        : setOwnerLabel;

    async function handleUpdateRole() {
        setIsUpdatingRole(true);

        try {
            await clientApiFetch("/restaurant-membership/update-role", {
                method: "POST",
                body: {
                    restaurantId,
                    userId,
                    role: nextRole,
                },
            });

            toast.success(translates.feedback.updateRoleSuccess);
            setIsOpen(false);
            router.refresh();
        } catch {
            toast.error(translates.feedback.updateRoleError);
        } finally {
            setIsUpdatingRole(false);
        }
    }

    async function handleRevokeMember() {
        setIsRevokingMember(true);

        try {
            await clientApiFetch("/restaurant-membership/revoke-member", {
                method: "POST",
                body: {
                    restaurantId,
                    userId,
                },
            });

            toast.success(translates.feedback.revokeMemberSuccess);
            setIsOpen(false);
            router.refresh();
        } catch {
            toast.error(translates.feedback.revokeMemberError);
        } finally {
            setIsRevokingMember(false);
        }
    }

    async function handleRestoreMember() {
        setIsRevokingMember(true);

        try {
            await clientApiFetch("/restaurant-membership/restore-member", {
                method: "POST",
                body: {
                    restaurantId,
                    userId,
                },
            });

            toast.success(translates.feedback.restoreMemberSuccess);
            setIsOpen(false);
            router.refresh();
        } catch {
            toast.error(translates.feedback.restoreMemberError);
        } finally {
            setIsRevokingMember(false);
        }
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={openMenuLabel}
                >
                    <IconDots className="size-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="p-2">
                <div className="flex flex-col gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        className="w-full justify-start"
                        isLoading={isUpdatingRole}
                        onClick={handleUpdateRole}
                    >
                        <IconCrown className="size-4" />
                        <Text size="2">{roleActionLabel}</Text>
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        className={isRevokedMember
                            ? "w-full justify-start"
                            : "w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"}
                        isLoading={isRevokingMember}
                        onClick={isRevokedMember ? handleRestoreMember : handleRevokeMember}
                    >
                        {isRevokedMember ? (
                            <IconUserPlus className="size-4" />
                        ) : (
                            <IconUserMinus className="size-4" />
                        )}
                        <Text size="2">{isRevokedMember ? restoreLabel : removeLabel}</Text>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
