"use client"

import { IconLayoutSidebar } from "@tabler/icons-react"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/lib/components/ui/sidebar"
import { Text } from "@/lib/components/ui/text"
import { useLocale } from "@/lib/hooks/use-locale"

export default function ConsoleSidebarTrigger() {
    const { state, toggleSidebar } = useSidebar()
    const { messages } = useLocale()
    const isCollapsed = state === "collapsed"
    const label = isCollapsed
        ? messages.console.sidebar.trigger.expand
        : messages.console.sidebar.trigger.collapse

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    type="button"
                    tooltip={label}
                    onClick={toggleSidebar}
                    className="cursor-pointer"
                >
                    <IconLayoutSidebar />
                    <Text size="2">{label}</Text>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
