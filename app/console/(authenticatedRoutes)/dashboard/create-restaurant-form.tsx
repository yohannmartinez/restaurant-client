'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/lib/components/ui/button';
import { Text } from '@/lib/components/ui/text';
import { clientApiFetch } from '@/lib/api/fetch/client-api-fetch';
import type { Restaurant } from '@/lib/types/restaurant';

type CreateRestaurantFormState = {
    address: string;
    description: string;
    name: string;
};

const INITIAL_FORM_STATE: CreateRestaurantFormState = {
    address: '',
    description: '',
    name: '',
};

export function CreateRestaurantForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState<CreateRestaurantFormState>(INITIAL_FORM_STATE);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);
        setIsSubmitting(true);

        try {
            await clientApiFetch<Restaurant>('/restaurant/create', {
                method: 'POST',
                body: {
                    name: form.name.trim(),
                    description: form.description.trim(),
                    address: form.address.trim(),
                },
            });

            setForm(INITIAL_FORM_STATE);
            setSuccessMessage('Restaurant cree avec succes.');

            startTransition(() => {
                router.refresh();
            });
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : 'La creation du restaurant a echoue.',
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    function updateField<K extends keyof CreateRestaurantFormState>(
        field: K,
        value: CreateRestaurantFormState[K],
    ) {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));
    }

    return (
        <section className="space-y-4 rounded-2xl border bg-card p-5">
            <div className="space-y-1">
                <Text as="p" size="2" weight="bold">
                    Creer un restaurant
                </Text>
                <Text as="p" size="2" className="text-muted-foreground">
                    Renseigne les informations principales pour ajouter un restaurant
                    a ton espace.
                </Text>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <label className="grid gap-2">
                    <Text as="span" size="2" weight="medium">
                        Nom
                    </Text>
                    <input
                        required
                        disabled={isSubmitting || isPending}
                        value={form.name}
                        onChange={(event) => updateField('name', event.target.value)}
                        className="h-11 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
                        placeholder="Le Bistrot du Coin"
                    />
                </label>

                <label className="grid gap-2">
                    <Text as="span" size="2" weight="medium">
                        Description
                    </Text>
                    <textarea
                        required
                        rows={4}
                        disabled={isSubmitting || isPending}
                        value={form.description}
                        onChange={(event) =>
                            updateField('description', event.target.value)
                        }
                        className="rounded-xl border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
                        placeholder="Cuisine de saison, plats a partager, service du midi..."
                    />
                </label>

                <label className="grid gap-2">
                    <Text as="span" size="2" weight="medium">
                        Adresse
                    </Text>
                    <input
                        required
                        disabled={isSubmitting || isPending}
                        value={form.address}
                        onChange={(event) => updateField('address', event.target.value)}
                        className="h-11 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
                        placeholder="12 rue des Fleurs, 75002 Paris"
                    />
                </label>

                {errorMessage ? (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3">
                        <Text as="p" size="2" className="text-destructive">
                            {errorMessage}
                        </Text>
                    </div>
                ) : null}

                {successMessage ? (
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                        <Text as="p" size="2" className="text-emerald-700">
                            {successMessage}
                        </Text>
                    </div>
                ) : null}

                <Button
                    type="submit"
                    size="lg"
                    className="rounded-xl"
                    isLoading={isSubmitting || isPending}
                >
                    Creer le restaurant
                </Button>
            </form>
        </section>
    );
}
