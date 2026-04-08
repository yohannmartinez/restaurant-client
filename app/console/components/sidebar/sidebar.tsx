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
import ConsoleSidebarTrigger from "./trigger/sidebar-trigger"

export function ConsoleSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <ConsoleSidebarHeader />

            <SidebarContent>
                <WithoutRestaurantNavigation />
                <WithRestaurantNavigation />
                <div className="mt-auto p-2">
                    <ConsoleSidebarTrigger />
                </div>
            </SidebarContent>

            <ConsoleSidebarFooter />


            <SidebarRail />
        </Sidebar>
    )
}
