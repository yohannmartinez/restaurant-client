'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/lib/components/ui/button";
import { Text } from "@/lib/components/ui/text";
import { clientApiFetch, ClientApiError } from "@/lib/api/fetch/client-api-fetch";
import { useLocale } from "@/lib/hooks/use-locale";
import { toast } from "sonner";

type AcceptInvitationButtonProps = {
    restaurantId: string;
};

export default function AcceptInvitationButton({
    restaurantId,
}: AcceptInvitationButtonProps) {
    const router = useRouter();
    const { messages } = useLocale();
    const translates = messages.console.invitations;
    const [isAccepting, setIsAccepting] = useState(false);

    async function handleAcceptInvitation() {
        setIsAccepting(true);

        try {
            await clientApiFetch("/restaurant-membership/accept-invitation", {
                method: "POST",
                body: {
                    restaurantId,
                },
            });

            toast.success(translates.feedback.acceptSuccess);
            router.refresh();
            router.push(`/console/restaurant/${restaurantId}`);
        } catch (error) {
            if (error instanceof ClientApiError && error.status === 404) {
                toast.error(translates.feedback.acceptNotFoundError);
            } else if (error instanceof ClientApiError && error.status === 409) {
                toast.error(translates.feedback.acceptAlreadyAcceptedError);
            } else {
                toast.error(translates.feedback.acceptError);
            }
        } finally {
            setIsAccepting(false);
        }
    }

    return (
        <Button
            type="button"
            className="flex-1"
            isLoading={isAccepting}
            disabled={isAccepting}
            onClick={handleAcceptInvitation}
        >
            <Text size="2">
                {isAccepting
                    ? translates.actions.accepting
                    : translates.actions.accept}
            </Text>
        </Button>
    );
}
