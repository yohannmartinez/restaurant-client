import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/lib/components/ui/sidebar";
import Link from "next/link";
import {
    IconBuildingStore,
    IconChartBar,
    IconHelp,
    IconHome,
    IconSettings,
} from "@tabler/icons-react"
import { usePathname } from "next/navigation";
import { getRestaurantIdFromPathname } from "@/app/console/helpers/get-restaurant-id-from-pathname";
import { useLocale } from "@/lib/hooks/use-locale";
import { Text } from "@/lib/components/ui/text";

export default function WithoutRestaurantNavigation() {
    const pathname = usePathname()
    const restaurantIdFromPath = getRestaurantIdFromPathname(pathname)
    const { messages } = useLocale()
    const translates = messages.console.sidebar.withoutRestaurant

    const consoleItems = [
        { title: translates.items.dashboard, url: "/console/dashboard", icon: IconHome },
        { title: translates.items.analytics, url: "#", icon: IconChartBar },
        { title: translates.items.restaurants, url: "#", icon: IconBuildingStore },
    ]

    const supportItems = [
        { title: translates.items.settings, url: "#", icon: IconSettings },
        { title: translates.items.help, url: "#", icon: IconHelp },
    ]

    if (restaurantIdFromPath) {
        return null
    }

    return (
        <>
            <SidebarGroup>
                <SidebarGroupLabel>{translates.groups.console}</SidebarGroupLabel>
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
                                        <Text size="2">{item.title}</Text>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>



            <SidebarGroup>
                <SidebarGroupLabel>{translates.groups.support}</SidebarGroupLabel>
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
                                        <Text size="2">{item.title}</Text>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </>
    );
}
