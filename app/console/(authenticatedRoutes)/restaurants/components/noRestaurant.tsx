'use client'

import { useState } from "react";
import { IconBuildingStore, IconPlus } from "@tabler/icons-react";
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
import { CreateRestaurantModal } from "@/lib/features/modals/create-restaurant.modal";

export default function NoRestaurant() {
    const [open, setOpen] = useState(false);
    const { messages } = useLocale();
    const translates = messages.console.restaurants;

    return (
        <>
            <Empty className="rounded-2xl border border-border bg-muted/20">
                <EmptyHeader>
                    <EmptyMedia variant="icon" className="size-12 rounded-xl border bg-muted">
                        <IconBuildingStore className="size-5" />
                    </EmptyMedia>
                    <EmptyTitle>
                        <Heading size="5" weight="bold">
                            {translates.empty.title}
                        </Heading>
                    </EmptyTitle>
                    <EmptyDescription>
                        <Text size="2">
                            {translates.empty.description}
                        </Text>
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button type="button" onClick={() => setOpen(true)}>
                        <IconPlus className="size-4" />
                        <Text size="2">{messages.features.modals.createRestaurant.trigger}</Text>
                    </Button>
                </EmptyContent>
            </Empty>

            <CreateRestaurantModal open={open} onOpenChange={setOpen} />
        </>
    );
}
