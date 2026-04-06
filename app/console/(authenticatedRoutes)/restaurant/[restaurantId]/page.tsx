import { Text } from "@/lib/components/ui/text";
import { getUserRestaurant } from "./get-user-restaurant";

type RestaurantPageProps = {
    params: Promise<{
        restaurantId: string;
    }>;
};

function formatDate(value: Date | string) {
    return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value));
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
    const { restaurantId } = await params;
    const restaurant = await getUserRestaurant(restaurantId);

    return (
        <div className="flex w-full flex-col gap-6">
            <section className="space-y-2 rounded-2xl border bg-card p-5 shadow-sm">
                <Text as="p" size="2" className="text-muted-foreground">
                    Restaurant actif
                </Text>
                <Text as="p" size="6" weight="bold">
                    {restaurant.name || "Restaurant sans nom"}
                </Text>
                <Text as="p" size="3" className="text-muted-foreground">
                    Vue detaillee du restaurant selectionne dans la console.
                </Text>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
                <article className="space-y-3 rounded-2xl border bg-card p-5 shadow-sm">
                    <Text as="p" size="3" weight="bold">
                        Informations principales
                    </Text>
                    <div className="space-y-2">
                        <Text as="p" size="2">
                            <span className="font-semibold">ID:</span> {restaurant.id}
                        </Text>
                        <Text as="p" size="2">
                            <span className="font-semibold">Slug:</span> {restaurant.slug}
                        </Text>
                        <Text as="p" size="2">
                            <span className="font-semibold">Statut:</span> {restaurant.status}
                        </Text>
                        <Text as="p" size="2">
                            <span className="font-semibold">Adresse:</span> {restaurant.address}
                        </Text>
                    </div>
                </article>

                <article className="space-y-3 rounded-2xl border bg-card p-5 shadow-sm">
                    <Text as="p" size="3" weight="bold">
                        Description
                    </Text>
                    <Text as="p" size="2" className="text-muted-foreground">
                        {restaurant.description || "Aucune description pour ce restaurant."}
                    </Text>
                </article>

                <article className="space-y-3 rounded-2xl border bg-card p-5 shadow-sm">
                    <Text as="p" size="3" weight="bold">
                        Dates
                    </Text>
                    <div className="space-y-2">
                        <Text as="p" size="2">
                            <span className="font-semibold">Cree le:</span>{" "}
                            {formatDate(restaurant.createdAt)}
                        </Text>
                        <Text as="p" size="2">
                            <span className="font-semibold">Mis a jour le:</span>{" "}
                            {formatDate(restaurant.updatedAt)}
                        </Text>
                    </div>
                </article>
            </section>
        </div>
    );
}
