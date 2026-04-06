"use client"

import { useEffect, useMemo } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    IconArrowsUpDown,
    IconBuildingStore,
    IconChartBar,
    IconCheck,
    IconChefHat,
    IconHelp,
    IconHome,
    IconReceipt,
    IconSettings,
    IconUsersGroup,
} from "@tabler/icons-react"

import { CreateRestaurantModalSection } from "@/app/console/(authenticatedRoutes)/dashboard/create-restaurant-modal-section"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/lib/components/ui/sidebar"
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/lib/components/ui/popover"
import { useAuth } from "@/lib/hooks/use-auth"
import { useLocale } from "@/lib/hooks/use-locale"
import { cn } from "@/lib/tailwind/utils"
import { useRestaurant } from "../../hooks/use-restaurant"

const consoleItems = [
    { title: "Dashboard", url: "/console/dashboard", icon: IconHome },
    { title: "Analytics", url: "#", icon: IconChartBar },
    { title: "Restaurants", url: "#", icon: IconBuildingStore },
]

const supportItems = [
    { title: "Parametres", url: "#", icon: IconSettings },
    { title: "Aide", url: "#", icon: IconHelp },
]

function getRestaurantIdFromPathname(pathname: string) {
    const match = pathname.match(/^\/console\/restaurant\/([^/]+)(?:\/|$)/)
    return match?.[1] ?? null
}

export function ConsoleSidebar() {
    const pathname = usePathname()
    const { user } = useAuth()
    const { messages } = useLocale()
    const router = useRouter()
    const { currentRestaurant, currentRestaurantId, hasRestaurants, restaurants, setCurrentRestaurantId } =
        useRestaurant()
    const restaurantIdFromPath = getRestaurantIdFromPathname(pathname)
    const isRestaurantRoute = restaurantIdFromPath !== null

    useEffect(() => {
        if (restaurantIdFromPath && restaurantIdFromPath !== currentRestaurantId) {
            setCurrentRestaurantId(restaurantIdFromPath)
        }
    }, [currentRestaurantId, restaurantIdFromPath, setCurrentRestaurantId])

    const restaurantRouteItems = useMemo(() => {
        if (!restaurantIdFromPath) {
            return []
        }

        return [
            {
                title: "Commandes",
                url: `/console/restaurant/${restaurantIdFromPath}/orders`,
                icon: IconReceipt,
            },
            {
                title: "Equipe",
                url: `/console/restaurant/${restaurantIdFromPath}/team`,
                icon: IconUsersGroup,
            },
            {
                title: "Cuisine",
                url: `/console/restaurant/${restaurantIdFromPath}/kitchen`,
                icon: IconChefHat,
            },
        ]
    }, [restaurantIdFromPath])

    const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : "Mon compte"
    const initials = user
        ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
        : "MC"
    const sidebarMessages = messages.console.sidebar

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        {hasRestaurants ? (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="cursor-pointer data-[state=open]:bg-sidebar-accent border bg-background data-[state=open]:text-sidebar-accent-foreground rounded-md"
                                    >
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-sm bg-sidebar-primary text-sidebar-primary-foreground">
                                            <IconBuildingStore className="size-4" />
                                        </div>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">
                                                {currentRestaurant?.name ?? "Restaurant"}
                                            </span>
                                            <span className="truncate text-xs text-muted-foreground">
                                                {currentRestaurant?.slug || "Selectionner"}
                                            </span>
                                        </div>
                                        <IconArrowsUpDown className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                </PopoverTrigger>
                                <PopoverContent align="start" className="w-80 p-2">
                                    <PopoverHeader className="px-2 pt-2 pb-1">
                                        <PopoverTitle>{sidebarMessages.restaurantsTitle}</PopoverTitle>
                                        <PopoverDescription>
                                            {sidebarMessages.restaurantsDescription}
                                        </PopoverDescription>
                                    </PopoverHeader>
                                    <div className="flex flex-col gap-1">
                                        {restaurants.map((restaurant) => {
                                            const isActive = restaurant.id === currentRestaurant?.id

                                            return (
                                                <button
                                                    key={restaurant.id}
                                                    type="button"
                                                    onClick={() => router.push(`/console/restaurant/${restaurant.id}`)}
                                                    className={cn(
                                                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-muted",
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
                                label={sidebarMessages.addRestaurant}
                            />
                        )}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Console</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {consoleItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        isActive={pathname === item.url && item.url !== "#"}
                                    >
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {isRestaurantRoute && currentRestaurant ? (
                    <SidebarGroup>
                        <SidebarGroupLabel>Restaurant actif</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {restaurantRouteItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            tooltip={item.title}
                                            isActive={pathname.startsWith(item.url)}
                                        >
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ) : null}

                <SidebarGroup>
                    <SidebarGroupLabel>Support</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {supportItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        isActive={pathname === item.url && item.url !== "#"}
                                    >
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" tooltip="Mon compte">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <span className="text-sm font-semibold">{initials}</span>
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{fullName}</span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {user?.email}
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}
