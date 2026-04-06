import { Text } from "@/lib/components/ui/text";
import { serverApiFetch } from "@/lib/api/fetch/server-api-fetch";
import { Restaurant } from "@/lib/types/restaurant";
import { CreateRestaurantModalSection } from "./create-restaurant-modal-section";

export default async function UserDashboard() {
  const restaurants = await serverApiFetch<Restaurant[]>(
    `/restaurant/me`
  );

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="space-y-4 rounded-2xl border bg-card p-5 shadow-sm">
        <div className="space-y-1">
          <Text as="p" size="2" weight="bold">
            Restaurants
          </Text>
          <Text as="p" size="2" className="text-muted-foreground">
            {restaurants.length} restaurant{restaurants.length > 1 ? "s" : ""} lie
            {restaurants.length > 1 ? "s" : ""} a ce compte.
          </Text>
        </div>

        {restaurants.length > 0 ? (
          <div className="grid gap-3">
            {restaurants.map((restaurant) => (
              <article
                key={restaurant.id}
                className="rounded-xl border bg-background p-4"
              >
                <Text as="p" size="3" weight="bold">
                  {restaurant.name || "Restaurant sans nom"}
                </Text>
                <Text as="p" size="2" className="text-muted-foreground">
                  ID: {restaurant.id}
                </Text>
                {restaurant.slug ? (
                  <Text as="p" size="2" className="text-muted-foreground">
                    Slug: {restaurant.slug}
                  </Text>
                ) : null}
                {restaurant.address ? (
                  <Text as="p" size="2" className="text-muted-foreground">
                    Adresse: {restaurant.address}
                  </Text>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-muted p-4">
            <Text as="p" size="3">
              Aucun restaurant trouve pour cet utilisateur.
            </Text>
          </div>
        )}
      </section>
      <CreateRestaurantModalSection />
    </div>
  );
}
