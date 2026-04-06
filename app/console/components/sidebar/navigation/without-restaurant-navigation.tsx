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

const consoleItems = [
    { title: "Dashboard", url: "/console/dashboard", icon: IconHome },
    { title: "Analytics", url: "#", icon: IconChartBar },
    { title: "Restaurants", url: "#", icon: IconBuildingStore },
]

const supportItems = [
    { title: "Parametres", url: "#", icon: IconSettings },
    { title: "Aide", url: "#", icon: IconHelp },
]

export default function WithoutRestaurantNavigation() {
    const pathname = usePathname()
    const restaurantIdFromPath = getRestaurantIdFromPathname(pathname)

    if (restaurantIdFromPath) {
        return null
    }

    return (
        <>
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
        </>
    );
}
