'use client'

import Link from "next/link";
import { IconMail } from "@tabler/icons-react";
import { Button } from "@/lib/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/lib/components/ui/empty";
import { Heading } from "@/lib/components/ui/heading";
import { Text } from "@/lib/components/ui/text";
import { useLocale } from "@/lib/hooks/use-locale";

export default function NoInvitation() {
    const { messages } = useLocale();
    const translates = messages.console.invitations;
    const viewRestaurantsLabel = messages.console.restaurant.notFound.actions.viewRestaurants;

    return (
        <Empty className="rounded-2xl border border-border bg-muted/20">
            <EmptyHeader>
                <EmptyMedia variant="icon" className="size-12 rounded-xl border bg-muted">
                    <IconMail className="size-5" />
                </EmptyMedia>
                <EmptyTitle>
                    <Heading size="5" weight="bold">
                        {translates.empty.title}
                    </Heading>
                </EmptyTitle>
                <EmptyDescription>
                    <Text size="2" >
                        {translates.empty.description}
                    </Text>
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button asChild>
                    <Link href="/console/restaurants">
                        <Text size="2">
                            {viewRestaurantsLabel}
                        </Text>
                    </Link>
                </Button>
            </EmptyContent>
        </Empty>
    );
}
