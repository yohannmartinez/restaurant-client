import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    IconArrowLeft,
    IconChartBar,
    IconChefHat,
    IconPalette,
    IconRocket,
    IconSettings,
    IconToolsKitchen2,
    IconUsersGroup,
} from "@tabler/icons-react"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/lib/components/ui/sidebar"
import { useRestaurant } from "@/app/console/hooks/use-restaurant"
import { getRestaurantIdFromPathname } from "@/app/console/helpers/get-restaurant-id-from-pathname"
import type { Icon } from "@tabler/icons-react"

type RestaurantNavigationItem = {
    title: string
    url: string
    icon: Icon
}

type RestaurantNavigationGroup = {
    label: string
    items: RestaurantNavigationItem[]
}

export default function WithRestaurantNavigation() {
    const pathname = usePathname()
    const { restaurants, selectedRestaurantId } = useRestaurant()
    const restaurantIdFromPath = getRestaurantIdFromPathname(pathname)
    const selectedRestaurant =
        restaurants.find((restaurant) => restaurant.id === selectedRestaurantId) ?? null

    if (!restaurantIdFromPath || !selectedRestaurant) {
        return null
    }

    const restaurantNavigationGroups: RestaurantNavigationGroup[] = [
        {
            label: "Contenu",
            items: [
                {
                    title: "Menus",
                    url: `/console/restaurant/${restaurantIdFromPath}/menus`,
                    icon: IconChefHat,
                },
                {
                    title: "Plats",
                    url: `/console/restaurant/${restaurantIdFromPath}/dishes`,
                    icon: IconToolsKitchen2,
                },
            ],
        },
        {
            label: "Gestion",
            items: [
                {
                    title: "Thème",
                    url: `/console/restaurant/${restaurantIdFromPath}/design`,
                    icon: IconPalette,
                },
                {
                    title: "Mise en ligne",
                    url: `/console/restaurant/${restaurantIdFromPath}/publication`,
                    icon: IconRocket,
                },
                {
                    title: "Equipe",
                    url: `/console/restaurant/${restaurantIdFromPath}/team`,
                    icon: IconUsersGroup,
                },
                {
                    title: "Analytics",
                    url: `/console/restaurant/${restaurantIdFromPath}/analytics`,
                    icon: IconChartBar,
                },
                {
                    title: "Parametres",
                    url: `/console/restaurant/${restaurantIdFromPath}/settings`,
                    icon: IconSettings,
                },
            ],
        },
    ]

    return (
        <>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                tooltip="Tous les restaurants"
                                className="bg-sidebar-primary font-medium text-sidebar-primary-foreground shadow-sm hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground flex justify-center"
                            >
                                <Link href="/console/dashboard">
                                    <IconArrowLeft />
                                    <span>Tous les restaurants</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

            {restaurantNavigationGroups.map((group) => (
                <SidebarGroup key={group.label}>
                    <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {group.items.map((item) => (
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
            ))}
        </>
    )
}
