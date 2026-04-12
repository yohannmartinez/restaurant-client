import { IconCircleCheck, IconClock, IconShield, IconUserOff } from "@tabler/icons-react";
import { Text } from "@/lib/components/ui/text";
import { cn } from "@/lib/tailwind/utils";
import { MembershipStatus } from "@/lib/types/restaurant-membership";

type MemberCardBadgesProps = {
    status: MembershipStatus;
    roleLabel: string;
    statusLabel: string;
};

const roleBadgeStyle = {
    container: "border-blue-200 bg-blue-500/10 dark:border-blue-500/30 dark:bg-blue-500/15",
    text: "text-blue-700 dark:text-blue-300",
} as const;

const statusBadgeStyles: Record<MembershipStatus, { container: string; text: string; icon: typeof IconCircleCheck }> = {
    [MembershipStatus.ACTIVE]: {
        container: "border-green-200 bg-green-500/10 dark:border-green-500/30 dark:bg-green-500/15",
        text: "text-green-700 dark:text-green-400",
        icon: IconCircleCheck,
    },
    [MembershipStatus.INVITED]: {
        container: "border-amber-200 bg-amber-500/10 dark:border-amber-500/30 dark:bg-amber-500/15",
        text: "text-amber-700 dark:text-amber-400",
        icon: IconClock,
    },
    [MembershipStatus.REVOKED]: {
        container: "border-rose-200 bg-rose-500/10 dark:border-rose-500/30 dark:bg-rose-500/15",
        text: "text-rose-700 dark:text-rose-400",
        icon: IconUserOff,
    },
};

export default function MemberCardBadges({
    status,
    roleLabel,
    statusLabel,
}: MemberCardBadgesProps) {
    const statusBadgeStyle = statusBadgeStyles[status];
    const StatusIcon = statusBadgeStyle.icon;

    return (
        <div className="flex flex-wrap gap-2">
            <div
                className={cn(
                    "flex w-fit items-center gap-2 rounded-md border px-3 py-1",
                    roleBadgeStyle.container,
                )}
            >
                <IconShield className={cn("size-3.5 shrink-0", roleBadgeStyle.text)} />
                <Text size="1" className={roleBadgeStyle.text}>
                    {roleLabel}
                </Text>
            </div>

            <div
                className={cn(
                    "flex w-fit items-center gap-2 rounded-md border px-3 py-1",
                    statusBadgeStyle.container,
                )}
            >
                <StatusIcon className={cn("size-3.5 shrink-0", statusBadgeStyle.text)} />
                <Text size="1" className={statusBadgeStyle.text}>
                    {statusLabel}
                </Text>
            </div>
        </div>
    );
}
