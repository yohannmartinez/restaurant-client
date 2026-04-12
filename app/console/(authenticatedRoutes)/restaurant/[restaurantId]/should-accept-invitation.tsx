import Link from "next/link";
import { IconMail } from "@tabler/icons-react";
import { Button } from "@/lib/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/lib/components/ui/empty";
import { Heading } from "@/lib/components/ui/heading";
import { Text } from "@/lib/components/ui/text";

type ShouldAcceptInvitationProps = {
    buttonLabel: string;
    description: string;
    title: string;
};

export default function ShouldAcceptInvitation({
    buttonLabel,
    description,
    title,
}: ShouldAcceptInvitationProps) {
    return (
        <Empty className="rounded-2xl border border-dashed border-border bg-card shadow-sm">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconMail />
                </EmptyMedia>
                <EmptyTitle>
                    <Heading size="5" weight="bold">{title}</Heading>
                </EmptyTitle>
                <EmptyDescription>
                    <Text size="2">{description}</Text>
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button asChild>
                    <Link href="/console/invitations">
                        <Text size="2">{buttonLabel}</Text>
                    </Link>
                </Button>
            </EmptyContent>
        </Empty>
    );
}
