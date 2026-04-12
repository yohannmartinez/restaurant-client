'use client'

import Link from "next/link";
import { useState } from "react";
import { IconCircleCheck, IconClock, IconHistory, IconLink, IconPlus, IconUserOff, IconUsers } from "@tabler/icons-react";
import { Button } from "@/lib/components/ui/button";
import { Heading } from "@/lib/components/ui/heading";
import { Text } from "@/lib/components/ui/text";
import { useLocale } from "@/lib/hooks/use-locale";
import { cn } from "@/lib/tailwind/utils";
import { CreateRestaurantModal } from "@/lib/features/modals/create-restaurant.modal";
import { RestaurantStatus, type getUserRestaurantResult } from "@/lib/types/restaurant";
import { Separator } from "@/lib/components/ui/separator";

const statusStyles: Record<RestaurantStatus, { container: string; text: string; icon: typeof IconCircleCheck }> = {
    [RestaurantStatus.ACTIVE]: {
        container: "border-green-200 bg-green-500/10 dark:border-green-500/30 dark:bg-green-500/15",
        text: "text-green-700 dark:text-green-400",
        icon: IconCircleCheck,
    },
    [RestaurantStatus.DRAFT]: {
        container: "border-amber-200 bg-amber-500/10 dark:border-amber-500/30 dark:bg-amber-500/15",
        text: "text-amber-700 dark:text-amber-400",
        icon: IconClock,
    },
    [RestaurantStatus.SUSPENDED]: {
        container: "border-rose-200 bg-rose-500/10 dark:border-rose-500/30 dark:bg-rose-500/15",
        text: "text-rose-700 dark:text-rose-400",
        icon: IconUserOff,
    },
    [RestaurantStatus.ARCHIVED]: {
        container: "border-slate-200 bg-slate-500/10 dark:border-slate-500/30 dark:bg-slate-500/15",
        text: "text-slate-700 dark:text-slate-300",
        icon: IconHistory,
    },
};

export default function RestaurantsList({ restaurants }: { restaurants: getUserRestaurantResult[] }) {
    const [open, setOpen] = useState(false);
    const { locale, messages } = useLocale();
    const translates = messages.console.restaurants;
    const formatDate = new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
    });
    return (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {restaurants.map((restaurant) => {
                const statusStyle = statusStyles[restaurant.status];
                const StatusIcon = statusStyle.icon;

                return (
                    <article
                        key={restaurant.id}
                        className="relative flex min-h-[200px] flex-col gap-5 rounded-2xl border bg-muted/20 p-5 transition-colors hover:bg-muted/30"
                    >
                        <Link
                            href={`/console/restaurant/${restaurant.id}`}
                            aria-label={`${translates.actions.view} ${restaurant.name}`}
                            className="absolute inset-0 rounded-2xl"
                        >
                            <span className="sr-only">{translates.actions.view}</span>
                        </Link>

                        <div className="pointer-events-none relative z-10 flex flex-col">
                            <Heading size="4" weight="bold">
                                {restaurant.name}
                            </Heading>
                            <div className="flex gap-2">
                                <div className="flex text-muted-foreground items-center gap-1">
                                    <IconLink className="size-4" />
                                    <Text size="2">
                                        {restaurant.slug}
                                    </Text>
                                </div>

                                <Separator orientation="vertical" />
                                <div className="flex text-muted-foreground items-center gap-1">
                                    <IconHistory className="size-4" />
                                    <Text size="2">
                                        {formatDate.format(new Date(restaurant.updatedAt))}
                                    </Text>
                                </div>
                            </div>
                        </div>

                        <div className="pointer-events-none relative z-10 flex gap-2 flex-wrap">
                            <div
                                className={cn(
                                    "flex w-fit items-center gap-2 rounded-md border px-3 py-1",
                                    statusStyle.container
                                )}
                            >
                                <StatusIcon className={cn("size-3.5 shrink-0", statusStyle.text)} />
                                <Text size="1" className={statusStyle.text}>
                                    {translates.statuses[restaurant.status]}
                                </Text>
                            </div>
                            <div className="flex w-fit items-center gap-2 rounded-md border px-3 py-1 border-blue-200 bg-blue-500/10 dark:border-blue-500/30 dark:bg-blue-500/15"
                            >
                                <IconUsers className="size-3.5 shrink-0 text-blue-700 dark:text-blue-300" />
                                <Text size="1" className="text-blue-700 dark:text-blue-300">
                                    {restaurant.memberships.length} {translates.members(restaurant.memberships.length)}
                                </Text>
                            </div>
                        </div>

                        <div className="relative z-10 mt-auto flex w-full gap-2 flex-wrap">
                            <Button className="flex-1" asChild variant="outline">
                                <Link href={`/console/restaurant/${restaurant.id}/settings`}>
                                    <Text size="2">
                                        {translates.actions.edit}
                                    </Text>
                                </Link>
                            </Button>
                            <Button className="flex-1" asChild>
                                <Link href={`/console/restaurant/${restaurant.id}`}>
                                    <Text size="2">
                                        {translates.actions.view}
                                    </Text>
                                </Link>
                            </Button>
                        </div>
                    </article>
                );
            })}

            <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex min-h-[200px] hover:bg-muted/70 cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-dashed bg-muted/10 p-5 text-center transition hover:bg-muted/20"
            >
                <div className="flex size-12 items-center justify-center rounded-xl border bg-muted">
                    <IconPlus className="size-5" />
                </div>
                <div className="flex flex-col gap-1">
                    <Heading size="4" weight="bold">
                        {translates.actions.add}
                    </Heading>
                    <Text as="p" size="2" className="text-muted-foreground max-w-[300px]">
                        {translates.actions.addDescription}
                    </Text>
                </div>
            </button>

            <CreateRestaurantModal open={open} onOpenChange={setOpen} />
        </div >
    );
}
