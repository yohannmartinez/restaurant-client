"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarRail,
} from "@/lib/components/ui/sidebar"
import ConsoleSidebarFooter from "./footer/sidebar-footer"
import ConsoleSidebarHeader from "./header/sidebar-header"
import WithRestaurantNavigation from "./navigation/with-restaurant-navigation"
import WithoutRestaurantNavigation from "./navigation/without-restaurant-navigation"

export function ConsoleSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <ConsoleSidebarHeader />

            <SidebarContent>
                <WithoutRestaurantNavigation />
                <WithRestaurantNavigation />
            </SidebarContent>

            <ConsoleSidebarFooter />

            <SidebarRail />
        </Sidebar>
    )
}
