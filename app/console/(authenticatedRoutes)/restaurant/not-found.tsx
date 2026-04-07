"use client";

import Link from "next/link";
import { IconBuildingStore } from "@tabler/icons-react";
import { Button } from "@/lib/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/lib/components/ui/empty";
import { useLocale } from "@/lib/hooks/use-locale";
import { Heading } from "@/lib/components/ui/heading";
import { Text } from "@/lib/components/ui/text";

export default function RestaurantNotFound() {
    const { messages } = useLocale();
    const translates = messages.console.restaurant.notFound;

    return (
        <Empty className="rounded-2xl border border-dashed border-border bg-card shadow-sm">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconBuildingStore />
                </EmptyMedia>
                <EmptyTitle>
                    <Heading size="5">
                        {translates.title}
                    </Heading>
                </EmptyTitle>
                <EmptyDescription>
                    <Text size="2">{translates.description}</Text>
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button asChild>
                    <Link href="/console/dashboard">
                        <Text size="2">
                            {translates.actions.viewRestaurants}
                        </Text>
                    </Link>
                </Button>
            </EmptyContent>
        </Empty>
    );
}
