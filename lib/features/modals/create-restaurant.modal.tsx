'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { clientApiFetch } from '@/lib/api/fetch/client-api-fetch';
import { Button } from '@/lib/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/lib/components/ui/dialog';
import { Text } from '@/lib/components/ui/text';
import { useLocale } from '@/lib/hooks/use-locale';
import type { Restaurant, RestaurantCreateInput } from '@/lib/types/restaurant';
import { toast } from 'sonner';
import { Heading } from '@/lib/components/ui/heading';

type CreateRestaurantModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const INITIAL_VALUES: RestaurantCreateInput = {
    name: '',
    description: '',
    address: '',
};

export function CreateRestaurantModal({
    open,
    onOpenChange,
}: CreateRestaurantModalProps) {
    const router = useRouter();
    const { messages } = useLocale();
    const translates = messages.features.modals.createRestaurant;
    const [values, setValues] = useState<RestaurantCreateInput>(INITIAL_VALUES);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await clientApiFetch<Restaurant>('/restaurant/create', {
                method: 'POST',
                body: {
                    name: values.name.trim(),
                    description: values.description ? values.description.trim() : null,
                    address: values.address.trim(),
                },
            });

            setValues(INITIAL_VALUES);
            toast.success(translates.feedback.success);
            onOpenChange(false);
            router.refresh();
        } catch {
            toast.error(translates.feedback.error);
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleOpenChange(nextOpen: boolean) {
        if (!nextOpen) {
            setValues(INITIAL_VALUES);
        }

        onOpenChange(nextOpen);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className='max-w-[600px]'>
                <DialogHeader>
                    <DialogTitle>
                        <Heading size="5" weight='bold'>{translates.title}</Heading>
                    </DialogTitle>
                    <DialogDescription>{translates.description}</DialogDescription>
                </DialogHeader>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <label className="grid gap-2">
                        <Text as="span" size="2" weight="medium">
                            {translates.fields.name}
                        </Text>
                        <input
                            required
                            value={values.name}
                            disabled={isSubmitting}
                            onChange={(event) =>
                                setValues((current) => ({
                                    ...current,
                                    name: event.target.value,
                                }))
                            }
                            placeholder={translates.placeholders.name}
                            className="h-11 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
                        />
                    </label>

                    <label className="grid gap-2">
                        <Text as="span" size="2" weight="medium">
                            {translates.fields.description}
                        </Text>
                        <textarea
                            required
                            rows={4}
                            value={values.description as string}
                            disabled={isSubmitting}
                            onChange={(event) =>
                                setValues((current) => ({
                                    ...current,
                                    description: event.target.value,
                                }))
                            }
                            placeholder={translates.placeholders.description}
                            className="rounded-xl border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
                        />
                    </label>

                    <label className="grid gap-2">
                        <Text as="span" size="2" weight="medium">
                            {translates.fields.address}
                        </Text>
                        <input
                            required
                            value={values.address}
                            disabled={isSubmitting}
                            onChange={(event) =>
                                setValues((current) => ({
                                    ...current,
                                    address: event.target.value,
                                }))
                            }
                            placeholder={translates.placeholders.address}
                            className="h-11 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
                        />
                    </label>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                {translates.actions.cancel}
                            </Button>
                        </DialogClose>
                        <Button type="submit" isLoading={isSubmitting}>
                            {isSubmitting
                                ? translates.actions.loading
                                : translates.actions.submit}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
