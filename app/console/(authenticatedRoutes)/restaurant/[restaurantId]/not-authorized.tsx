import { IconUserOff } from "@tabler/icons-react";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/lib/components/ui/empty";
import { Heading } from "@/lib/components/ui/heading";
import { Text } from "@/lib/components/ui/text";

type NotAuthorizedProps = {
    description: string;
    title: string;
};

export default function NotAuthorized({
    description,
    title,
}: NotAuthorizedProps) {
    return (
        <Empty className="rounded-2xl border border-dashed border-border bg-card shadow-sm">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconUserOff />
                </EmptyMedia>
                <EmptyTitle>
                    <Heading size="5" weight="bold">{title}</Heading>
                </EmptyTitle>
                <EmptyDescription>
                    <Text size="2">{description}</Text>
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    );
}
