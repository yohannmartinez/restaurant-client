"use client"

import { useRouter } from "next/navigation"
import {
    IconArrowsUpDown,
    IconBuildingStore,
    IconCheck,
} from "@tabler/icons-react"

import { CreateRestaurantModalSection } from "@/app/console/(authenticatedRoutes)/dashboard/create-restaurant-modal-section"
import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/lib/components/ui/sidebar"
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/lib/components/ui/popover"
import { useLocale } from "@/lib/hooks/use-locale"
import { cn } from "@/lib/tailwind/utils"
import { useRestaurant } from "@/app/console/hooks/use-restaurant"
import { useSelectedRestaurant } from "@/app/console/hooks/use-selected-restaurant"
import { Heading } from "@/lib/components/ui/heading"
import { Text } from "@/lib/components/ui/text"

export default function ConsoleSidebarHeader() {
    const router = useRouter()
    const { messages } = useLocale()
    const { restaurants } = useRestaurant()
    const { selectedRestaurant } = useSelectedRestaurant()
    const translates = messages.console.sidebar.header
    const hasRestaurants = restaurants.length > 0

    return (
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    {hasRestaurants ? (
                        <Popover>
                            <PopoverTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="cursor-pointer rounded-md border bg-background data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center"
                                >
                                    <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-sm bg-sidebar-primary text-sidebar-primary-foreground">
                                        <IconBuildingStore className="size-4" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                        <span className="truncate font-medium">
                                            {selectedRestaurant?.name ?? "Restaurant"}
                                        </span>
                                        <span className="truncate text-xs text-muted-foreground">
                                            {selectedRestaurant?.slug || "Selectionner"}
                                        </span>
                                    </div>
                                    <IconArrowsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                                </SidebarMenuButton>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="w-80 p-2">
                                <PopoverHeader className="px-2 pt-2 pb-1 gap-0">
                                    <PopoverTitle>
                                        <Heading size="3" weight="medium">
                                            {translates.title}
                                        </Heading>
                                    </PopoverTitle>
                                    <PopoverDescription>
                                        <Text size="2">
                                            {translates.description}
                                        </Text>
                                    </PopoverDescription>
                                </PopoverHeader>
                                <div className="flex flex-col gap-1">
                                    {restaurants.map((restaurant) => {
                                        const isActive = restaurant.id === selectedRestaurant?.id

                                        return (
                                            <button
                                                key={restaurant.id}
                                                type="button"
                                                onClick={() => router.push(`/console/restaurant/${restaurant.id}`)}
                                                className={cn(
                                                    "cursor-pointer flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-muted",
                                                    isActive && "bg-muted"
                                                )}
                                            >
                                                <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
                                                    <IconBuildingStore className="size-4" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium">
                                                        {restaurant.name}
                                                    </p>
                                                    <p className="truncate text-xs text-muted-foreground">
                                                        {restaurant.slug}
                                                    </p>
                                                </div>
                                                {isActive ? <IconCheck className="size-4" /> : null}
                                            </button>
                                        )
                                    })}
                                </div>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <CreateRestaurantModalSection
                            className="h-12 w-full justify-start rounded-lg px-3"
                            label={translates.actions.addRestaurant}
                        />
                    )}
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )
}
