'use client';

import { useState } from 'react';
import { Button } from '@/lib/components/ui/button';
import { CreateRestaurantModal } from '@/lib/features/modals/create-restaurant.modal';
import { useLocale } from '@/lib/hooks/use-locale';

export function CreateRestaurantModalSection() {
    const [open, setOpen] = useState(false);
    const { messages } = useLocale();
    const translates = messages.features.modals.createRestaurant;

    return (
        <>
            <Button
                type="button"
                size="lg"
                className="rounded-xl"
                onClick={() => setOpen(true)}
            >
                {translates.trigger}
            </Button>

            <CreateRestaurantModal open={open} onOpenChange={setOpen} />
        </>
    );
}
