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
import { useSelectedRestaurant } from "@/app/console/hooks/use-selected-restaurant"
import { useLocale } from "@/lib/hooks/use-locale"
import type { Icon } from "@tabler/icons-react"
import { Text } from "@/lib/components/ui/text"

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
    const { restaurantIdFromPath, selectedRestaurant } = useSelectedRestaurant()
    const { messages } = useLocale()
    const translates = messages.console.sidebar.withRestaurant

    if (!restaurantIdFromPath || !selectedRestaurant) {
        return null
    }

    const restaurantNavigationGroups: RestaurantNavigationGroup[] = [
        {
            label: translates.groups.content,
            items: [
                {
                    title: translates.items.dishes,
                    url: `/console/restaurant/${restaurantIdFromPath}/dishes`,
                    icon: IconToolsKitchen2,
                },
                {
                    title: translates.items.menus,
                    url: `/console/restaurant/${restaurantIdFromPath}/menus`,
                    icon: IconChefHat,
                },

            ],
        },
        {
            label: translates.groups.management,
            items: [
                {
                    title: translates.items.design,
                    url: `/console/restaurant/${restaurantIdFromPath}/design`,
                    icon: IconPalette,
                },
                {
                    title: translates.items.publication,
                    url: `/console/restaurant/${restaurantIdFromPath}/publication`,
                    icon: IconRocket,
                },
                {
                    title: translates.items.team,
                    url: `/console/restaurant/${restaurantIdFromPath}/team`,
                    icon: IconUsersGroup,
                },
                {
                    title: translates.items.analytics,
                    url: `/console/restaurant/${restaurantIdFromPath}/analytics`,
                    icon: IconChartBar,
                },
                {
                    title: translates.items.settings,
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
                                tooltip={translates.backToRestaurants}
                                className="bg-sidebar-primary font-medium text-sidebar-primary-foreground shadow-sm hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground group-data-[collapsible=icon]:justify-center"
                            >
                                <Link href="/console/dashboard">
                                    <IconArrowLeft />
                                    <Text size="2" className="group-data-[collapsible=icon]:hidden"> {translates.backToRestaurants}</Text>
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
                                            <Text size="2">{item.title}</Text>
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
