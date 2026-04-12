"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { IconLogout } from "@tabler/icons-react"
import {
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/lib/components/ui/sidebar"
import { Button } from "@/lib/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/lib/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar"
import { useAuth } from "@/lib/hooks/use-auth"
import { useLocale } from "@/lib/hooks/use-locale"
import { toast } from "sonner"
import { Text } from "@/lib/components/ui/text"

export default function ConsoleSidebarFooter() {
    const router = useRouter()
    const { user } = useAuth()
    const { messages } = useLocale()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : "Mon compte"
    const initials = user
        ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
        : "MC"
    const picture = user?.picture
    const logoutLabel = messages.console.sidebar.footer.logout

    async function handleLogout() {
        try {
            setIsLoggingOut(true)

            await fetch("/api/auth/logout", {
                method: "POST",
            })

            toast.success(messages.console.sidebar.footer.feedback.success)
            router.push("/console/login")
            router.refresh()
        } finally {
            setIsLoggingOut(false)
        }
    }

    return (
        <SidebarFooter className="border-t">
            <SidebarMenu>
                <SidebarMenuItem>
                    <Popover>
                        <PopoverTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                tooltip="Mon compte"
                                className="group-data-[collapsible=icon]:justify-center cursor-pointer"
                            >
                                <Avatar className="size-8 rounded-lg bg-primary text-primary-foreground">
                                    {picture ? <AvatarImage src={picture} alt={fullName} /> : null}
                                    <AvatarFallback className="rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                    <Text size="2" truncate weight="medium">
                                        {fullName}
                                    </Text>
                                    <Text size="1" className="text-muted-foreground" truncate>
                                        {user?.email}
                                    </Text>
                                </div>
                            </SidebarMenuButton>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-64 p-2">
                            <Button
                                variant="destructive"
                                className="w-full justify-start"
                                onClick={handleLogout}
                                isLoading={isLoggingOut}
                            >
                                <IconLogout />
                                <Text size="2">{logoutLabel}</Text>
                            </Button>
                        </PopoverContent>
                    </Popover>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}
