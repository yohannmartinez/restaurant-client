"use client"

import {
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/lib/components/ui/sidebar"
import { useAuth } from "@/lib/hooks/use-auth"

export default function ConsoleSidebarFooter() {
    const { user } = useAuth()

    const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : "Mon compte"
    const initials = user
        ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
        : "MC"

    return (
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
    )
}
