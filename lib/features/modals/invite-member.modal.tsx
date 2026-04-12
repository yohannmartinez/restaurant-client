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
import { useLocale } from '@/lib/hooks/use-locale';
import { RestaurantRole } from '@/lib/types/restaurant-membership';
import { toast } from 'sonner';

type InviteMemberModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    restaurantId: string;
    showRoleSelection?: boolean;
};

const INITIAL_VALUES = {
    email: '',
    role: RestaurantRole.EDITOR as RestaurantRole,
};

export function InviteMemberModal({
    open,
    onOpenChange,
    restaurantId,
    showRoleSelection = true,
}: InviteMemberModalProps) {
    const emailFieldId = 'invite-member-email';
    const router = useRouter();
    const { messages } = useLocale();
    const translates = messages.features.modals.inviteMember;
    const roleLabels = messages.console.restaurant.members.roles;
    const [values, setValues] = useState(INITIAL_VALUES);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await clientApiFetch('/restaurant-membership/invite', {
                method: 'POST',
                body: {
                    restaurantId,
                    email: values.email.trim(),
                    role: RestaurantRole.EDITOR,
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
            <DialogContent className="max-w-[560px]">
                <DialogHeader>
                    <DialogTitle asChild>
                        <Heading as="h2" size="5" className="font-bold">
                            {translates.title}
                        </Heading>
                    </DialogTitle>
                    <DialogDescription asChild>
                        <Text as="p" size="2" className="text-muted-foreground">
                            {translates.description}
                        </Text>
                    </DialogDescription>
                </DialogHeader>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <Field>
                        <Text asChild size="2" weight="medium">
                            <FieldLabel htmlFor={emailFieldId}>
                                {translates.fields.email}
                            </FieldLabel>
                        </Text>
                        <Input
                            id={emailFieldId}
                            type="email"
                            required
                            autoComplete="email"
                            value={values.email}
                            disabled={isSubmitting}
                            placeholder={translates.placeholders.email}
                            onChange={(event) =>
                                setValues((current) => ({
                                    ...current,
                                    email: event.target.value,
                                }))
                            }
                        />
                    </Field>


                    {showRoleSelection && (
                        <Field>
                            <Text asChild size="2" weight="medium">
                                <FieldLabel>{translates.fields.role}</FieldLabel>
                            </Text>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    type="button"
                                    variant={values.role === RestaurantRole.EDITOR ? 'default' : 'outline'}
                                    disabled={isSubmitting}
                                    onClick={() =>
                                        setValues((current) => ({
                                            ...current,
                                            role: RestaurantRole.EDITOR,
                                        }))
                                    }
                                >
                                    <Text size="2">{roleLabels.EDITOR}</Text>
                                </Button>
                                <Button
                                    type="button"
                                    variant={values.role === RestaurantRole.OWNER ? 'default' : 'outline'}
                                    disabled={isSubmitting}
                                    onClick={() =>
                                        setValues((current) => ({
                                            ...current,
                                            role: RestaurantRole.OWNER,
                                        }))
                                    }
                                >
                                    <Text size="2">{roleLabels.OWNER}</Text>
                                </Button>
                            </div>
                        </Field>
                    )}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                <Text size="2">{translates.actions.cancel}</Text>
                            </Button>
                        </DialogClose>
                        <Button type="submit" isLoading={isSubmitting}>
                            <Text size="2">
                                {isSubmitting ? translates.actions.loading : translates.actions.submit}
                            </Text>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
