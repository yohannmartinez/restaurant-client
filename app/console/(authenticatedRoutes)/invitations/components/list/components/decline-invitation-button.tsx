'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/lib/components/ui/button";
import { Text } from "@/lib/components/ui/text";
import { clientApiFetch, ClientApiError } from "@/lib/api/fetch/client-api-fetch";
import { useLocale } from "@/lib/hooks/use-locale";
import { toast } from "sonner";

type DeclineInvitationButtonProps = {
    restaurantId: string;
};

export default function DeclineInvitationButton({
    restaurantId,
}: DeclineInvitationButtonProps) {
    const router = useRouter();
    const { messages } = useLocale();
    const translates = messages.console.invitations;
    const [isDeclining, setIsDeclining] = useState(false);

    async function handleDeclineInvitation() {
        setIsDeclining(true);

        try {
            await clientApiFetch("/restaurant-membership/decline-invitation", {
                method: "POST",
                body: {
                    restaurantId,
                },
            });

            toast.success(translates.feedback.declineSuccess);
            router.refresh();
        } catch (error) {
            if (error instanceof ClientApiError && error.status === 404) {
                toast.error(translates.feedback.declineNotFoundError);
            } else if (error instanceof ClientApiError && error.status === 409) {
                toast.error(translates.feedback.declineAlreadyProcessedError);
            } else {
                toast.error(translates.feedback.declineError);
            }
        } finally {
            setIsDeclining(false);
        }
    }

    return (
        <Button
            type="button"
            className="flex-1"
            variant="outline"
            isLoading={isDeclining}
            disabled={isDeclining}
            onClick={handleDeclineInvitation}
        >
            <Text size="2">
                {isDeclining
                    ? translates.actions.declining
                    : translates.actions.decline}
            </Text>
        </Button>
    );
}
