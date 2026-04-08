'use client';

import { useState } from 'react';
import { Button } from '@/lib/components/ui/button';
import { CreateRestaurantModal } from '@/lib/features/modals/create-restaurant.modal';
import { useLocale } from '@/lib/hooks/use-locale';
import { cn } from '@/lib/tailwind/utils';
import { Text } from '@/lib/components/ui/text';

type CreateRestaurantModalSectionProps = {
    className?: string;
    label?: string;
    size?: React.ComponentProps<typeof Button>['size'];
    variant?: React.ComponentProps<typeof Button>['variant'];
};

export function CreateRestaurantModalSection({
    className,
    label,
    size = "default",
    variant = 'default',
}: CreateRestaurantModalSectionProps) {
    const [open, setOpen] = useState(false);
    const { messages } = useLocale();
    const translates = messages.features.modals.createRestaurant;

    return (
        <>
            <Button
                type="button"
                size={size}
                variant={variant}
                className={cn('rounded-xl', className)}
                onClick={() => setOpen(true)}
            >
                <Text size="2">{label ?? translates.trigger}</Text>
            </Button>

            <CreateRestaurantModal open={open} onOpenChange={setOpen} />
        </>
    );
}
