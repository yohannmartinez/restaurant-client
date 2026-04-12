'use client'

import { IconDots } from "@tabler/icons-react";
import { Button } from "@/lib/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/components/ui/popover";
import { Text } from "@/lib/components/ui/text";

type MemberActionsMenuProps = {
    editRoleLabel: string;
    removeLabel: string;
    openMenuLabel: string;
};

export default function MemberActionsMenu({
    editRoleLabel,
    removeLabel,
    openMenuLabel,
}: MemberActionsMenuProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={openMenuLabel}
                >
                    <IconDots className="size-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 p-2">
                <div className="flex flex-col gap-1">
                    <Button type="button" variant="ghost" className="w-full justify-start">
                        <Text size="2">{editRoleLabel}</Text>
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                        <Text size="2">{removeLabel}</Text>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
