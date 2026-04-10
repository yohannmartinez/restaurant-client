'use client'

import { Heading } from "@/lib/components/ui/heading";
import { Text } from "@/lib/components/ui/text";
import { useLocale } from "@/lib/hooks/use-locale";

export default function InvitationsHeader() {
    const { messages } = useLocale();
    const translates = messages.console.invitations;

    return (
        <div className="flex flex-col">
            <Heading size="6" weight="bold">{translates.title}</Heading>
            <Text as="p" size="2" className="text-muted-foreground">
                {translates.description}
            </Text>
        </div>
    );
}
