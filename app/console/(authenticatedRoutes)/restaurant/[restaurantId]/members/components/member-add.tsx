'use client'

import { useState } from "react";
import { IconUserPlus } from "@tabler/icons-react";
import { Button } from "@/lib/components/ui/button";
import { Text } from "@/lib/components/ui/text";
import { InviteMemberModal } from "@/lib/features/modals/invite-member.modal";
import { useLocale } from "@/lib/hooks/use-locale";

type MemberAddProps = {
    restaurantId: string;
};

export default function MemberAdd({ restaurantId }: MemberAddProps) {
    const { messages } = useLocale();
    const inviteMemberTranslations = messages.features.modals.inviteMember;
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    return (
        <>
            <Button type="button" className="border border-primary" onClick={() => setIsInviteModalOpen(true)}>
                <IconUserPlus className="size-4" />
                <Text size="2" className="hidden sm:block">
                    {inviteMemberTranslations.trigger}
                </Text>
            </Button>

            <InviteMemberModal
                open={isInviteModalOpen}
                onOpenChange={setIsInviteModalOpen}
                restaurantId={restaurantId}
                showRoleSelection={false}
            />
        </>
    );
}
