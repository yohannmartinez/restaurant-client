"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
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
import { useAuth } from "@/lib/hooks/use-auth"
import { useLocale } from "@/lib/hooks/use-locale"
import { toast } from "sonner"

export default function ConsoleSidebarFooter() {
    const router = useRouter()
    const { user } = useAuth()
    const { messages } = useLocale()
    const [hasImageError, setHasImageError] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : "Mon compte"
    const initials = user
        ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
        : "MC"
    const picture = user?.picture
    const showPicture = Boolean(picture) && !hasImageError
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
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Popover>
                        <PopoverTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                tooltip="Mon compte"
                                className="group-data-[collapsible=icon]:justify-center"
                            >
                                <div className="flex aspect-square rounded-lg overflow-hidden size-8 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                                    {picture && showPicture ? (
                                        <Image
                                            src={picture}
                                            alt={fullName}
                                            width={32}
                                            height={32}
                                            unoptimized
                                            className="size-full object-cover"
                                            onError={() => setHasImageError(true)}
                                        />
                                    ) : (
                                        <span className="text-sm font-semibold">{initials}</span>
                                    )}
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                    <span className="truncate font-medium">{fullName}</span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        {user?.email}
                                    </span>
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
                                <span>{logoutLabel}</span>
                            </Button>
                        </PopoverContent>
                    </Popover>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}
