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
import { Field, FieldLabel } from '@/lib/components/ui/field';
import { Heading } from '@/lib/components/ui/heading';
import { Input } from '@/lib/components/ui/input';
import { Text } from '@/lib/components/ui/text';
import { Textarea } from '@/lib/components/ui/textarea';
import { useLocale } from '@/lib/hooks/use-locale';
import type { Restaurant, RestaurantCreateInput } from '@/lib/types/restaurant';
import { toast } from 'sonner';

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
    const nameFieldId = 'create-restaurant-name';
    const descriptionFieldId = 'create-restaurant-description';
    const addressFieldId = 'create-restaurant-address';
    const router = useRouter();
    const { messages } = useLocale();
    const translates = messages.features.modals.createRestaurant;
    const [values, setValues] = useState<RestaurantCreateInput>(INITIAL_VALUES);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await clientApiFetch('/restaurant/create', {
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
                    <DialogTitle asChild>
                        <Heading as="h2" size="5" className='font-bold'>{translates.title}</Heading>
                    </DialogTitle>
                    <DialogDescription asChild>
                        <Text as="p" size='2' className='text-muted-foreground'>
                            {translates.description}
                        </Text>
                    </DialogDescription>
                </DialogHeader>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Field>
                        <Text asChild size="2" weight="medium">
                            <FieldLabel htmlFor={nameFieldId}>
                                {translates.fields.name}
                            </FieldLabel>
                        </Text>
                        <Input
                            id={nameFieldId}
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
                        />
                    </Field>

                    <Field>
                        <Text asChild size="2" weight="medium">
                            <FieldLabel htmlFor={descriptionFieldId}>
                                {translates.fields.description}
                            </FieldLabel>
                        </Text>
                        <Textarea
                            id={descriptionFieldId}
                            required
                            rows={4}
                            value={values.description as string}
                            disabled={isSubmitting}
                            className='resize-none'
                            onChange={(event) =>
                                setValues((current) => ({
                                    ...current,
                                    description: event.target.value,
                                }))
                            }
                            placeholder={translates.placeholders.description}
                        />
                    </Field>

                    <Field>
                        <Text asChild size="2" weight="medium">
                            <FieldLabel htmlFor={addressFieldId}>
                                {translates.fields.address}
                            </FieldLabel>
                        </Text>
                        <Input
                            id={addressFieldId}
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
                        />
                    </Field>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                <Text size="2">{translates.actions.cancel}</Text>
                            </Button>
                        </DialogClose>
                        <Button type="submit" isLoading={isSubmitting}>
                            <Text size="2">
                                {isSubmitting
                                    ? translates.actions.loading
                                    : translates.actions.submit}
                            </Text>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
